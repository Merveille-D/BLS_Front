import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ContractRoutes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import {
  movableSafetySecurities,
  movableSafetyTypes,
} from "@/services/api-sdk/types/safety/movable-safety/movable-safety";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Printer } from "lucide-react";
import PrintMovableSafetyButton from "@/components/safety/movable-safety/buttons/print-movable-safety-button";
import { getStatusLabel } from "@/lib/safety/utils";
const getSecurityLabel = (security) =>
  movableSafetySecurities.find((s) => s.value === security)?.label ?? "";
const getTypeLabel = (security, type) =>
  movableSafetyTypes[security].find((t) => t.value === type)?.label ?? "";
export function MovableSafetyDetailsTable({
  movableSafetyId,
  title,
  reference,
  security,
  type,
  phase,
  contractId,
  currentStep,
  nextStep,
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Référence</TableHead>
          <TableHead>Type de sûreté</TableHead>
          <TableHead>Type de {getSecurityLabel(security)}</TableHead>
          <TableHead>Contrat</TableHead>
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
            <Badge className="text-nowrap bg-muted text-muted-foreground">
              {getSecurityLabel(security)}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge className="text-nowrap bg-muted text-muted-foreground">
              {getTypeLabel(security, type)}
            </Badge>
          </TableCell>
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
                <PrintMovableSafetyButton
                  movableSafetyId={movableSafetyId}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintMovableSafetyButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
