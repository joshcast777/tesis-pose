import { UserToken } from "../auth-user.type";
import { User } from "../user.type";

export type UserStore = {
	doctors: User[];
	errorMessage: string;
	user: User;
	clearErrorMessage: () => void;
	getDoctors: () => Promise<void>;
	setErrorMessage: (message: string) => void;
	getUser: (userToken: UserToken) => Promise<boolean>;
};
