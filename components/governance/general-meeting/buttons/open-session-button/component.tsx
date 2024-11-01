"use client";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { Button } from "@/components/ui/button";
import { useCurrentGeneralMeeting } from "@/services/api-sdk/models/general-meeting";
import { GeneralMeetingRoutes } from "@/config/routes";
import Link from "next/link";
import { FolderOpen, FolderPlus } from "lucide-react";
import AddGeneralMeetingDialog from "@/components/governance/general-meeting/modals/add-general-meeting-dialog";
export function OpenSessionButton() {
  const { data, isLoading, isError } = useCurrentGeneralMeeting();
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
        <Link href={GeneralMeetingRoutes.session(data.id).index}>
          <FolderOpen />
          Ouvrir la session en cours
        </Link>
      </Button>
    );
  }
  return (
    <AddGeneralMeetingDialog asChild>
      <Button className="gap-2">
        <FolderPlus />
        Nouvelle AG
      </Button>
    </AddGeneralMeetingDialog>
  );
}
