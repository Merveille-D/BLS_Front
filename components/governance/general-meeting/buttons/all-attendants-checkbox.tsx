"use client";
import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react";
import { useCallback } from "react";
import { useUpdateMeetingAttendantsStatus } from "@/services/api-sdk/models/general-meeting";
export default function AllAttendantsCheckbox({ meetingId, table }) {
  const { mutateAsync } = useUpdateMeetingAttendantsStatus(meetingId);
  const handleCheckedChange = useCallback(
    async (value) => {
      table.toggleAllRowsSelected(!!value);
      await mutateAsync({
        attendants: table.getRowModel().rows.map((row) => ({
          id: row.original.id,
          type: row.original.type,
          isAttending: !!value,
        })),
      });
    },
    [mutateAsync, table],
  );
  return (
    <Checkbox
      checked={
        table.getIsAllRowsSelected() ||
        (table.getIsSomeRowsSelected() && "indeterminate")
      }
      onCheckedChange={handleCheckedChange}
      aria-label="Select all"
    />
  );
}
