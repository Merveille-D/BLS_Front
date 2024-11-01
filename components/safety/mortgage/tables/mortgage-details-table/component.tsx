import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn, formatAmount } from "@/lib/utils";
import Link from "next/link";
import { ContractRoutes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Printer } from "lucide-react";
import PrintMortgageButton from "@/components/safety/mortgage/buttons/print-mortgage-button";
import { getStatusLabel } from "@/lib/safety/utils";
export function MortgageDetailsTable({
  mortgageId,
  title,
  reference,
  phase,
  contractId,
  currentStep,
  nextStep,
  estateSalePrice,
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Référence</TableHead>
          <TableHead>Contrat</TableHead>
          <TableHead>Produit de réalisation de l&apos;hypothèque</TableHead>
          <TableHead>Etape actuelle</TableHead>
          <TableHead className={cn(nextStep && "text-destructive")}>
            Prochaine étape
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
            <Button
              asChild
              variant="link"
              className="gap-1 px-0 italic"
            >
              <Link href={ContractRoutes.contractPage(contractId).index}>
                Voir le contrat
              </Link>
            </Button>
          </TableCell>
          <TableCell>
            {estateSalePrice ? formatAmount(estateSalePrice) : "-"}
          </TableCell>
          <TableCell>{currentStep?.title ?? "-"}</TableCell>
          <TableCell className={cn(nextStep && "text-destructive")}>
            {nextStep?.title ?? "-"}
          </TableCell>
          <TableCell>
            <Badge className="text-nowrap bg-muted text-muted-foreground">
              {getStatusLabel(phase)}
            </Badge>
          </TableCell>
          <TableCell>
            <Tooltip>
              <TooltipTrigger asChild>
                <PrintMortgageButton
                  mortgageId={mortgageId}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintMortgageButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
