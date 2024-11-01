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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Printer } from "lucide-react";
import PrintAccountIncidentButton from "@/components/account-incident/buttons/print-account-incident-button";
export function AccountIncidentDetailsTable({
  incidentId,
  title,
  reference,
  dateReceived,
  isClient,
  isCompleted,
  category,
  author,
  currentTask,
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Référence</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Personne concernée</TableHead>
          <TableHead>Client(e) ?</TableHead>
          <TableHead>Date de réception</TableHead>
          <TableHead className={cn(currentTask && "text-destructive")}>
            Prochaine tâche
          </TableHead>
          <TableHead>Statut</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-card">
          <TableCell>{title}</TableCell>
          <TableCell>{reference}</TableCell>
          <TableCell>
            <Badge className="text-nowrap bg-muted text-muted-foreground">
              {category}
            </Badge>
          </TableCell>
          <TableCell>{author.name}</TableCell>
          <TableCell>
            <Badge className="text-nowrap bg-muted text-muted-foreground">
              {isClient ? "Oui" : "Non"}
            </Badge>
          </TableCell>
          <TableCell>{formatDate(dateReceived)}</TableCell>
          <TableCell className={cn(currentTask && "text-destructive")}>
            {currentTask?.title ?? "Aucune tâche"}
          </TableCell>
          <TableCell>
            <Badge
              className={cn("text-nowrap", {
                "bg-primary": !isCompleted,
                "bg-muted text-muted-foreground hover:bg-muted/90": isCompleted,
              })}
            >
              {isCompleted ? "Résolu" : "En cours"}
            </Badge>
          </TableCell>
          <TableCell>
            <Tooltip>
              <TooltipTrigger asChild>
                <PrintAccountIncidentButton
                  incidentId={incidentId}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintAccountIncidentButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
