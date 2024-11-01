import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EvaluationRoutes } from "@/config/routes";
import Link from "next/link";
import { MoveRight } from "lucide-react";
export default function EvaluationCard({
  evaluationId,
  globalScore,
  status,
  collaborator: { firstname, lastname, profile },
}) {
  return (
    <Card className="w-72 sm:w-80">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="line-clamp-2">{`${firstname} ${lastname}`}</CardTitle>
          <Badge className="bg-muted text-muted-foreground hover:bg-muted/90">
            {profile.title}
          </Badge>
        </div>
        <CardDescription>
          <span className="font-bold">Note globale:</span>{" "}
          <span className="italic">{globalScore ?? "-"}</span>
        </CardDescription>
        <div className="flex items-center justify-between gap-2">
          <Badge>{status}</Badge>
          <Button
            asChild
            variant="link"
            className="gap-2 px-0 italic"
          >
            <Link href={EvaluationRoutes.evaluationPage(evaluationId).index}>
              Voir details <MoveRight />
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
