"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllIncidentAuthors } from "@/services/api-sdk/models/account-incident";
import { Plus } from "lucide-react";
import AddIncidentAuthorDialog from "@/components/account-incident/modals/add-incident-author-dialog";
export function AuthorSelectComponent({ className, ...props }) {
  const { data, isLoading, isError } = useAllIncidentAuthors();
  if (isError) {
    throw new Error("Failed to load authors");
  }
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Sélectionner un auteur" />
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
              Aucun auteur trouvé
            </SelectItem>
          ))}
        {!isLoading && !isError && (
          <AddIncidentAuthorDialog>
            <SelectItem
              disabled
              value="__add__"
            >
              <span className="inline-flex items-center gap-2">
                <Plus size={16} />
                Ajouter un auteur
              </span>
            </SelectItem>
          </AddIncidentAuthorDialog>
        )}
        {data?.map((author) => (
          <SelectItem
            key={author.id}
            value={author.id}
          >
            {author.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
