import { AdminDashboard } from "@/views";
import { Route, Routes } from "react-router-dom";

export default function AdminRoutes(): React.ReactNode {
	return (
		<Routes>
			<Route path="" element={<AdminDashboard />} />
		</Routes>
	);
}
