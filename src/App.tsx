import "./styles/styles.scss";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import PoseEstimationRoute from "./routes/PoseEstimationRoute";
import { useEffect } from "react";
import { role } from "@/constants";
import { authStore } from "@/store";

export default function App(): React.ReactNode {
	const { setIsAuthenticated } = authStore();

	useEffect(() => {
		if (Boolean(localStorage.getItem(role))) {
			setIsAuthenticated(true, localStorage.getItem(role)!);
		} else {
			localStorage.setItem(role, "");
		}
	}, []);

	return (
		<BrowserRouter>
			<PoseEstimationRoute />

			<Toaster expand={true} />
		</BrowserRouter>
	);
}
