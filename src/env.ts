import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";
import type { ZodError } from "zod";

expand(config());

const EnvSchema = z
	.object({
		NODE_ENV: z.string().default("development"),
		PORT: z.coerce.number().default(3002),
		LOG_LEVEL: z
			.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
			.default("info"),
		DATABASE_URL: z.string().url(),
		DATABASE_AUTH_TOKEN: z.string(),
	})
	.superRefine((input, ctx) => {
		if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
			ctx.addIssue({
				code: z.ZodIssueCode.invalid_type,
				expected: "string",
				received: "undefined",
				path: ["DATABASE_AUTH_TOKEN"],
				message: "Must be set when NODE_ENV is 'production'",
			});
		}
	});

export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
	env = EnvSchema.parse(process.env);
} catch (error) {
	const exception = error as ZodError;
	console.error("[server]: Invalid environment variables");
	console.error(exception.flatten().fieldErrors);
	process.exit(1);
}

export default env;
