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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Pencil, Printer, UserPlus, UserSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  corporateTypes,
  shareholderTypes,
} from "@/services/api-sdk/types/shareholding";
import { UpdateShareholderDialog } from "@/components/governance/shareholding/modals/update-shareholder-dialog";
import DeleteShareholderButton from "@/components/governance/shareholding/buttons/delete-shareholder-button";
import { useAllShareholders } from "@/services/api-sdk/models/shareholding";
import AddShareholderDialog from "@/components/governance/shareholding/modals/add-shareholder-dialog";
import PrintSharesCertificateButton from "@/components/governance/shareholding/buttons/print-shares-certificate-button";
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
    header: "Nom / Dénomination",
  },
  {
    accessorKey: "nationality",
    header: "Nationalité",
  },
  {
    accessorKey: "address",
    header: "Adresse",
  },
  {
    accessorFn: (row) =>
      shareholderTypes.find((type) => type.value === row.type)?.label,
    header: "Type",
    cell: ({ getValue }) => getValue(),
    meta: {
      filterVariant: "select",
      filterOptions: shareholderTypes,
    },
  },
  {
    accessorFn: (row) =>
      corporateTypes.find((type) => type.value === row.corporateType)?.label,
    header: "Catégorie",
    cell: ({ getValue }) => getValue(),
    meta: {
      filterVariant: "select",
      filterOptions: corporateTypes,
    },
  },
  {
    accessorKey: "unencumberedShares",
    header: "Actions non nanties",
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "encumberedShares",
    header: "Actions nanties",
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorFn: (row) => row.encumberedShares + row.unencumberedShares,
    header: "Total des actions",
    cell: ({ getValue }) => getValue(),
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "sharePercentage",
    header: "Pourcentage des actions",
    cell: ({ getValue }) => `${getValue()}%`,
    meta: {
      filterVariant: "range",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-nowrap text-end">
        <Tooltip>
          <UpdateShareholderDialog
            asChild
            shareholderId={row.original.id}
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
          </UpdateShareholderDialog>
          <TooltipContent>Modifier</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <PrintSharesCertificateButton
              shareholderId={row.original.id}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Printer size={16} />
            </PrintSharesCertificateButton>
          </TooltipTrigger>
          <TooltipContent>Imprimer le certificat d&apos;actions</TooltipContent>
        </Tooltip>

        <DeleteShareholderButton shareholderId={row.original.id} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
export default function ShareholdersTable({
  containerClassName,
  tableWrapperClassName,
}) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const { data, isLoading, isError } = useAllShareholders();
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
    <div className={cn("space-y-5 overflow-auto", containerClassName)}>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Input
            placeholder="Rechercher..."
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-sm pl-10 focus-visible:ring-0"
          />
          <UserSearch className="absolute bottom-1/2 left-3 translate-y-1/2 text-foreground/50" />
        </div>
        <AddShareholderDialog asChild>
          <Button
            aria-label="Ajouter un directeur"
            className="gap-2"
          >
            <UserPlus />
            <span className="sr-only sm:not-sr-only">Ajouter</span>
          </Button>
        </AddShareholderDialog>
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
                  Aucun actionnaire trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
