"use client";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { Button } from "@/components/ui/button";
import { useCurrentAdministrationMeeting } from "@/services/api-sdk/models/administration-meeting";
import { AdministrationMeetingRoutes } from "@/config/routes";
import Link from "next/link";
import { FolderOpen, FolderPlus } from "lucide-react";
import AddAdministrationMeetingDialog from "@/components/governance/administration-meeting/modals/add-administration-meeting-dialog";
export function OpenSessionButton() {
  const { data, isLoading, isError } = useCurrentAdministrationMeeting();
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return (
      <Button disabled>
        <EllipsisLoader />
      </Button>
    );
  }
  if (data) {
    return (
      <Button
        asChild
        className="gap-2"
      >
        <Link href={AdministrationMeetingRoutes.session(data.id).index}>
          <FolderOpen />
          Ouvrir la session en cours
        </Link>
      </Button>
    );
  }
  return (
    <AddAdministrationMeetingDialog asChild>
      <Button className="gap-2">
        <FolderPlus />
        Nouveau CA
      </Button>
    </AddAdministrationMeetingDialog>
  );
}
