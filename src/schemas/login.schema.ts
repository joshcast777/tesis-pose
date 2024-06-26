import { z } from "zod";

export const formSchema = z
	.object({
		email: z
			.string({
				required_error: "Camp requerido"
			})
			.regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Formato de correo incorrecto"),
		password: z.string({
			required_error: "Campo requerido"
		})
	})
	.required();
