"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllCollaboratorProfiles } from "@/services/api-sdk/models/evaluation/profile";
export function CollaboratorProfileSelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllCollaboratorProfiles();
  if (isError) {
    throw new Error("Failed to load collaborator profiles");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un profile" />
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
              Aucun profile trouvé
            </SelectItem>
          ))}
        {data?.map((profile) => (
          <SelectItem
            key={profile.id}
            value={profile.id}
          >
            {profile.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
