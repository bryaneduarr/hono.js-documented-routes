import createApp, { createTestApp } from "@/lib/create-app";
import { testClient } from "hono/testing";
import { describe, expect, expectTypeOf, it } from "vitest";
import router from "./tasks.index";

describe("Tasks list", () => {
	it("responds with an array", async () => {
		const testRouter = createTestApp(router);
		const response = await testRouter.request("/tasks");
		const result = await response.json();

		console.log(result);

		// @ts-expect-error
		expectTypeOf(result).toBeArray();
	});

	it("responds with an array again", async () => {
		const client = testClient(createApp().route("/", router));
		const response = await client.tasks.$get();
		const json = await response.json();

		expectTypeOf(json).toBeArray();
	});

	it("validates the id param", async () => {
		const client = testClient(createApp().route("/", router));
		const response = await client.tasks[":id"].$get({
			param: {
				// @ts-expect-error
				id: "invalid",
			},
		});

		expect(response.status).toBe(422);
	});
});
