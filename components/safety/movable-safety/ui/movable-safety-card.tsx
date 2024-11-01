import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ContractRoutes, MovableSafetyRoutes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { getStatusLabel } from "@/lib/safety/utils";

export default function MovableSafetyCard({
  movableSafetyId,
  title,
  reference,
  type,
  phase,
  contractId,
}) {
  return (
    <Card className="w-72 sm:w-96">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription>
          <span className="font-bold">Référence:</span>{" "}
          <span className="italic">{reference}</span>
        </CardDescription>
        <CardDescription>
          <Button
            asChild
            variant="link"
            className="gap-1 px-0 italic"
          >
            <Link href={ContractRoutes.contractPage(contractId).index}>
              Voir le contrat
            </Link>
          </Button>
        </CardDescription>
        <div className="flex items-center justify-between gap-2">
          <Badge className="line-clamp-1 w-fit bg-muted text-muted-foreground hover:bg-muted/90">
            {getStatusLabel(phase)}
          </Badge>
          <Button
            asChild
            variant="link"
            className="gap-2 px-0 italic"
          >
            <Link
              href={
                MovableSafetyRoutes.movableSafetyPage(movableSafetyId).index
              }
            >
              Voir details <MoveRight />
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}