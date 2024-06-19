import { Doctor } from "../doctor.type";

export type DoctorStore = {
	errorMessage: string;
	doctors: Doctor[];
	clearErrorMessage: () => void;
	setErrorMessage: (message: string) => void;
	getDoctors: () => Promise<void>;
};
