import { Sex } from "@/enums";

export type Doctor = {
	id: string;
	birthDate: Date;
	creationDate: Date;
	dni: string;
	email: string;
	firstName: string;
	lastName: string;
	locationAddress: string;
	phone: string;
	role: string;
	sex: Sex;
	status: boolean;
	updateDate: Date;
};

export type DoctorCreate = Omit<Doctor, "id">;

export type DoctorTable = {
	id: string;
	index: number;
	dni: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	status: string;
	updateDate: string;
	actions: React.ReactNode;
};
