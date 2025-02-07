import {
	insertTasksSchema,
	patchTasksSchema,
	selectTasksSchema,
} from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import {
	jsonContent,
	jsonContentOneOf,
	jsonContentRequired,
} from "stoker/openapi/helpers";
import { IdParamsSchema, createErrorSchema } from "stoker/openapi/schemas";

const tags = ["Tasks"];

export const list = createRoute({
	path: "/tasks",
	method: "get",
	tags,
	responses: {
		[HttpStatusCode.OK]: jsonContent(
			z.array(selectTasksSchema),
			"The list of tasks"
		),
	},
});

export const create = createRoute({
	path: "/tasks",
	method: "post",
	request: {
		body: jsonContentRequired(insertTasksSchema, "The task to create"),
	},
	tags,
	responses: {
		[HttpStatusCode.OK]: jsonContent(selectTasksSchema, "The created task"),
		[HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(insertTasksSchema),
			"The validation error(s)"
		),
	},
});

export const getOne = createRoute({
	path: "/tasks/{id}",
	method: "get",
	request: {
		params: IdParamsSchema,
	},
	tags,
	responses: {
		[HttpStatusCode.OK]: jsonContent(selectTasksSchema, "The requested task"),
		[HttpStatusCode.NOT_FOUND]: jsonContentRequired(
			notFoundSchema,
			"Task not found "
		),
		[HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(IdParamsSchema),
			"Invalid ID error"
		),
	},
});

export const patch = createRoute({
	path: "/tasks/{id}",
	method: "patch",
	request: {
		body: jsonContentRequired(patchTasksSchema, "The task updates"),
		params: IdParamsSchema,
	},
	tags,
	responses: {
		[HttpStatusCode.OK]: jsonContent(selectTasksSchema, "The updated task"),
		[HttpStatusCode.NOT_FOUND]: jsonContentRequired(
			notFoundSchema,
			"Task not found!"
		),
		[HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
			[createErrorSchema(patchTasksSchema), createErrorSchema(IdParamsSchema)],
			"The validation error(s)"
		),
	},
});

export const remove = createRoute({
	path: "/tasks/{id}",
	method: "delete",
	request: {
		params: IdParamsSchema,
	},
	tags,
	responses: {
		[HttpStatusCode.NO_CONTENT]: {
			description: "The task was deleted",
		},
		[HttpStatusCode.NOT_FOUND]: jsonContentRequired(
			notFoundSchema,
			"Task not found!"
		),
		[HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
			[createErrorSchema(IdParamsSchema)],
			"Invalid ID error"
		),
	},
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
