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
import UpdateLinkItemDialog from "@/components/texts-bank/modals/update-link-item-dialog";
import DeleteLinkItemButton from "@/components/texts-bank/buttons/delete-link-item-button";
export default function LinkItemCard({ linkItemId, title, link }) {
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
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le lien
              <ExternalLink size={14} />
            </a>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-end">
        <Tooltip>
          <UpdateLinkItemDialog linkItemId={linkItemId}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Pencil />
              </Button>
            </TooltipTrigger>
          </UpdateLinkItemDialog>
          <TooltipContent>Modifier</TooltipContent>
        </Tooltip>

        <DeleteLinkItemButton linkItemId={linkItemId} />
      </CardFooter>
    </Card>
  );
}
