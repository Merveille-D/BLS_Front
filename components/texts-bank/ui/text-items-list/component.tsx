"use client";
import { useAllTextItems } from "@/services/api-sdk/models/texts-bank/text-item";
import TextItemCard from "@/components/texts-bank/ui/text-item-card";
import { useSearchResults } from "@/providers/search-provider";
import { TextItemsListSuspense } from "./suspense";
export function TextItemsList() {
  const { data, isError, isLoading } = useAllTextItems();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <TextItemsListSuspense />;
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
      {filteredData.map(({ id, title, fileUrl }) => (
        <TextItemCard
          key={id}
          textItemId={id}
          title={title}
          fileUrl={fileUrl}
        />
      ))}
    </div>
  );
}
