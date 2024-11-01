"use client";
import { useArchivedManagementCommittees } from "@/services/api-sdk/models/management-committee";
import ManagementCommitteeCard from "@/components/governance/management-committee/ui/management-committee-card";
import { useSearchResults } from "@/providers/search-provider";
import { ArchivedManagementCommitteeListSuspense } from "./suspense";
export function ArchivedManagementCommitteeList() {
  const { data, isError } = useArchivedManagementCommittees();
  const filteredData = useSearchResults(data ?? []);
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (!data) {
    return <ArchivedManagementCommitteeListSuspense />;
  }
  if (data.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucune session de CODIR archivée n&apos;a été trouvée
      </p>
    );
  }
  if (filteredData.length === 0) {
    return (
      <p className="text-center text-lg italic text-foreground/75">
        Aucune session de CODIR archivée ne correspond à votre recherche
      </p>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-10 md:gap-20">
      {filteredData.map(({ id, title, reference, meetingDate, status }) => (
        <ManagementCommitteeCard
          key={id}
          meetingId={id}
          title={title}
          reference={reference}
          meetingDate={meetingDate}
          status={status}
        />
      ))}
    </div>
  );
}
