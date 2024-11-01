"use client";
import { useCurrentManagementCommittee } from "@/services/api-sdk/models/management-committee";
import CurrentManagementCommitteeCard from "@/components/governance/management-committee/ui/current-management-committee-card";
import EmptyManagementCommitteeCard from "@/components/governance/management-committee/ui/empty-management-committee-card";
import { CurrentManagementCommitteeViewSuspense } from "./suspense";
export function CurrentManagementCommitteeView() {
  const { data, isError, isLoading } = useCurrentManagementCommittee();
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return (
      <CurrentManagementCommitteeViewSuspense className="self-center sm:min-w-96 sm:max-w-[50%]" />
    );
  }
  if (!data) {
    return <EmptyManagementCommitteeCard className="self-center" />;
  }
  return (
    <CurrentManagementCommitteeCard
      key={data.id}
      meetingId={data.id}
      title={data.title}
      reference={data.reference}
      meetingDate={data.meetingDate}
      status={data.status}
      nextTask={data.nextTask}
      className="self-center sm:min-w-96 sm:max-w-[50%]"
    />
  );
}
