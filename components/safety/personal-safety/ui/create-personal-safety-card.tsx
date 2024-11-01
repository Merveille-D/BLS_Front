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
import AddPersonalSafetyDialog from "@/components/safety/personal-safety/modals/add-personal-safety-dialog";
export default function CreatePersonalSafetyCard({ className }) {
  return (
    <Card
      className={cn(
        "max-w-96 self-center sm:min-w-96 sm:max-w-[50%]",
        className,
      )}
    >
      <CardHeader>
        <CardTitle>Initier une sûreté personnelle</CardTitle>
        <CardDescription>
          Initier une nouvelle sûreté personnelle
        </CardDescription>
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
        <AddPersonalSafetyDialog asChild>
          <Button className="gap-2">
            <FolderPlus />
            Nouvelle sûreté personnelle
          </Button>
        </AddPersonalSafetyDialog>
      </CardFooter>
    </Card>
  );
}
