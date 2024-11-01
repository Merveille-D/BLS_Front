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
import { personalSafetyTypes } from "@/services/api-sdk/types/safety/personal-safety/personal-safety";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Printer } from "lucide-react";
import PrintPersonalSafetyButton from "@/components/safety/personal-safety/buttons/print-personal-safety-button";
import { getStatusLabel } from "@/lib/safety/utils";
const getTypeLabel = (type) =>
  personalSafetyTypes.find((t) => t.value === type)?.label ?? "";
export function PersonalSafetyDetailsTable({
  personalSafetyId,
  title,
  reference,
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
          <TableHead>Type</TableHead>
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
              {getTypeLabel(type)}
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
                <PrintPersonalSafetyButton
                  personalSafetyId={personalSafetyId}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintPersonalSafetyButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
