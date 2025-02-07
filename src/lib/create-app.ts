import { pinoLog } from "@/middlewares/pino-logger";
import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import type { AppBindings, AppOpenApi } from "./types";

export function createRouter() {
	return new OpenAPIHono<AppBindings>({
		strict: false,
		defaultHook,
	});
}

export default function createApp() {
	const app = createRouter();

	app.use(serveEmojiFavicon("🐱"));
	app.notFound(notFound);
	app.onError(onError);
	app.use(pinoLog());

	return app;
}

export function createTestApp(router: AppOpenApi) {
	const testApp = createApp();
	testApp.route("/", router);

	return testApp;
}
