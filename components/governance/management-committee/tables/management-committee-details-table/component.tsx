import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Printer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatStatus } from "@/lib/governance/management-committee";
import { UpdateManagementCommitteeDialog } from "@/components/governance/management-committee/modals/update-management-committee-dialog";
import PrintManagementCommitteeButton from "@/components/governance/management-committee/buttons/print-management-committee-button";
export function ManagementCommitteeDetailsTable({
  id,
  title,
  reference,
  status,
  meetingDate,
  nextTask,
}) {
  const { label: statusLabel, color } = formatStatus(status);
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Référence</TableHead>
          <TableHead className={cn(nextTask && "text-destructive")}>
            Prochaine tâche
          </TableHead>
          <TableHead className={cn(nextTask && "text-destructive")}>
            Prochain délai
          </TableHead>
          <TableHead>Date de tenue</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-card">
          <TableCell>{title}</TableCell>
          <TableCell>{reference}</TableCell>
          <TableCell className={cn("max-w-32", nextTask && "text-destructive")}>
            {nextTask?.title ?? "Aucune tâche"}
          </TableCell>
          <TableCell className={cn(nextTask && "text-destructive")}>
            {nextTask?.dueDate ? formatDate(nextTask.dueDate) : "Aucun délai"}
          </TableCell>
          <TableCell>{formatDate(meetingDate)}</TableCell>
          <TableCell>
            <Badge
              style={{ backgroundColor: color }}
              className="text-nowrap"
            >
              {statusLabel}
            </Badge>
          </TableCell>
          <TableCell>
            <Tooltip>
              <UpdateManagementCommitteeDialog
                asChild
                meetingId={id}
              >
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Pencil />
                  </Button>
                </TooltipTrigger>
              </UpdateManagementCommitteeDialog>
              <TooltipContent>Modifier</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <PrintManagementCommitteeButton
                  meetingId={id}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintManagementCommitteeButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
