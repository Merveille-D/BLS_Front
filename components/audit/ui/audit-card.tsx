import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuditRoutes } from "@/config/routes";
import Link from "next/link";
import { MoveRight } from "lucide-react";
const getModuleLabel = (module) => {
  switch (module) {
    case "contracts":
      return "Contrat";
    case "conventionnal_hypothec":
      return "Garantie";
    case "litigation":
      return "Contentieux";
    case "incidents":
      return "Incident";
    case "recovery":
      return "Recouvrement";
    default:
      return "";
  }
};
export default function AuditCard({
  auditId,
  title,
  globalScore,
  status,
  module,
}) {
  return (
    <Card className="w-72 sm:w-80">
      <CardHeader>
        <div className="flex items-start gap-2">
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <Badge className="bg-muted text-muted-foreground hover:bg-muted/90">
            {getModuleLabel(module)}
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
            <Link href={AuditRoutes.auditPage(auditId).index}>
              Voir details <MoveRight />
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
