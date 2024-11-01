import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatAmount } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Pencil, Printer, Users } from "lucide-react";
import UpdateLitigationDialog from "@/components/litigation/modals/update-litigation-dialog";
import AssignCollaboratorsDialog from "@/components/litigation/modals/assign-collaborators-dialog";
import PrintLitigationButton from "@/components/litigation/buttons/print-litigation-button";
export function LitigationDetailsTable({
  litigationId,
  reference,
  caseNumber,
  estimatedAmount,
  addedAmount,
  remainingAmount,
  nature,
  jurisdiction,
  jurisdictionLocation,
  hasProvisions,
  isArchived,
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Numéro de dossier</TableHead>
          <TableHead>Référence</TableHead>
          {hasProvisions && (
            <>
              <TableHead>Provisions constituées</TableHead>
              <TableHead>Provisions à constituer</TableHead>
              <TableHead>Provisions totales</TableHead>
              <TableHead>Provisions reprises</TableHead>
            </>
          )}
          <TableHead>Matière</TableHead>
          <TableHead>Juridiction</TableHead>
          <TableHead>Lieu de la juridiction</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-card">
          <TableCell>{caseNumber}</TableCell>
          <TableCell>{reference}</TableCell>
          {hasProvisions && (
            <>
              <TableCell>
                {estimatedAmount ? formatAmount(estimatedAmount) : "-"}
              </TableCell>
              <TableCell>
                {addedAmount ? formatAmount(addedAmount) : "-"}
              </TableCell>
              <TableCell>
                {formatAmount((addedAmount ?? 0) + (estimatedAmount ?? 0))}
              </TableCell>
              <TableCell>
                {remainingAmount ? formatAmount(remainingAmount) : "-"}
              </TableCell>
            </>
          )}
          <TableCell>{nature}</TableCell>
          <TableCell>{jurisdiction}</TableCell>
          <TableCell>{jurisdictionLocation}</TableCell>
          <TableCell>
            {isArchived ? (
              <Badge className="text-nowrap bg-muted text-muted-foreground">
                Archivé
              </Badge>
            ) : (
              <Badge className="bg-primary">En cours</Badge>
            )}
          </TableCell>
          <TableCell className="whitespace-nowrap">
            <Tooltip>
              <AssignCollaboratorsDialog
                asChild
                litigationId={litigationId}
              >
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Users />
                  </Button>
                </TooltipTrigger>
              </AssignCollaboratorsDialog>
              <TooltipContent>Affecter</TooltipContent>
            </Tooltip>

            <Tooltip>
              <UpdateLitigationDialog
                asChild
                litigationId={litigationId}
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
              </UpdateLitigationDialog>
              <TooltipContent>Modifier</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <PrintLitigationButton
                  litigationId={litigationId}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintLitigationButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
