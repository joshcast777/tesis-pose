import { Button, Loader } from "@/components/ui";
import { doctorStore, globalStore } from "@/store";
import { Doctor, DoctorTable } from "@/types";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { DataTable } from "./components/Datatable";
import { columns } from "./data";
import { HeaderLayout } from "@/layouts";

export default function AdminDashboard(): React.ReactNode {
	const { doctors: doctors, getDoctors: getDoctors } = doctorStore();
	const { isLoading, disableLoading, enableLoading } = globalStore();

	const navigate: NavigateFunction = useNavigate();

	const handleClick = (): void => {
		navigate("/admin/doctor/form");
	};

	useEffect((): void => {
		const execAsync = async (): Promise<void> => {
			enableLoading();

			await getDoctors();

			disableLoading();
		};

		execAsync();
	}, []);

	return (
		<>
			{isLoading && <Loader />}

			<HeaderLayout />

			<h2 className="container mt-16 text-center text-5xl">Lista de doctores</h2>

			<div className="container mt-16 flex items-center justify-between">
				<Button onClick={handleClick}>Nuevo doctor</Button>
			</div>

			<div className="container mt-5">
				<DataTable
					columns={columns}
					data={doctors.map(
						(doctor: Doctor, index: number): DoctorTable => ({
							...doctor,
							index: index + 1,
							status: doctor.status ? "Activo" : "Inactivo",
							updateDate: format(doctor.updateDate, "dd-MM-yyyy"),
							actions: <></>
						})
					)}
				/>
			</div>
		</>
	);
}
