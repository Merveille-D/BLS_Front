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
import { getSharesTransferStatus } from "@/lib/governance/shareholding";
import React from "react";
export function SharesTransferDetailsTable({
  reference,
  seller,
  buyer,
  status,
  shares,
  transferDate,
  currentTask,
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Référence</TableHead>
          <TableHead>Cédant</TableHead>
          <TableHead>Bénéficiaire</TableHead>
          <TableHead>Nombre d&apos;actions</TableHead>
          <TableHead>Date de transfert</TableHead>
          <TableHead className={cn(currentTask && "text-destructive")}>
            Prochaine tâche
          </TableHead>
          <TableHead className={cn(currentTask && "text-destructive")}>
            Prochain délai
          </TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-card">
          <TableCell>{reference}</TableCell>
          <TableCell>{seller.name}</TableCell>
          <TableCell>{buyer.name}</TableCell>
          <TableCell>
            {shares} action{shares > 1 ? "s" : ""}
          </TableCell>
          <TableCell>{formatDate(transferDate)}</TableCell>
          <TableCell
            className={cn("max-w-32", currentTask && "text-destructive")}
          >
            {currentTask?.title ?? "Aucune tâche"}
          </TableCell>
          <TableCell className={cn(currentTask && "text-destructive")}>
            {currentTask?.dueDate
              ? formatDate(currentTask.dueDate)
              : "Aucun délai"}
          </TableCell>
          <TableCell>
            <Badge
              className={cn("text-nowrap bg-muted text-muted-foreground", {
                "bg-accent text-accent-foreground": status === "pending",
                "bg-destructive text-destructive-foreground":
                  status === "rejected",
                "bg-primary text-primary-foreground": status === "approved",
                "bg-secondary text-secondary-foreground":
                  status === "validated",
              })}
            >
              {getSharesTransferStatus(status)}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
