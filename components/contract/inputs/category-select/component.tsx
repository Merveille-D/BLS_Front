"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllContractCategories } from "@/services/api-sdk/models/contract/contract-category";
export function CategorySelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllContractCategories();
  if (isError) {
    throw new Error("Failed to load categories");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner une catégorie" />
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
              Aucune catégorie trouvée
            </SelectItem>
          ))}
        {data?.map(({ id, label }) => (
          <SelectItem
            key={id}
            value={id}
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
