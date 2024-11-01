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
import PrintLegislativeItemButton from "@/components/legal-monitoring/buttons/print-legislative-item-button";
import { Button } from "@/components/ui/button";
import UpdateLegislativeItemDialog from "@/components/legal-monitoring/modals/update-legislative-item-dialog";
export function LegislativeItemDetailsTable({
  itemId,
  title,
  caseNumber,
  reference,
  isArchived,
  effectiveDate,
  type,
  nature,
  mail,
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Numéro de dossier</TableHead>
          <TableHead>Référence</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date de prise d&apos;effet</TableHead>
          <TableHead>Matière</TableHead>
          <TableHead>Mail</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-card">
          <TableCell>{title}</TableCell>
          <TableCell>{caseNumber}</TableCell>
          <TableCell>{reference}</TableCell>
          <TableCell>
            <Badge
              className={cn(
                isArchived ? "bg-muted text-muted-foreground" : "bg-primary",
              )}
            >
              {type === "regulation" ? "Réglement" : "Loi"}
            </Badge>
          </TableCell>
          <TableCell>{formatDate(effectiveDate)}</TableCell>
          <TableCell>{nature.title}</TableCell>
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
                <UpdateLegislativeItemDialog
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
                </UpdateLegislativeItemDialog>
              </TooltipTrigger>
              <TooltipContent>Modifier</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <PrintLegislativeItemButton
                  itemId={itemId}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintLegislativeItemButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
