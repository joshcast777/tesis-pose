import { Button } from "@/components/ui";
import { DoctorTable } from "@/types";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const columns: ColumnDef<DoctorTable>[] = [
	{
		accessorKey: "id",
		enableHiding: true
	},
	{
		accessorKey: "index",
		header: (): React.ReactNode => <div className="text-center">N°</div>,
		cell: ({ row }: CellContext<DoctorTable, unknown>): React.ReactNode => {
			const index: number = parseInt(row.getValue("index"));

			return <div className="text-center">{index}</div>;
		}
	},
	{
		accessorKey: "dni",
		header: (): React.ReactNode => <div className="text-center">Cédula</div>,
		cell: ({ row }: CellContext<DoctorTable, unknown>): React.ReactNode => {
			const dni: string = row.getValue("dni");

			return <div className="text-center">{dni}</div>;
		}
	},
	{
		accessorKey: "firstName",
		header: (): React.ReactNode => <div className="text-center">Nombres</div>,
		cell: ({ row }: CellContext<DoctorTable, unknown>): React.ReactNode => {
			const firstName: string = row.getValue("firstName");

			return <div className="text-center">{firstName}</div>;
		}
	},
	{
		accessorKey: "lastName",
		header: (): React.ReactNode => <div className="text-center">Apellidos</div>,
		cell: ({ row }: CellContext<DoctorTable, unknown>): React.ReactNode => {
			const lastName: string = row.getValue("lastName");

			return <div className="text-center">{lastName}</div>;
		}
	},
	{
		accessorKey: "phone",
		header: (): React.ReactNode => <div className="text-center">Celular</div>,
		cell: ({ row }: CellContext<DoctorTable, unknown>): React.ReactNode => {
			const phone: string = row.getValue("phone");

			return <div className="text-center">{phone}</div>;
		}
	},
	{
		accessorKey: "email",
		header: (): React.ReactNode => <div className="text-center">Correo</div>,
		cell: ({ row }: CellContext<DoctorTable, unknown>): React.ReactNode => {
			const email: string = row.getValue("email");

			return <div className="text-center">{email}</div>;
		}
	},
	{
		accessorKey: "status",
		header: (): React.ReactNode => <div className="text-center">Estado</div>,
		cell: ({ row }: CellContext<DoctorTable, unknown>): React.ReactNode => {
			const status: string = row.getValue("status");

			return <div className="text-center">{status}</div>;
		}
	},
	{
		accessorKey: "updateDate",
		header: (): React.ReactNode => <div className="text-center">Fecha de creación/actualización</div>,
		cell: ({ row }: CellContext<DoctorTable, unknown>): React.ReactNode => {
			const updateDate: string = row.getValue("updateDate");

			return <div className="text-center">{updateDate}</div>;
		}
	},
	{
		accessorKey: "actions",
		header: () => <div className="text-center">Acciones</div>,
		cell: ({ row }: CellContext<DoctorTable, unknown>): React.ReactNode => {
			const navigate: NavigateFunction = useNavigate();

			const id: number = row.getValue("id");

			return (
				<div className="flex items-center justify-center gap-2">
					<Button
						size="icon"
						className="bg-yellow-500"
						onClick={(): void => {
							navigate(`/admin/doctor/form/${id}`);
						}}
					>
						<Pencil className="h-4 w-4" />
					</Button>

					<Button size="icon" className="bg-red-500">
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			);
		}
	}
];
