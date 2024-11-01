"use client";
import { useAllLinkItems } from "@/services/api-sdk/models/texts-bank/link-item";
import LinkItemCard from "@/components/texts-bank/ui/link-item-card";
import { useSearchResults } from "@/providers/search-provider";
import { LinkItemsListSuspense } from "./suspense";
export function LinkItemsList() {
  const { data, isError, isLoading } = useAllLinkItems();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <LinkItemsListSuspense />;
  }
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucun élément trouvé
      </p>
    );
  }
  if (filteredData.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucun élément ne correspond à votre recherche
      </p>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
      {filteredData.map(({ id, title, link }) => (
        <LinkItemCard
          key={id}
          linkItemId={id}
          title={title}
          link={link}
        />
      ))}
    </div>
  );
}
