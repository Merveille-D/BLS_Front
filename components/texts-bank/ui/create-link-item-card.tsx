import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import AddLinkItemDialog from "@/components/texts-bank/modals/add-link-item-dialog";
export default function CreateLinkItemCard({ className }) {
  return (
    <Card className={cn("max-w-96", className)}>
      <CardHeader>
        <CardTitle>Insérer un nouveau lien</CardTitle>
        <CardDescription>
          Insérer un nouveau lien dans le banque de documents
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/texts-bank/images/create-link.svg"
          alt="Insert a link"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddLinkItemDialog asChild>
          <Button className="gap-2">
            <LinkIcon />
            Nouveau lien
          </Button>
        </AddLinkItemDialog>
      </CardFooter>
    </Card>
  );
}
