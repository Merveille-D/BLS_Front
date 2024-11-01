"use client";
import { useAllAccountIncidents } from "@/services/api-sdk/models/account-incident";
import AccountIncidentCard from "@/components/account-incident/ui/account-incident-card";
import { useSearchResults } from "@/providers/search-provider";
import { AccountIncidentsListSuspense } from "./suspense";
export function AccountIncidentsListComponent() {
  const { data, isError, isLoading } = useAllAccountIncidents();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return <AccountIncidentsListSuspense />;
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
      {filteredData.map(
        ({
          id,
          title,
          reference,
          category,
          author,
          completed,
          dateReceived,
        }) => (
          <AccountIncidentCard
            key={id}
            incidentId={id}
            title={title}
            reference={reference}
            category={category.label}
            author={author}
            completed={completed}
            dateReceived={dateReceived}
          />
        ),
      )}
    </div>
  );
}
