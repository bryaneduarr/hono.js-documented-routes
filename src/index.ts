import app from "@/app";
import { serve } from "@hono/node-server";
import env from "./env";

const port = env.PORT;
console.log(`[server]: Server is running on http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
