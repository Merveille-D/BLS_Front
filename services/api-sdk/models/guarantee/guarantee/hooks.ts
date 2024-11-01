import { useQuery } from "@tanstack/react-query";
import { getAllGuarantees } from "./requests";
/**
 * Tag for the query to fetch all guarantees.
 */
export const ALL_GUARANTEES_QUERY_TAG = ["GUARANTEES", "ALL_GUARANTEES"];
/**
 * Hook to fetch all guarantees.
 * @param queries - The queries to filter the guarantees.
 * @returns The query result.
 */
export const useAllGuarantees = (queries) =>
  useQuery({
    queryKey: ALL_GUARANTEES_QUERY_TAG,
    queryFn: () => getAllGuarantees(queries),
  });
