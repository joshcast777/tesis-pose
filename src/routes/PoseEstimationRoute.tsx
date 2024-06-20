import { authStore } from "@/store";
import { Auth } from "@/views";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components";
import AdminRoutes from "./components/AdminRoutes";
import DoctorRoutes from "./components/DoctorRoutes";

export default function PoseEstimationRoute(): React.ReactNode {
	const { isAuthenticated, role } = authStore();

	return (
		<Routes>
			<Route
				path="/auth"
				element={
					<PublicRoute redirectTo={`/${role}/dashboard`} isAuthenticated={isAuthenticated}>
						<Auth />
					</PublicRoute>
				}
			/>

			<Route
				path="/*"
				element={
					<PrivateRoute redirectTo="/auth" isAuthenticated={isAuthenticated}>
						<Routes>
							<Route path="admin/*" element={<AdminRoutes />} />

							<Route path="doctor/*" element={<DoctorRoutes />} />
						</Routes>
					</PrivateRoute>
				}
			/>
		</Routes>
	);
}
