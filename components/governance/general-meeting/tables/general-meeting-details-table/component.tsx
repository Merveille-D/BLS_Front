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
import { UpdateGeneralMeetingDialog } from "@/components/governance/general-meeting/modals/update-general-meeting-dialog";
import {
  formatMeetingType,
  formatStatus,
} from "@/lib/governance/general-meeting";
import PrintGeneralMeetingButton from "@/components/governance/general-meeting/buttons/print-general-meeting-button";
export function GeneralMeetingDetailsTable({
  id,
  title,
  meetingType,
  reference,
  status,
  meetingDate,
  nextTask,
}) {
  const { label: statusLabel, color } = formatStatus(status);
  const { label: meetingTypeLabel } = formatMeetingType(meetingType);
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Type</TableHead>
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
          <TableCell>
            <Badge className="bg-muted text-muted-foreground hover:bg-muted/90">
              {meetingTypeLabel}
            </Badge>
          </TableCell>
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
              <UpdateGeneralMeetingDialog
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
              </UpdateGeneralMeetingDialog>
              <TooltipContent>Modifier</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <PrintGeneralMeetingButton
                  meetingId={id}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintGeneralMeetingButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
