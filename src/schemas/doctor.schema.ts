import { ErrorFields } from "@/constants";
import { Sex } from "@/enums";
import { z } from "zod";

export const doctorSchema = z
	.object({
		dni: z
			.string({
				required_error: ErrorFields.Required
			})
			.regex(/^\d{10}$/, "La cédula debe ser de 10 dígitos"),
		firstName: z
			.string({
				required_error: ErrorFields.Required
			})
			.min(1, ErrorFields.Required),
		lastName: z
			.string({
				required_error: ErrorFields.Required
			})
			.min(1, ErrorFields.Required),
		birthDate: z.date({
			required_error: ErrorFields.Required
		}),
		sex: z.nativeEnum(Sex),
		locationAddress: z
			.string({
				required_error: ErrorFields.Required
			})
			.min(1, ErrorFields.Required),
		phone: z
			.string({
				required_error: ErrorFields.Required
			})
			.regex(/^\d{10}$/, "El celular debe ser de 10 dígitos"),
		email: z
			.string({
				required_error: ErrorFields.Required
			})
			.regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Formato de correo incorrecto")
	})
	.required();
