"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllCountries } from "@/services/country-sdk";
export default function CountrySelect({ className, placeholder, ...props }) {
  const { data, isLoading, isError } = useAllCountries();
  return (
    <Select {...props}>
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
            Aucun pays trouvé
          </SelectItem>
        )}

        {data?.map((country) => (
          <SelectItem
            key={country.code}
            value={country.code}
          >
            {country.flag} {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
