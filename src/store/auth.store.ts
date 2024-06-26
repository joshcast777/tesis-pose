import { DefaultValues, ErrorMessages, LocalStorageKeys } from "@/constants";
import { firebaseGetDoctor, firebaseSignInUser, firebaseSignOutUser, firebaseSignUpUser } from "@/firebase/services";
import { ApiResponse, AuthUser, Doctor } from "@/types";
import { AuthStore } from "@/types/store";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const authStore = create<AuthStore>()(
	devtools((set) => ({
		isAuthenticated: Boolean(localStorage.getItem(LocalStorageKeys.Id)) && Boolean(localStorage.getItem(LocalStorageKeys.Role)) && localStorage.getItem(LocalStorageKeys.Id) !== "" && localStorage.getItem(LocalStorageKeys.Role) !== "",
		currentUser: DefaultValues.Doctor,
		clearIsAuthenticated: (): void => {
			set(
				{
					isAuthenticated: false,
					currentUser: DefaultValues.Doctor
				},
				false,
				"CLEAR_ERROR_MESSAGE"
			);
		},
		getCurrentUser: async (id: string): Promise<void> => {
			const apiResponse: ApiResponse<Doctor> = await firebaseGetDoctor(id);

			if (!apiResponse.success) {
				set(
					{
						currentUser: DefaultValues.Doctor,
						isAuthenticated: false
					},
					false,
					"SET_ERROR_MESSAGE"
				);

				return;
			}

			localStorage.setItem(LocalStorageKeys.Id, apiResponse.data!.id);
			localStorage.setItem(LocalStorageKeys.Role, apiResponse.data!.role);

			set(
				{
					currentUser: apiResponse.data!,
					isAuthenticated: true
				},
				false,
				"SET_CURRENT_USER"
			);
		},
		setIsAuthenticated: (user: Doctor): void => {
			set(
				{
					isAuthenticated: true,
					currentUser: user
				},
				false,
				"SET_AUTHENTICATED_USER"
			);
		},
		signInUser: async ({ email, password }: AuthUser): Promise<string> => {
			const apiResponse: ApiResponse<undefined> = await firebaseSignInUser({
				email,
				password
			});

			if (apiResponse.message !== "") {
				if (apiResponse.message === ErrorMessages.InvalidCredentials) {
					return ErrorMessages.InvalidCredentials;
				} else {
					return ErrorMessages.CouldNotCompleteTask;
				}
			}

			return "";
		},
		signOutUser: async (): Promise<string> => {
			const apiResponse: ApiResponse<string> = await firebaseSignOutUser();

			if (!apiResponse.success) {
				return ErrorMessages.CouldNotCompleteTask;
			}

			localStorage.removeItem(LocalStorageKeys.Id);
			localStorage.removeItem(LocalStorageKeys.Role);

			return "";
		},
		signUpUser: async ({ email, password }: AuthUser): Promise<string> => {
			const apiResponse: ApiResponse<undefined> = await firebaseSignUpUser({
				email,
				password
			});

			if (apiResponse.message !== "") {
				return ErrorMessages.CouldNotCompleteTask;
			}

			return "";
		}
	}))
);
