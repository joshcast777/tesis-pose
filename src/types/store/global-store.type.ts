export type GlobalStore = {
	errorMessage: string;
	isLoading: boolean;
	clearErrorMessage: () => void;
	enableLoading: () => void;
	disableLoading: () => void;
	setErrorMessage: (errorMessage: string) => void;
};
