import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { History, Pencil, Printer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UpdateContractDialog from "@/components/contract/modals/update-contract-dialog";
import DeleteContractButton from "@/components/contract/buttons/delete-contract-button";
import ContractForwardsDialog from "@/components/contract/modals/contract-forwards-dialog";
import PrintContractButton from "@/components/contract/buttons/print-contract-button";
import { useMemo } from "react";
export function ContractDetailsTable({
  id,
  title,
  signatureDate,
  effectiveDate,
  expirationDate,
  renewalDate,
  category,
  categoryType,
  categorySubType,
  forwards,
}) {
  const categoryLabel = useMemo(() => {
    if (categoryType) {
      return `${category} - ${categoryType}`;
    }
    if (categorySubType) {
      return `${category} - ${categoryType} - ${categorySubType}`;
    }
    return category;
  }, [category, categorySubType, categoryType]);
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Intitulé</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Date de signature</TableHead>
          <TableHead>Date d&apos;entrée en vigueur</TableHead>
          <TableHead>Date d&apos;expiration</TableHead>
          <TableHead>Date de renouvellement</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-card">
          <TableCell>{title}</TableCell>
          <TableCell>
            <Badge className="bg-muted text-muted-foreground hover:bg-muted/90">
              {categoryLabel}
            </Badge>
          </TableCell>
          <TableCell>
            {signatureDate ? formatDate(signatureDate) : "-"}
          </TableCell>
          <TableCell>
            {effectiveDate ? formatDate(effectiveDate) : "-"}
          </TableCell>
          <TableCell>
            {expirationDate ? formatDate(expirationDate) : "-"}
          </TableCell>
          <TableCell>{renewalDate ? formatDate(renewalDate) : "-"}</TableCell>
          <TableCell className="text-nowrap">
            <Tooltip>
              <UpdateContractDialog
                asChild
                contractId={id}
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
              </UpdateContractDialog>
              <TooltipContent>Modifier</TooltipContent>
            </Tooltip>

            <DeleteContractButton contractId={id} />

            <Tooltip>
              <TooltipTrigger asChild>
                <PrintContractButton
                  contractId={id}
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                >
                  <Printer />
                </PrintContractButton>
              </TooltipTrigger>
              <TooltipContent>Imprimer</TooltipContent>
            </Tooltip>

            {forwards && forwards?.length > 0 && (
              <Tooltip>
                <ContractForwardsDialog
                  asChild
                  forwards={forwards}
                >
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                    >
                      <History />
                    </Button>
                  </TooltipTrigger>
                </ContractForwardsDialog>
                <TooltipContent>Historique des transferts</TooltipContent>
              </Tooltip>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
