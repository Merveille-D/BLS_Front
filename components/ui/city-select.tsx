"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCitiesByCountry } from "@/services/country-sdk";
export default function CitySelect({
  countryCode,
  className,
  placeholder,
  ...props
}) {
  const { data, isLoading, isError } = useCitiesByCountry(countryCode);
  return (
    <Select
      disabled={!countryCode}
      {...props}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {isLoading && !data && (
          <SelectItem
            disabled
            value="__loading__"
          >
            Chargement...
          </SelectItem>
        )}

        {isError && !data && (
          <SelectItem
            disabled
            value="__error__"
            className="text-destructive"
          >
            Erreur lors du chargement
          </SelectItem>
        )}

        {!isLoading && data?.length === 0 && (
          <SelectItem
            disabled
            value="__empty__"
          >
            Aucune ville trouvée
          </SelectItem>
        )}

        {data?.map((city) => (
          <SelectItem
            key={city.name}
            value={city.name}
          >
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
