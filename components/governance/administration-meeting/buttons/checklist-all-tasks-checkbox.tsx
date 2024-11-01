"use client";
import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react";
import { useCallback } from "react";
import { useToggleMeetingChecklistTasksStatus } from "@/services/api-sdk/models/administration-meeting";
export default function ChecklistAllTasksCheckbox({ table }) {
  const { mutateAsync } = useToggleMeetingChecklistTasksStatus();
  const handleCheckedChange = useCallback(
    async (value) => {
      table.toggleAllRowsSelected(!!value);
      await mutateAsync(
        table.getRowModel().rows.map((row) => ({
          id: row.original.id,
          completed: !!value,
        })),
      );
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
