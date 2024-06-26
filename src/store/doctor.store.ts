import { DefaultValues, ErrorMessages } from "@/constants";
import { firebaseEditDoctor, firebaseGetDoctor, firebaseGetDoctorByEmail, firebaseGetDoctors, firebaseSaveDoctor } from "@/firebase/services";
import { ApiResponse, Doctor, DoctorCreate } from "@/types";
import { DoctorStore } from "@/types/store";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const doctorStore = create<DoctorStore>()(
	devtools((set) => ({
		doctors: [],
		errorMessage: "",
		editDoctor: async (id: string, doctor: DoctorCreate): Promise<string> => {
			const apiResponse: ApiResponse<undefined> = await firebaseEditDoctor(id, doctor);

			if (apiResponse.message !== "") {
				return apiResponse.message;
			}

			return "";
		},
		getDoctor: async (id: string): Promise<Doctor | string> => {
			const apiResponse: ApiResponse<Doctor> = await firebaseGetDoctor(id);

			if (apiResponse.message !== "") {
				return apiResponse.message;
			}

			return apiResponse.data!;
		},
		getDoctorByEmail: async (email: string): Promise<Doctor | string> => {
			const apiResponse: ApiResponse<Doctor> = await firebaseGetDoctorByEmail(email);

			if (!apiResponse.success) {
				return ErrorMessages.DataNotFound;
			}

			return apiResponse.data!;
		},
		getDoctorById: async (id: string): Promise<Doctor> => {
			const apiResponse: ApiResponse<Doctor> = await firebaseGetDoctor(id);

			if (apiResponse.message !== "") {
				return DefaultValues.Doctor;
			}

			return apiResponse.data!;
		},
		getDoctors: async (): Promise<void> => {
			const apiResponse: ApiResponse<Doctor[]> = await firebaseGetDoctors();

			if (!apiResponse.success) {
				set(
					{
						errorMessage: "Error/Error al obtener los datos"
					},
					false,
					"SET_ERROR_MESSAGE"
				);

				return;
			}

			set(
				{
					doctors: apiResponse.data
				},
				false,
				"SET_USER"
			);
		},
		saveDoctor: async (doctor: DoctorCreate): Promise<string> => {
			const apiResponse: ApiResponse<undefined> = await firebaseSaveDoctor(doctor);

			if (apiResponse.message !== "") {
				return apiResponse.message;
			}

			return "";
		},
		setErrorMessage: (message: string): void => {
			set(
				{
					errorMessage: message
				},
				false,
				"SET_ERROR_MESSAGE"
			);
		}
	}))
);
