"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllContractCategoryTypes } from "@/services/api-sdk/models/contract/contract-category";
export function CategoryTypeSelectComponent({ category, className, ...props }) {
  const { data, isLoading, isError } = useAllContractCategoryTypes(category);
  if (isError) {
    throw new Error("Failed to load category types");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner une type de catégorie" />
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
              Aucun type de catégorie trouvé
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
