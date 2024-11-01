import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllLawyers } from "./requests";
/**
 * Tag for the query to fetch all lawyers.
 */
export const ALL_LAWYERS_QUERY_TAG = ["LAWYERS", "ALL_LAWYERS"];
/**
 * Hook to invalidate all lawyers query.
 * @returns A function to invalidate the all lawyers query.
 */
export const useInvalidateAllLawyers = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_LAWYERS_QUERY_TAG,
    });
};
/**
 * Hook to fetch all lawyers.
 * @returns The query result.
 */
export const useAllLawyers = () =>
  useQuery({
    queryKey: ALL_LAWYERS_QUERY_TAG,
    queryFn: () => getAllLawyers(),
  });
