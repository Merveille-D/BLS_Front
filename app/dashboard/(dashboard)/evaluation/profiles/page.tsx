import { Group } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfilesListPageBreadcrumb } from "@/components/evaluation/breadcrumbs";
import ProfilesList from "@/components/evaluation/ui/profiles-list";
import AddCollaboratorProfileDialog from "@/components/evaluation/modals/add-collaborator-profile-dialog";
export default function CriteriaListPage() {
  return (
    <div className="container flex flex-1 flex-col gap-10 overflow-y-auto py-5">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <ProfilesListPageBreadcrumb />
        <AddCollaboratorProfileDialog asChild>
          <Button className="gap-2">
            <Group />
            <span className="sr-only sm:not-sr-only">Nouveau profil</span>
          </Button>
        </AddCollaboratorProfileDialog>
      </div>
      <h1 className="relative text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        Choisir un profil
      </h1>
      <ProfilesList />
    </div>
  );
}
