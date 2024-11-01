"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllCollaborators } from "@/services/api-sdk/models/evaluation/collaborator";
export function CollaboratorSelectComponent({
  profileId,
  className,
  ...props
}) {
  const { data, isLoading, isError } = useAllCollaborators(profileId);
  if (isError) {
    throw new Error("Failed to load collaborators");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un collaborateur" />
      </SelectTrigger>
      <SelectContent>
        {isLoading && (
          <SelectItem
            disabled
            value="__loading__"
          >
            Chargement...
          </SelectItem>
        )}
        {!data ||
          (data.length === 0 && (
            <SelectItem
              disabled
              value="__empty__"
            >
              Aucun collaborateur trouvé
            </SelectItem>
          ))}
        {data?.map((collaborator) => (
          <SelectItem
            key={collaborator.id}
            value={collaborator.id}
          >
            {collaborator.firstname} {collaborator.lastname}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
