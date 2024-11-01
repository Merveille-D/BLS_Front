"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllUsers } from "@/services/api-sdk/models/user/user";
export function UserSelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllUsers();
  if (isError) {
    throw new Error("Failed to load users");
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
            {collaborator.lastname} {collaborator.firstname}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
