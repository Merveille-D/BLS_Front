import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
export default function JudicialItemCard({
  title,
  eventDate,
  jurisdiction,
  isArchived,
}) {
  return (
    <Card className="w-72 sm:w-80">
      <CardHeader className="gap-3">
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription>
          <span className="font-bold">Date de l&apos;évènement:</span>{" "}
          <span className="italic">{formatDate(eventDate)}</span>
        </CardDescription>
        <CardDescription>
          <span className="font-bold">Jurisdiction:</span>{" "}
          <span className="italic">{jurisdiction}</span>
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
