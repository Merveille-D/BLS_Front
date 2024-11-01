"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllThirdParties } from "@/services/api-sdk/models/shareholding";
export function ThirdPartySelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllThirdParties();
  if (isError) {
    throw new Error("Failed to load third parties.");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un tiers" />
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
              Aucun tiers trouvé
            </SelectItem>
          ))}
        {data?.map((thirdParty) => (
          <SelectItem
            key={thirdParty.id}
            value={thirdParty.id}
          >
            {thirdParty.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
