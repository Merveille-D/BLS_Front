import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UpdateTextItemDialog from "@/components/texts-bank/modals/update-text-item-dialog";
import DeleteTextItemButton from "@/components/texts-bank/buttons/delete-text-item-button";
export default function TextItemCard({ textItemId, title, fileUrl }) {
  return (
    <Card className="w-72 sm:w-80">
      <CardHeader className="pb-0">
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription>
          <Button
            asChild
            variant="link"
            className="gap-1 px-0 italic"
          >
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le document
              <ExternalLink size={14} />
            </a>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-end">
        <Tooltip>
          <UpdateTextItemDialog textItemId={textItemId}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Pencil />
              </Button>
            </TooltipTrigger>
          </UpdateTextItemDialog>
          <TooltipContent>Modifier</TooltipContent>
        </Tooltip>

        <DeleteTextItemButton textItemId={textItemId} />
      </CardFooter>
    </Card>
  );
}
