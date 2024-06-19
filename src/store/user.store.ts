import { errorResponse, role, uid, userDefault } from "@/constants";
import { firebaseGetUser } from "@/firebase/services";
import { ApiResponse, User, UserStore, UserToken } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const userStore = create<UserStore>()(
	devtools((set) => ({
		errorMessage: "",
		user: userDefault,
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
		getUser: async (userToken: UserToken): Promise<boolean> => {
			const apiResponse: ApiResponse<User> = await firebaseGetUser(userToken.uid);

			if (!apiResponse.success) {
				set(
					{
						errorMessage: `${errorResponse}${apiResponse.message}`
					},
					false,
					"SET_ERROR_MESSAGE"
				);

				localStorage.removeItem(uid);
				localStorage.removeItem(role);

				return false;
			}

			localStorage.setItem(uid, userToken.uid);
			localStorage.setItem(role, apiResponse.data!.role);

			set(
				{
					user: apiResponse.data
				},
				false,
				"SET_USER"
			);

			return true;
		}
	}))
);
