type AuthError = {
	EmailAlreadyInUse: string;
	InvalidCredential: string;
};

type Error = {
	Auth: AuthError;
};

export const ApiErrors: Error = {
	Auth: {
		EmailAlreadyInUse: "auth/email-already-in-use",
		InvalidCredential: "auth/invalid-credential"
	}
};
