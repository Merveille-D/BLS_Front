"use client";
import { useCurrentGeneralMeeting } from "@/services/api-sdk/models/general-meeting";
import CurrentGeneralMeetingCard from "@/components/governance/general-meeting/ui/current-general-meeting-card";
import EmptyGeneralMeetingCard from "@/components/governance/general-meeting/ui/empty-general-meeting-card";
import { CurrentGeneralMeetingViewSuspense } from "./suspense";
export function CurrentGeneralMeetingView() {
  const { data, isError, isLoading } = useCurrentGeneralMeeting();
  if (isError) {
    throw new Error("An error occurred while fetching the data");
  }
  if (isLoading) {
    return (
      <CurrentGeneralMeetingViewSuspense className="self-center sm:min-w-96 sm:max-w-[50%]" />
    );
  }
  if (!data) {
    return <EmptyGeneralMeetingCard className="self-center" />;
  }
  return (
    <CurrentGeneralMeetingCard
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
