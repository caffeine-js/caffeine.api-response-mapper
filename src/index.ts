import { Entity, Mapper } from "@caffeine/entity";
import Elysia from "elysia";

export const CaffeineResponseMapper = new Elysia().onAfterHandle(
	({ responseValue }) => {
		if (responseValue instanceof Entity) return Mapper.toDTO(responseValue);
		if (
			Array.isArray(responseValue) &&
			responseValue.length > 0 &&
			responseValue[0] instanceof Entity
		)
			return responseValue.map((item) => Mapper.toDTO(item));
	},
);
