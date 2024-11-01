"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllJurisdictions } from "@/services/api-sdk/models/legal-monitoring/jurisdiction";
export function JurisdictionSelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllJurisdictions();
  if (isError) {
    throw new Error("Failed to load jurisdictions");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner une juridiction" />
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
              Aucune juridiction trouvée
            </SelectItem>
          ))}
        {data?.map((jurisdiction) => (
          <SelectItem
            key={jurisdiction.id}
            value={jurisdiction.id}
          >
            {jurisdiction.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
