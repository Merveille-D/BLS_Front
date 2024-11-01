"use client";
import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useUpdateMeetingAttendantsStatus } from "@/services/api-sdk/models/administration-meeting";
export default function AttendantCheckbox({ meetingId, row }) {
  const { mutateAsync } = useUpdateMeetingAttendantsStatus(meetingId);
  const handleCheckedChange = useCallback(
    async (value) => {
      row.toggleSelected(!!value);
      await mutateAsync({
        attendants: [
          {
            id: row.original.id,
            type: row.original.type,
            isAttending: !!value,
          },
        ],
      });
    },
    [mutateAsync, row],
  );
  useEffect(() => {
    row.toggleSelected(row.original.isAttending);
  }, [row]);
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={handleCheckedChange}
      aria-label="Select row"
    />
  );
}
