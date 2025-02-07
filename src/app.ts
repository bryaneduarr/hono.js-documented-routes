import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import tasks from "@/routes/tasks/tasks.index";
import configureOpenAPI from "./lib/configure-openapi";

const app = createApp();

const routes = [index, tasks];

configureOpenAPI(app);

for (const route of routes) {
	app.route("/", route);
}

export default app;
