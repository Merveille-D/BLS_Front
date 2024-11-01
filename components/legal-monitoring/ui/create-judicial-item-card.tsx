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
import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import AddJudicialItemDialog from "@/components/legal-monitoring/modals/add-judicial-item-dialog";
export default function CreateJudicialItemCard({ className }) {
  return (
    <Card className={cn("max-w-96", className)}>
      <CardHeader>
        <CardTitle>Nouvelle affaire judiciaire</CardTitle>
        <CardDescription>
          Insérer une nouvelle affaire judiciaire
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/legal-monitoring/images/create-judicial.svg"
          alt="Insert a judicial case"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddJudicialItemDialog asChild>
          <Button className="gap-2">
            <Scale />
            Nouvelle affaire
          </Button>
        </AddJudicialItemDialog>
      </CardFooter>
    </Card>
  );
}
