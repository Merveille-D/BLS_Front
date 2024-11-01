"use client";
import { useCurrentAdministrationMeeting } from "@/services/api-sdk/models/administration-meeting";
import CurrentAdministrationMeetingCard from "@/components/governance/administration-meeting/ui/current-administration-meeting-card";
import EmptyAdministrationMeetingCard from "@/components/governance/administration-meeting/ui/empty-administration-meeting-card";
import { CurrentAdministrationMeetingViewSuspense } from "./suspense";
export function CurrentAdministrationMeetingView() {
  const { data, isError, isLoading } = useCurrentAdministrationMeeting();
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return (
      <CurrentAdministrationMeetingViewSuspense className="self-center sm:min-w-96 sm:max-w-[50%]" />
    );
  }
  if (!data) {
    return <EmptyAdministrationMeetingCard className="self-center" />;
  }
  return (
    <CurrentAdministrationMeetingCard
      key={data.id}
      meetingId={data.id}
      title={data.title}
      reference={data.reference}
      meetingType={data.meetingType}
      meetingDate={data.meetingDate}
      status={data.status}
      nextTask={data.nextTask}
      className="self-center sm:min-w-96 sm:max-w-[50%]"
    />
  );
}
