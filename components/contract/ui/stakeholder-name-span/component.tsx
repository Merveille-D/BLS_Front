"use client";
import { useOneStakeholder } from "@/services/api-sdk/models/contract/stakeholder";
export function StakeholderNameSpanComponent({
  stakeholderId,
  className,
  ...props
}) {
  const { data, isLoading, isError } = useOneStakeholder(stakeholderId);
  if (isError) {
    throw new Error("Failed to load stakeholder");
  }
  return (
    <span
      {...props}
      className={className}
    >
      {isLoading ? "Chargement..." : data?.name}
    </span>
  );
}
