import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UpdateAuditDialog from "@/components/audit/modals/update-audit-dialog";
import { cn } from "@/lib/utils";
import AuditScoresModal from "@/components/audit/modals/audit-scores-modal";
export function AuditDetailsTable({
  id,
  reference,
  moduleTitle,
  currentUser,
  canEdit,
  scoresHistory,
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Référence</TableHead>
          <TableHead>Evaluateur</TableHead>
          <TableHead>Note globale</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {scoresHistory.map(
          (
            { id: historyId, evaluator, globalScore, status, scores },
            index,
          ) => (
            <TableRow
              key={historyId}
              className={cn("bg-card", {
                "text-muted-foreground": index > 0,
              })}
            >
              <TableCell>{reference}</TableCell>
              <TableCell>
                {evaluator.lastname} {evaluator.firstname}{" "}
                {currentUser === evaluator.id && (
                  <span className="italic">(Vous)</span>
                )}
              </TableCell>
              <TableCell>
                {globalScore ?? "-"}{" "}
                {index === 0 && <span className="italic">(Actuelle)</span>}
              </TableCell>
              <TableCell>
                <Badge
                  className={cn({
                    "bg-primary text-primary-foreground hover:bg-primary/90":
                      index === 0,
                    "bg-muted text-muted-foreground hover:bg-muted/90":
                      index > 0,
                  })}
                >
                  {status}
                </Badge>
              </TableCell>
              <TableCell className="text-end">
                {index === 0 && canEdit && (
                  <Tooltip>
                    <UpdateAuditDialog
                      asChild
                      audit={{
                        id,
                        scores,
                      }}
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
                    </UpdateAuditDialog>
                    <TooltipContent>Modifier</TooltipContent>
                  </Tooltip>
                )}

                <Tooltip>
                  <AuditScoresModal
                    asChild
                    moduleTitle={moduleTitle}
                    evaluator={evaluator}
                    globalScore={globalScore}
                    scores={scores}
                  >
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Voir les notes"
                        className="gap-2 rounded-full"
                      >
                        <Eye size={30} />
                      </Button>
                    </TooltipTrigger>
                  </AuditScoresModal>
                  <TooltipContent>Voir les notes</TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
