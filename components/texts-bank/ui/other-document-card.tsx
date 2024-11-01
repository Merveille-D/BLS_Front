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
import UpdateOtherDocumentDialog from "@/components/texts-bank/modals/update-other-document-dialog";
import DeleteOtherDocumentButton from "@/components/texts-bank/buttons/delete-other-document-button";
export default function OtherDocumentCard({ documentId, title, fileUrl }) {
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
          <UpdateOtherDocumentDialog documentId={documentId}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Pencil />
              </Button>
            </TooltipTrigger>
          </UpdateOtherDocumentDialog>
          <TooltipContent>Modifier</TooltipContent>
        </Tooltip>

        <DeleteOtherDocumentButton documentId={documentId} />
      </CardFooter>
    </Card>
  );
}
