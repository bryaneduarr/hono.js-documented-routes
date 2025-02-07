import type { AppOpenApi } from "./types";

import { apiReference } from "@scalar/hono-api-reference";
import packageJSON from "../../package.json";

export default function configureOpenAPI(app: AppOpenApi) {
	app.doc("/doc", {
		openapi: "3.0.0",
		info: {
			version: packageJSON.version,
			title: "My API",
		},
	});

	app.get(
		"/reference",
		apiReference({
			defaultHttpClient: {
				targetKey: "javascript",
				clientKey: "fetch",
			},
			layout: "classic",
			theme: "kepler",
			spec: { url: "/doc" },
		})
	);
}
