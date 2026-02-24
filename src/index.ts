import { Entity, Mapper } from "@caffeine/entity";
import Elysia from "elysia";

export const CaffeineResponseMapper = new Elysia().onAfterHandle(
	({ responseValue }) => {
		if (responseValue instanceof Entity) return Mapper.toDTO(responseValue);
	},
);
