"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllRoles } from "@/services/api-sdk/models/administration/role/role";
export function RoleSelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllRoles();
  if (isError) {
    throw new Error("Failed to load roles");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un rôle" />
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
              Aucun rôle trouvé
            </SelectItem>
          ))}
        {data?.map((role) => (
          <SelectItem
            key={role.id}
            value={role.id}
          >
            {role.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
