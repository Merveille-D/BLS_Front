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
import { FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import AddLitigationDialog from "@/components/litigation/modals/add-litigation-dialog";
export default function CreateLitigationCard({ className }) {
  return (
    <Card
      className={cn(
        "max-w-96 self-center sm:min-w-96 sm:max-w-[50%]",
        className,
      )}
    >
      <CardHeader>
        <CardTitle>Initier un dossier</CardTitle>
        <CardDescription>
          Vous pouvez initier un nouveau dossier de contentieux
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/litigation/images/create-litigation.svg"
          alt="Plan a session"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddLitigationDialog asChild>
          <Button className="gap-2">
            <FolderPlus />
            Nouveau dossier
          </Button>
        </AddLitigationDialog>
      </CardFooter>
    </Card>
  );
}
