"use client";
import * as React from "react";
import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useAllRoles } from "@/services/api-sdk/models/administration/role/role";
export const getColumns = () => [
  {
    accessorKey: "title",
    header: "Libellé",
  },
];
export default function RolesTable({ className }) {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { data, isLoading, isError } = useAllRoles();
  const columns = useMemo(() => getColumns(), []);
  const table = useReactTable({
    data: data ?? [],
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  return (
    <div className={cn("space-y-5", className)}>
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading && !data && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center"
              >
                Chargement...
              </TableCell>
            </TableRow>
          )}
          {isError && !data && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-destructive"
              >
                Erreur lors du chargement
              </TableCell>
            </TableRow>
          )}
          {table.getRowModel().rows?.length > 0 &&
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn({
                  "bg-card": index % 2 === 0,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {!isLoading && data?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center"
              >
                Aucun rôle trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
