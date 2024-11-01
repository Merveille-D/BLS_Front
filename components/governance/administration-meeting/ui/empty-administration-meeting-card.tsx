import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import AddAdministrationMeetingDialog from "@/components/governance/administration-meeting/modals/add-administration-meeting-dialog";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";
export default function EmptyAdministrationMeetingCard({ className }) {
  return (
    <Card className={cn("max-w-96", className)}>
      <CardHeader>
        <CardTitle>Planifier une session de CA</CardTitle>
        <CardDescription>
          Vous n&apos;avez aucune session de CA en cours de préparation
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/governance/administration-meeting/images/plan-session.svg"
          alt="Plan a session"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddAdministrationMeetingDialog asChild>
          <Button className="gap-2">
            <FolderPlus />
            Nouveau CA
          </Button>
        </AddAdministrationMeetingDialog>
      </CardFooter>
    </Card>
  );
}
