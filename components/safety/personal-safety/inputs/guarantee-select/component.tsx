"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllGuarantees } from "@/services/api-sdk/models/guarantee";
export function GuaranteeSelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllGuarantees({
    type: "autonomous",
  });
  if (isError) {
    throw new Error("Failed to load guarantees");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner une garantie" />
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
              Aucune garantie trouvée
            </SelectItem>
          ))}
        {data?.map((mortgage) => (
          <SelectItem
            key={mortgage.id}
            value={mortgage.id}
          >
            {mortgage.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
