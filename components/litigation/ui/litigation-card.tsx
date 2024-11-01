import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LitigationRoutes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
export default function LitigationCard({
  litigationId,
  title,
  caseNumber,
  reference,
  nature,
  jurisdiction,
  isArchived,
  className,
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="line-clamp-2 flex-1">{title}</CardTitle>
          {isArchived && (
            <Badge className="line-clamp-1 w-fit bg-muted text-muted-foreground hover:bg-muted/90">
              Archivé
            </Badge>
          )}
        </div>
        <CardDescription>
          <span className="font-bold">Numéro de dossier:</span>{" "}
          <span className="italic">{caseNumber}</span>
        </CardDescription>
        <CardDescription>
          <span className="font-bold">Référence:</span>{" "}
          <span className="italic">{reference}</span>
        </CardDescription>
        <CardDescription>
          <span className="font-bold">Matière:</span>{" "}
          <span className="italic">{nature}</span>
        </CardDescription>
        <CardDescription>
          <span className="font-bold">Jurisdiction:</span>{" "}
          <span className="italic">{jurisdiction}</span>
        </CardDescription>
        <div className="flex justify-end gap-2">
          <Button
            asChild
            variant="link"
            className="gap-2 px-0 italic"
          >
            <Link href={LitigationRoutes.litigationPage(litigationId).index}>
              Voir details <MoveRight />
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
