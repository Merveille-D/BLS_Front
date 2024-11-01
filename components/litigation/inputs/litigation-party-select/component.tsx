"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllLitigationParties } from "@/services/api-sdk/models/litigation/litigation-party";
import AddLitigationPartyDialog from "@/components/litigation/modals/add-litigation-party-dialog";
import { Plus } from "lucide-react";
import { useMemo } from "react";
export function LitigationPartySelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllLitigationParties();
  if (isError) {
    throw new Error("Failed to load litigation parties");
  }
  const individualParties = useMemo(
    () => data?.filter((party) => party.type === "individual"),
    [data],
  );
  const corporateParties = useMemo(
    () => data?.filter((party) => party.type === "legal"),
    [data],
  );
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner une partie" />
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
              Aucune partie trouvée
            </SelectItem>
          ))}
        <AddLitigationPartyDialog>
          <SelectItem
            disabled
            value="__add__"
          >
            <span className="inline-flex items-center gap-2">
              <Plus size={16} />
              Ajouter une partie
            </span>
          </SelectItem>
        </AddLitigationPartyDialog>
        <SelectGroup>
          <SelectLabel>Personnes physiques</SelectLabel>
          {!individualParties ||
            (individualParties.length === 0 && (
              <SelectItem
                disabled
                value="__empty__"
                className="ml-5"
              >
                Aucune personne physique trouvée
              </SelectItem>
            ))}
          {individualParties?.map((party) => (
            <SelectItem
              key={party.id}
              value={party.id}
              className="ml-5"
            >
              {party.title}
            </SelectItem>
          ))}
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Personnes morales</SelectLabel>
          {!corporateParties ||
            (corporateParties.length === 0 && (
              <SelectItem
                disabled
                value="__empty__"
                className="ml-5"
              >
                Aucune personne morale trouvée
              </SelectItem>
            ))}
          {corporateParties?.map((party) => (
            <SelectItem
              key={party.id}
              value={party.id}
              className="ml-5"
            >
              {party.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
