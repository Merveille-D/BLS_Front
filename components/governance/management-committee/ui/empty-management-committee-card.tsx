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
import AddManagementCommitteeDialog from "@/components/governance/management-committee/modals/add-management-committee-dialog";
export default function EmptyManagementCommitteeCard({ className }) {
  return (
    <Card className={cn("max-w-96", className)}>
      <CardHeader>
        <CardTitle>Planifier une nouvelle réunion du CODIR</CardTitle>
        <CardDescription>
          Vous n&apos;avez aucune réunion du CODIR en cours de préparation
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image
          src="/governance/management-committee/images/plan-session.svg"
          alt="Plan a session"
          width={200}
          height={200}
        />
      </CardContent>
      <CardFooter className="justify-center">
        <AddManagementCommitteeDialog asChild>
          <Button className="gap-2">
            <FolderPlus />
            Nouvelle réunion du CODIR
          </Button>
        </AddManagementCommitteeDialog>
      </CardFooter>
    </Card>
  );
}
