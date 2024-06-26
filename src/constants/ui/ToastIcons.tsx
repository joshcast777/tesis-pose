import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";

type ToastIcon = {
	Error: React.ReactNode;
	Info: React.ReactNode;
	Warn: React.ReactNode;
	Success: React.ReactNode;
};

export const ToastIcons: ToastIcon = {
	Error: <CircleX size={30} className="text-gray-50" />,
	Info: <Info size={30} className="text-gray-50" />,
	Warn: <CircleAlert size={30} className="text-gray-50" />,
	Success: <CircleCheck size={30} className="text-gray-50" />
};
