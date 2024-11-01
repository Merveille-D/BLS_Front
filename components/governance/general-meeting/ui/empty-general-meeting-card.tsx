import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import AddGeneralMeetingDialog from "@/components/governance/general-meeting/modals/add-general-meeting-dialog";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { cn } from "@/lib/utils";
export default function EmptyGeneralMeetingCard({ className }) {
  return (
    <Card className={cn("max-w-96", className)}>
      <CardHeader>
        <CardTitle>Planifier une session d&apos;AG</CardTitle>
        <CardDescription>
          Vous n&apos;avez aucune session d&apos;AG en cours de préparation
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/governance/general-meeting/images/plan-session.svg"
          alt="Plan a session"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddGeneralMeetingDialog asChild>
          <Button className="gap-2">
            <FolderPlus />
            Nouvelle AG
          </Button>
        </AddGeneralMeetingDialog>
      </CardFooter>
    </Card>
  );
}
