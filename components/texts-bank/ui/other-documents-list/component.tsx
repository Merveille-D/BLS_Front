"use client";
import { useAllOtherDocuments } from "@/services/api-sdk/models/texts-bank/other-document";
import OtherDocumentCard from "@/components/texts-bank/ui/other-document-card";
import { useSearchResults } from "@/providers/search-provider";
import { OtherDocumentsListSuspense } from "./suspense";
export function OtherDocumentsList() {
  const { data, isError, isLoading } = useAllOtherDocuments();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <OtherDocumentsListSuspense />;
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
        <OtherDocumentCard
          key={id}
          documentId={id}
          title={title}
          fileUrl={fileUrl}
        />
      ))}
    </div>
  );
}
