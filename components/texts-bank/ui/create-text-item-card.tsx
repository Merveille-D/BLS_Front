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
import AddTextItemDialog from "@/components/texts-bank/modals/add-text-item-dialog";
export default function CreateTextItemCard({ className }) {
  return (
    <Card className={cn("max-w-96", className)}>
      <CardHeader>
        <CardTitle>Insérer un nouveau texte</CardTitle>
        <CardDescription>
          Insérer un nouveau texte dans le banque de documents
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/texts-bank/images/create-text.svg"
          alt="Insert a link"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddTextItemDialog asChild>
          <Button className="gap-2">
            <Newspaper />
            Nouveau texte
          </Button>
        </AddTextItemDialog>
      </CardFooter>
    </Card>
  );
}
