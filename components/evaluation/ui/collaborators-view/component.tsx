"use client";
import { Pencil, Plus, Tag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAllCollaborators } from "@/services/api-sdk/models/evaluation/collaborator";
import { UpdateCollaboratorDialog } from "@/components/evaluation/modals/update-collaborator-dialog";
import DeleteCollaboratorButton from "@/components/evaluation/buttons/delete-collaborator-button";
import AddCollaboratorDialog from "@/components/evaluation/modals/add-collaborator-dialog";
import { CollaboratorsViewSuspense } from "./suspense";
export function CollaboratorsViewComponent({ label, profileId, className }) {
  const { data, isLoading, isError } = useAllCollaborators(profileId);
  if (isError) {
    throw new Error("Failed to fetch collaborators");
  }
  if (isLoading) {
    return (
      <CollaboratorsViewSuspense
        label={label}
        className={className}
      />
    );
  }
  return (
    <div
      className={cn(
        "relative flex flex-col gap-5 rounded-xl border-2 p-5",
        className,
      )}
    >
      {label && (
        <span className="absolute left-3 top-0 -translate-y-1/2 bg-background px-2 text-sm font-semibold">
          {label}
        </span>
      )}
      {(!data || data.length === 0) && (
        <p className="text-md text-center italic text-muted-foreground">
          Aucun collaborateur trouvé
        </p>
      )}
      {data?.map(({ id, firstname, lastname }) => (
        <div
          key={id}
          className="flex items-start gap-5"
        >
          <div className="flex-1 space-y-2">
            <span className="text-sm italic text-muted-foreground">
              Nom & Prénom (s)
            </span>
            <div className="flex items-center gap-2">
              <User />
              <span>{lastname}</span>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <span className="text-sm italic text-muted-foreground">
              Prénoms
            </span>
            <div className="flex items-center gap-2">
              <Tag />
              <span>{firstname}</span>
            </div>
          </div>

          <div className="flex items-center">
            <UpdateCollaboratorDialog collaboratorId={id}>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Pencil />
              </Button>
            </UpdateCollaboratorDialog>
            <DeleteCollaboratorButton collaboratorId={id} />
          </div>
        </div>
      ))}
      <AddCollaboratorDialog
        asChild
        profileId={profileId}
      >
        <Button
          type="button"
          variant="ghost"
          className="gap-2 self-end"
        >
          <Plus />
          Ajouter un collaborateur
        </Button>
      </AddCollaboratorDialog>
    </div>
  );
}
