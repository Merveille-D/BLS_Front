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
import AddMovableSafetyDialog from "@/components/safety/movable-safety/modals/add-movable-safety-dialog";
export default function CreateMovableSafetyCard({ className }) {
  return (
    <Card
      className={cn(
        "max-w-96 self-center sm:min-w-96 sm:max-w-[50%]",
        className,
      )}
    >
      <CardHeader>
        <CardTitle>Initier une sûreté mobilière</CardTitle>
        <CardDescription>Initier une nouvelle sûreté mobilière</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/safety/mortgage/images/create-mortgage.svg"
          alt="Plan a session"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddMovableSafetyDialog asChild>
          <Button className="gap-2">
            <FolderPlus />
            Nouvelle sûreté mobilière
          </Button>
        </AddMovableSafetyDialog>
      </CardFooter>
    </Card>
  );
}
