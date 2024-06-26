import { AdminDashboard, DoctorForm } from "@/views";
import { Route, Routes } from "react-router-dom";

export default function AdminRoutes(): React.ReactNode {
	return (
		<Routes>
			<Route path="dashboard" element={<AdminDashboard />} />

			<Route path="doctor/form" element={<DoctorForm />} />

			<Route path="doctor/form/:id" element={<DoctorForm />} />
		</Routes>
	);
}
