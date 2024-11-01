import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
export default function LegislativeItemCard({
  title,
  reference,
  type,
  effectiveDate,
  nature,
  isArchived,
}) {
  return (
    <Card className="w-72 sm:w-80">
      <CardHeader className="gap-3">
        <div className="flex items-center gap-2">
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <Badge className="bg-muted text-muted-foreground hover:bg-muted/90">
            {type === "legislation" ? "Législatif" : "Réglementaire"}
          </Badge>
        </div>
        <CardDescription>
          <span className="font-bold">Ref:</span>{" "}
          <span className="italic">{reference}</span>
        </CardDescription>
        <CardDescription>
          <span className="font-bold">Date effective:</span>{" "}
          <span className="italic">{formatDate(effectiveDate)}</span>
        </CardDescription>
        <CardDescription>
          <span className="font-bold">Matière:</span>{" "}
          <span className="italic">{nature}</span>
        </CardDescription>
        <CardDescription>
          <Badge
            className={cn(
              isArchived ? "bg-muted text-muted-foreground" : "bg-primary",
            )}
          >
            {isArchived ? "Archivé" : "Envoyé par mail"}
          </Badge>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
