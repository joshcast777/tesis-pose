import { Doctor, DoctorCreate } from "../doctor.type";

export type DoctorStore = {
	doctors: Doctor[];
	errorMessage: string;
	editDoctor: (id: string, doctor: DoctorCreate) => Promise<string>;
	getDoctor: (id: string) => Promise<Doctor | string>;
	getDoctorByEmail: (email: string) => Promise<Doctor | string>;
	getDoctorById: (id: string) => Promise<Doctor>;
	getDoctors: () => Promise<void>;
	saveDoctor: (doctor: DoctorCreate) => Promise<string>;
	setErrorMessage: (message: string) => void;
};
