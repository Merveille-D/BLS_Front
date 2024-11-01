"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllLegislationNatures } from "@/services/api-sdk/models/legal-monitoring/legislation-nature";
export function LitigationNatureSelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllLegislationNatures();
  if (isError) {
    throw new Error("Failed to load litigation natures");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner une Matière" />
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
              Aucune Matière trouvée
            </SelectItem>
          ))}
        {data?.map((nature) => (
          <SelectItem
            key={nature.id}
            value={nature.id}
          >
            {nature.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
