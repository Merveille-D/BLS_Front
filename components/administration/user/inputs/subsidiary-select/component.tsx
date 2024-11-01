"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllSubsidiaries } from "@/services/api-sdk/models/administration/subsidiary/subsidiary";
export function SubsidiarySelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllSubsidiaries();
  if (isError) {
    throw new Error("Failed to load subsidiaries");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner une filiale" />
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
              Aucune filiale trouvée
            </SelectItem>
          ))}
        {data?.map((subsidiary) => (
          <SelectItem
            key={subsidiary.id}
            value={subsidiary.id}
          >
            {subsidiary.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
