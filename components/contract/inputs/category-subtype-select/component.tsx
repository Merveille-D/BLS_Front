"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllContractCategorySubTypes } from "@/services/api-sdk/models/contract/contract-category";
export function CategorySubTypeSelectComponent({
  categoryType,
  className,
  ...props
}) {
  const { data, isLoading, isError } =
    useAllContractCategorySubTypes(categoryType);
  if (isError) {
    throw new Error("Failed to load category subtypes");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un sous-type de catégorie" />
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
              Aucun sous-type de catégorie trouvé
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
