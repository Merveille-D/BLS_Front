"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllShareholders } from "@/services/api-sdk/models/shareholding";
import { useCallback } from "react";
export function ShareholderSelectComponent({
  className,
  onShareholderSelect,
  onValueChange,
  ...props
}) {
  const { data, isLoading, isError } = useAllShareholders();
  if (isError) {
    throw new Error("Failed to load shareholders");
  }
  const handleChange = useCallback(
    (value) => {
      const shareholder = data?.find((s) => s.id === value);
      if (shareholder) {
        onShareholderSelect?.(shareholder);
      }
      onValueChange?.(value);
    },
    [data, onShareholderSelect, onValueChange],
  );
  return (
    <Select
      {...props}
      onValueChange={handleChange}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un actionnaire" />
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
              Aucun actionnaire trouvé
            </SelectItem>
          ))}
        {data?.map((shareholder) => (
          <SelectItem
            key={shareholder.id}
            value={shareholder.id}
          >
            {shareholder.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
