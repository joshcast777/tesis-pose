import React, { useEffect, useState } from "react";
import { Loader } from "@/components/ui";
import { doctorStore } from "@/store/doctor.store";
import { DataTable } from "./components/Datatable";
import { columns } from "@/components/ui/columns";

export default function AdminDashboard(): React.ReactNode {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { doctors, getDoctors } = doctorStore();

	// let doctorsData: DoctorTable[] = [];

	useEffect((): void => {
		async function execAsync(): Promise<void> {
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
		}

		execAsync();
	}, []);

	return (
		<>
			{isLoading && <Loader />}

			<header className="py-3 shadow-md">
				<div className="container flex h-20 items-center justify-center">
					<img src="/src/assets/ug-logo.png" alt="UG Logo" className="h-full" />

					{/* <Button>Cerrar sesión</Button> */}
				</div>
			</header>

			<h2 className="container mt-16 text-center text-5xl">Lista de doctores</h2>

			<div className="container mt-16">
				<DataTable columns={columns} data={doctors} />
			</div>
		</>
	);
}
