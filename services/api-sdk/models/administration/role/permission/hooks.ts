import { useQuery } from "@tanstack/react-query";
import { getAllPermissions } from "./requests";
/**
 * Tag for the query to fetch all permissions.
 */
export const ALL_PERMISSIONS_QUERY_TAG = ["PERMISSIONS", "ALL_PERMISSIONS"];
/**
 * Hook to fetch all permissions.
 * @returns The query result.
 */
export const useAllPermissions = () =>
  useQuery({
    queryKey: ALL_PERMISSIONS_QUERY_TAG,
    queryFn: () => getAllPermissions(),
  });
