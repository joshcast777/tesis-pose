import { CircleAlert } from "lucide-react";

type AlertDialogIcon = {
	Warning: React.ReactNode;
};

export const AlertDialogIcons: AlertDialogIcon = {
	Warning: <CircleAlert size={100} className="mb-5" />
};
