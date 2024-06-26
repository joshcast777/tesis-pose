import { ToastTypes } from "@/enums";

export type CustomToast = {
	type?: ToastTypes;
	title?: string;
	message?: string;
	icon?: React.ReactNode;
	action?:
		| React.ReactNode
		| {
				label: string;
		  };
	onDismissAndOnAutoCloseFunctions?: () => void;
	onDismissFunction?: () => void;
	onAutoCloseFunction?: () => void;
};
