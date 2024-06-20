import { DoctorDashboard } from "@/views";
import { Route, Routes } from "react-router-dom";

export default function DoctorRoutes(): React.ReactNode {
	return (
		<Routes>
			<Route path="dashboard" element={<DoctorDashboard />} />
		</Routes>
	);
}
