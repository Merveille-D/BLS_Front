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
import AddLegislativeItemDialog from "@/components/legal-monitoring/modals/add-legislative-item-dialog";
export default function CreateLegislativeItemCard({ className }) {
  return (
    <Card className={cn("max-w-96", className)}>
      <CardHeader>
        <CardTitle>Nouveau texte normatif</CardTitle>
        <CardDescription>Insérer un nouveau texte normatif</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/legal-monitoring/images/create-legislative.svg"
          alt="Insert a legislative text"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddLegislativeItemDialog asChild>
          <Button className="gap-2">
            <Newspaper />
            Nouveau texte
          </Button>
        </AddLegislativeItemDialog>
      </CardFooter>
    </Card>
  );
}
