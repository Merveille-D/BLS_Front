"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllLawyers } from "@/services/api-sdk/models/user/lawyer";
export function LawyerSelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllLawyers();
  if (isError) {
    throw new Error("Failed to load lawyers");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un avocat" />
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
              Aucun avocat trouvé
            </SelectItem>
          ))}
        {data?.map((lawyer) => (
          <SelectItem
            key={lawyer.id}
            value={lawyer.id}
          >
            {lawyer.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
