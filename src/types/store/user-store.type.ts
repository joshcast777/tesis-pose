import { UserToken } from "../auth-user.type";
import { User } from "../user.type";

export type UserStore = {
	errorMessage: string;
	user: User;
	clearErrorMessage: () => void;
	setErrorMessage: (message: string) => void;
	getUser: (userToken: UserToken) => Promise<boolean>;
};
