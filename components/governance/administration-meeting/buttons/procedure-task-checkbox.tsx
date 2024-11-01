"use client";
import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useUpdateMeetingProcedureTaskStatus } from "@/services/api-sdk/models/administration-meeting";
export default function ProcedureTaskCheckbox({ row }) {
  const { mutateAsync } = useUpdateMeetingProcedureTaskStatus(row.original.id);
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
