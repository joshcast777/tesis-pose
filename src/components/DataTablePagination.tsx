import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useEffect } from "react";

type DataTablePaginationProps<TData> = {
	table: Table<TData>;
};

export default function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>): React.ReactNode {
	useEffect((): void => {
		table.setPageSize(10);
	}, []);

	return (
		<div className="mt-12 flex items-center justify-between rounded-md border p-2">
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
			</div>

			<div className="flex items-center space-x-6 lg:space-x-8">
				{/* <div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Rows per page</p>

					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value: string): void => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>

						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map(
								(pageSize): React.ReactNode => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										{pageSize}
									</SelectItem>
								)
							)}
						</SelectContent>
					</Select>
				</div> */}

				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>

				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={(): void => {
							table.setPageIndex(0);
						}}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>

						<ChevronsLeft className="h-4 w-4" />
					</Button>

					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={(): void => {
							table.previousPage();
						}}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>

						<ChevronLeft className="h-4 w-4" />
					</Button>

					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={(): void => {
							table.nextPage();
						}}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>

						<ChevronRight className="h-4 w-4" />
					</Button>

					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={(): void => {
							table.setPageIndex(table.getPageCount() - 1);
						}}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>

						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
