import { Sex } from "@/enums";
import { AuthForm, Doctor } from "@/types";

type DefaultValue = {
	Doctor: Doctor;
	Login: AuthForm;
};

export const DefaultValues: DefaultValue = {
	Doctor: {
		id: "",
		birthDate: new Date(),
		creationDate: new Date(),
		dni: "",
		email: "",
		firstName: "",
		lastName: "",
		locationAddress: "",
		phone: "",
		role: "",
		sex: Sex.Male,
		status: true,
		updateDate: new Date()
	},
	Login: {
		email: "",
		password: ""
	}
};
