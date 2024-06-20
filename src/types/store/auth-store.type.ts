import { AuthUser } from "@/types";

export type AuthStore = {
	errorMessage: string;
	// isAuthChecked: boolean;
	isAuthenticated: boolean;
	role: string;
	// userAdmin: IUserAdmin;
	// authenticateUser: () => FirebaseUnsubscribe;
	// getAuthenticatedUser: (uid: string) => Promise<void>;
	clearErrorMessage: () => void;
	setErrorMessage: (errorMessage: string) => void;
	// setIsAuthChecked: (isAuthChecked: boolean) => void;
	setIsAuthenticated: (isAuthenticated: boolean, role: string) => void;
	// setSuccessMessage: (successMessage: string) => void;
	// setUserAdmin: (userAdmin: IUserAdmin) => void;
	signInUser: ({ email, password }: AuthUser) => Promise<void>;
	signOutUser: () => Promise<void>;
	// signUpUser: ({ email, password }: IAuthUser) => Promise<void>;
	// updateUserEmail: (email: string) => Promise<void>;
};
