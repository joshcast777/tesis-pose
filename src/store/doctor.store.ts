import { errorResponse } from "@/constants";
import { firebaseGetDoctors } from "@/firebase/services/database.firebase";
import { ApiResponse, Doctor } from "@/types";
import { DoctorStore } from "@/types/store/doctor-store.type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const doctorStore = create<DoctorStore>()(
	devtools((set) => ({
		errorMessage: "",
		doctors: [],
		clearErrorMessage: (): void => {
			set(
				{
					errorMessage: ""
				},
				false,
				"SET_ERROR_MESSAGE"
			);
		},
		setErrorMessage: (message: string): void => {
			set(
				{
					errorMessage: message
				},
				false,
				"SET_ERROR_MESSAGE"
			);
		},
		getDoctors: async (): Promise<void> => {
			const apiResponse: ApiResponse<Doctor[]> = await firebaseGetDoctors();

			if (!apiResponse.success) {
				set(
					{
						errorMessage: `${errorResponse}Error al obtener los datos`
					},
					false,
					"SET_ERROR_MESSAGE"
				);

				return;
			}

			set(
				{
					doctors: structuredClone(apiResponse.data)
				},
				false,
				"SET_USER"
			);
		}
	}))
);
