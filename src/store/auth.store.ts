import { accessToken, errorResponse, role, uid } from "@/constants";
import { firebaseGetUser, firebaseSignInUser, firebaseSignOutUser } from "@/firebase/services";
import { ApiResponse, AuthStore, AuthUser } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const authStore = create<AuthStore>()(
	devtools((set) => ({
		errorMessage: "",
		isAuthenticated: Boolean(localStorage.getItem(uid)) && Boolean(localStorage.getItem(accessToken)) && Boolean(localStorage.getItem(role)),
		role: Boolean(localStorage.getItem(role)) ? localStorage.getItem(role)! : "",
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
		setIsAuthenticated: (isAuthenticated: boolean, role: string): void => {
			set(
				{
					isAuthenticated,
					role
				},
				false,
				"SET_AUTHENTICATED_USER"
			);
		},
		signInUser: async ({ email, password }: AuthUser): Promise<void> => {
			console.log(email);
			console.log(password);
			const authApiResponse: ApiResponse<string> = await firebaseSignInUser({
				email,
				password
			});

			console.log(authApiResponse.message);
			console.log(authApiResponse.message !== "");
			if (authApiResponse.message !== "") {
				set(
					{
						errorMessage: authApiResponse.message.includes("auth/invalid-credential") ? `${errorResponse}${authApiResponse.message}` : "Error/Vuelva a intentarlo"
					},
					false,
					"SET_ERROR_MESSAGE"
				);

				return;
			}

			const userApiResponse = await firebaseGetUser(authApiResponse.data!);

			if (userApiResponse.message !== "") {
				set(
					{
						errorMessage: authApiResponse.message.includes("auth/invalid-credential") ? `${errorResponse}${authApiResponse.message}` : "Error/Vuelva a intentarlo"
					},
					false,
					"SET_ERROR_MESSAGE"
				);

				return;
			}

			localStorage.setItem(uid, userApiResponse.data!.id);
			localStorage.setItem(role, userApiResponse.data!.role);

			set(
				{
					isAuthenticated: true,
					role: userApiResponse.data!.role
				},
				false,
				"SET_IS_AUTHENTICATED"
			);
		},
		signOutUser: async (): Promise<void> => {
			const apiResponse: ApiResponse<string> = await firebaseSignOutUser();

			if (!apiResponse.success) {
				set(
					{
						errorMessage: `${errorResponse}No se pudo cerrar sesión`
					},
					false,
					"SET_ERROR_MESSAGE"
				);

				return;
			}

			localStorage.removeItem(uid);
			localStorage.removeItem(role);

			set(
				{
					isAuthenticated: false,
					role: ""
				},
				false,
				"SET_IS_AUTHENTICATED"
			);

			// const authApiResponse: ApiResponse<string> = await firebaseSignInUser({
			// 	email,
			// 	password
			// });

			// if (authApiResponse.message !== "") {
			// 	set(
			// 		{
			// 			errorMessage: authApiResponse.message.includes("auth/invalid-credential") ? `${errorResponse}${authApiResponse.message}` : "Error/Vuelva a intentarlo"
			// 		},
			// 		false,
			// 		"SET_ERROR_MESSAGE"
			// 	);

			// 	return;
			// }

			// const userApiResponse = await firebaseGetUser(authApiResponse.data!);

			// if (userApiResponse.message !== "") {
			// 	set(
			// 		{
			// 			errorMessage: authApiResponse.message.includes("auth/invalid-credential") ? `${errorResponse}${authApiResponse.message}` : "Error/Vuelva a intentarlo"
			// 		},
			// 		false,
			// 		"SET_ERROR_MESSAGE"
			// 	);

			// 	return;
			// }

			// localStorage.setItem(uid, userApiResponse.data!.id);
			// localStorage.setItem(role, userApiResponse.data!.role);

			// set(
			// 	{
			// 		isAuthenticated: true,
			// 		role: userApiResponse.data!.role
			// 	},
			// 	false,
			// 	"SET_IS_AUTHENTICATED"
			// );
		}
	}))
);
