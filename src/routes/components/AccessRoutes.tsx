import { Navigate, Outlet } from "react-router-dom";

type AccessRouteProps = {
	redirectTo: string;
	isAuthenticated: boolean;
	children?: JSX.Element;
};

export function PrivateRoute({ redirectTo, isAuthenticated, children }: AccessRouteProps): React.ReactNode {
	return isAuthenticated ? children || <Outlet /> : <Navigate to={redirectTo} />;
}

export function PublicRoute({ redirectTo, isAuthenticated, children }: AccessRouteProps): JSX.Element {
	return isAuthenticated ? <Navigate to={redirectTo} /> : children || <Outlet />;
}
