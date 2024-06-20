import React, { useEffect, useState } from "react";
import { Button, Loader } from "@/components/ui";
import { DataTable } from "./components/Datatable";
import { columns } from "@/components/ui/columns";
import { authStore, userStore } from "@/store";
import { NavigateFunction, useNavigate } from "react-router-dom";

export default function AdminDashboard(): React.ReactNode {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { signOutUser } = authStore();
	const { doctors, getDoctors } = userStore();

	const navigate: NavigateFunction = useNavigate();

	// let doctorsData: DoctorTable[] = [];

	const signOutSession = async (): Promise<void> => {
		setIsLoading(true);

		await signOutUser();

		setIsLoading(false);

		navigate("/auth");
	};

	useEffect((): void => {
		const execAsync = async (): Promise<void> => {
			setIsLoading(true);

			await getDoctors();

			// doctorsData = doctors.map(
			// 	({ firstName, lastName, role }: Doctor, index: number): DoctorTable => ({
			// 		index: (index + 1).toString(),
			// 		firstName,
			// 		lastName,
			// 		role,
			// 		actions: <Button>Editar</Button>
			// 	})
			// );

			setIsLoading(false);
		};

		execAsync();
	}, []);

	return (
		<>
			{isLoading && <Loader />}

			<header className="py-3 shadow-md">
				<div className="container flex h-20 items-center justify-between">
					<img src="/src/assets/ug-logo.png" alt="UG Logo" className="h-full" />

					<Button onClick={signOutSession}>Cerrar sesión</Button>
				</div>
			</header>

			<h2 className="container mt-16 text-center text-5xl">Lista de doctores</h2>

			<div className="container mt-16">
				<DataTable columns={columns} data={doctors} />
			</div>
		</>
	);
}
