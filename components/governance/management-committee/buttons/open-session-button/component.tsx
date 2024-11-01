"use client";
import EllipsisLoader from "@/components/ui/ellipsis-loader";
import { Button } from "@/components/ui/button";
import { ManagementCommitteeRoutes } from "@/config/routes";
import Link from "next/link";
import { FolderOpen, FolderPlus } from "lucide-react";
import { useCurrentManagementCommittee } from "@/services/api-sdk/models/management-committee";
import AddManagementCommitteeDialog from "@/components/governance/management-committee/modals/add-management-committee-dialog";
export function OpenSessionButton() {
  const { data, isLoading, isError } = useCurrentManagementCommittee();
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
        <Link href={ManagementCommitteeRoutes.session(data.id).index}>
          <FolderOpen />
          Ouvrir la session en cours
        </Link>
      </Button>
    );
  }
  return (
    <AddManagementCommitteeDialog asChild>
      <Button className="gap-2">
        <FolderPlus />
        Nouvelle CODIR
      </Button>
    </AddManagementCommitteeDialog>
  );
}
