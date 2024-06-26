import { AuthUser, Doctor } from "@/types";

export type AuthStore = {
	isAuthenticated: boolean;
	currentUser: Doctor;
	getCurrentUser: (uid: string) => Promise<void>;
	clearIsAuthenticated: () => void;
	setIsAuthenticated: (user: Doctor) => void;
	// setSuccessMessage: (successMessage: string) => void;
	// setUserAdmin: (userAdmin: IUserAdmin) => void;
	signInUser: ({ email, password }: AuthUser) => Promise<string>;
	signOutUser: () => Promise<string>;
	signUpUser: ({ email, password }: AuthUser) => Promise<string>;
	// updateUserEmail: (email: string) => Promise<void>;
};
