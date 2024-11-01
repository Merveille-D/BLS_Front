"use client";
import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useUpdateMeetingChecklistTaskStatus } from "@/services/api-sdk/models/management-committee";
export default function ChecklistTaskCheckbox({ row }) {
  const { mutateAsync } = useUpdateMeetingChecklistTaskStatus(row.original.id);
  const handleCheckedChange = useCallback(
    async (value) => {
      row.toggleSelected(!!value);
      await mutateAsync({ completed: !!value });
    },
    [mutateAsync, row],
  );
  useEffect(() => {
    row.toggleSelected(row.original.completed);
  }, [row]);
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={handleCheckedChange}
      aria-label="Select row"
    />
  );
}
