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
import { Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import AddOtherDocumentDialog from "@/components/texts-bank/modals/add-other-document-dialog";
export default function CreateOtherDocumentCard({ className }) {
  return (
    <Card className={cn("max-w-96", className)}>
      <CardHeader>
        <CardTitle>Insérer un autre document</CardTitle>
        <CardDescription>
          Insérer un autre document dans le banque de documents
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/texts-bank/images/create-text.svg"
          alt="Insert a document"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddOtherDocumentDialog asChild>
          <Button className="gap-2">
            <Newspaper />
            Autre document
          </Button>
        </AddOtherDocumentDialog>
      </CardFooter>
    </Card>
  );
}
