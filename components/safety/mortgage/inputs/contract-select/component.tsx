"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllContracts } from "@/services/api-sdk/models/contract/contract";
export function ContractSelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllContracts();
  if (isError) {
    throw new Error("Failed to load contracts");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un contrat" />
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
              Aucun contrat trouvé
            </SelectItem>
          ))}
        {data?.map((contract) => (
          <SelectItem
            key={contract.id}
            value={contract.id}
          >
            {contract.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
