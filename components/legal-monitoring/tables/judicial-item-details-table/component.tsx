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
import { Pencil, Printer } from "lucide-react";
import PrintJudicialItemButton from "@/components/legal-monitoring/buttons/print-judicial-item-button";
import UpdateJudicialItemDialog from "@/components/legal-monitoring/modals/update-judicial-item-dialog";
import { Button } from "@/components/ui/button";
export function JudicialItemDetailsTable({
  itemId,
  reference,
  title,
  isArchived,
  eventDate,
  jurisdiction,
  jurisdictionLocation,
  mail,
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Référence</TableHead>
          <TableHead>Date de décision</TableHead>
          <TableHead>Juridiction</TableHead>
          <TableHead>Lieu de la juridiction</TableHead>
          <TableHead>Mail</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-card">
          <TableCell>{title}</TableCell>
          <TableCell>{reference}</TableCell>
          <TableCell>{formatDate(eventDate)}</TableCell>
          <TableCell>{jurisdiction.title}</TableCell>
          <TableCell>{jurisdictionLocation}</TableCell>
          <TableCell>{mail?.subject ?? "-"}</TableCell>
          <TableCell>
            <Badge
              className={cn(
                isArchived ? "bg-muted text-muted-foreground" : "bg-primary",
              )}
            >
              {isArchived ? "Archivé" : "Envoyé par mail"}
            </Badge>
          </TableCell>
          <TableCell>
            <Tooltip>
              <TooltipTrigger asChild>
                <UpdateJudicialItemDialog
                  asChild
                  itemId={itemId}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Pencil />
                  </Button>
                </UpdateJudicialItemDialog>
              </TooltipTrigger>
              <TooltipContent>Modifier</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <PrintJudicialItemButton
                  itemId={itemId}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintJudicialItemButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
