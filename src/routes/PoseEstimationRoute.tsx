import { authStore } from "@/store";
import { Auth, Dashboard } from "@/views";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components";
import AdminRoutes from "./components/AdminRoutes";

export default function PoseEstimationRoute(): React.ReactNode {
	const { isAuthenticated, role } = authStore();

	return (
		<Routes>
			<Route
				path="/auth"
				element={
					<PublicRoute redirectTo="/admin-dashboard" isAuthenticated={isAuthenticated}>
						<Auth />
					</PublicRoute>
				}
			/>

			<Route
				path="/*"
				element={
					<PrivateRoute redirectTo="/auth" isAuthenticated={isAuthenticated}>
						<Routes>{role === "admin" ? <Route path="admin-dashboard" element={<AdminRoutes />} /> : <Route path="dashboard" element={<Dashboard />} />}</Routes>
					</PrivateRoute>
				}
			/>
		</Routes>
	);
}
