import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
const columnsCount = 8;
export function PersonalSafetyDetailsTableSuspense() {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          {Array.from({ length: columnsCount }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableHead key={index}>
              <Skeleton className="h-4 w-32" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-card">
          {Array.from({ length: columnsCount }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={index}>
              <Skeleton className="h-4 w-32" />
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
