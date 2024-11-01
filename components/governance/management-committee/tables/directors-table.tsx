"use client";
import * as React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatDate, formatDuration } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Pencil, UserPlus, UserSearch, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddDirectorDialog from "@/components/governance/management-committee/modals/add-director-dialog";
import { useAllDirectors } from "@/services/api-sdk/models/management-committee/director";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UpdateDirectorDialog } from "@/components/governance/management-committee/modals/update-director-dialog";
import DeleteDirectorButton from "@/components/governance/management-committee/buttons/delete-director-button";
import MandatesDialog from "@/components/governance/management-committee/modals/mandates-dialog";
import TableFilter from "@/components/ui/table-filter";
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nom & Prénom (s)",
  },
  {
    accessorKey: "nationality",
    header: "Nationalité",
  },
  {
    accessorKey: "birthDate",
    header: "Date de naissance",
    cell: ({ row }) => formatDate(row.original.birthDate),
  },
  {
    accessorKey: "age",
    header: "Âge",
    cell: ({ row }) =>
      formatDuration(row.original.birthDate, new Date(), { format: ["years"] }),
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "birthPlace",
    header: "Lieu de naissance",
  },
  {
    accessorKey: "address",
    header: "Adresse",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-end">
        <Tooltip>
          <UpdateDirectorDialog
            asChild
            directorId={row.original.id}
          >
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Pencil size={16} />
              </Button>
            </TooltipTrigger>
          </UpdateDirectorDialog>
          <TooltipContent>Modifier</TooltipContent>
        </Tooltip>

        <Tooltip>
          <MandatesDialog
            asChild
            directorId={row.original.id}
            mandates={row.original.mandates}
          >
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Vote size={16} />
              </Button>
            </TooltipTrigger>
          </MandatesDialog>
          <TooltipContent>Mandats</TooltipContent>
        </Tooltip>

        <DeleteDirectorButton directorId={row.original.id} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
export default function DirectorsTable({
  containerClassName,
  tableWrapperClassName,
}) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { data, isLoading, isError } = useAllDirectors();
  const table = useReactTable({
    data: data ?? [],
    columns,
    filterFns: {},
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    state: {
      globalFilter,
      rowSelection,
      columnFilters,
    },
  });
  return (
    <div className={cn("space-y-5, overflow-auto", containerClassName)}>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Input
            placeholder="Rechercher..."
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-sm pl-10 focus-visible:ring-0"
          />
          <UserSearch className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
        </div>
        <AddDirectorDialog asChild>
          <Button
            aria-label="Ajouter un directeur"
            className="gap-2"
          >
            <UserPlus />
            <span className="sr-only sm:not-sr-only">Ajouter</span>
          </Button>
        </AddDirectorDialog>
      </div>
      <div className={tableWrapperClassName}>
        <Table>
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
                    {header.column.getCanFilter() ? (
                      <div className="py-2">
                        <TableFilter column={header.column} />
                      </div>
                    ) : null}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
                  Aucun directeur trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
