import { Doctor } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Doctor>[] = [
	{
		accessorKey: "id",
		header: "ID"
	},
	{
		accessorKey: "firstName",
		header: "Nombre"
	},
	{
		accessorKey: "lastName",
		header: "Apellido"
	},
	{
		accessorKey: "role",
		header: "Role"
	}
];
