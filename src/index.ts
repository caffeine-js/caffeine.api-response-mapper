import { Entity, Mapper } from "@caffeine/entity";
import Elysia, { type ElysiaCustomStatusResponse } from "elysia";

type ResponseValue = { constructor: { name: string } };

export const CaffeineResponseMapper = new Elysia().onAfterHandle(
	{ as: "global" },
	({ responseValue }) => {
		if (typeof responseValue !== "object") return;

		const response =
			"constructor" in (responseValue as ResponseValue) &&
			(responseValue as ResponseValue).constructor.name ===
				"ElysiaCustomStatusResponse"
				? (responseValue as ElysiaCustomStatusResponse<number, unknown>)
						.response
				: responseValue;

		if (response instanceof Entity) return Mapper.toDTO(response);
		if (
			Array.isArray(response) &&
			response.length > 0 &&
			response[0] instanceof Entity
		)
			return response.map((item) => Mapper.toDTO(item));
	},
);
