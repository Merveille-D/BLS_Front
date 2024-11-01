import { useQuery } from "@tanstack/react-query";
import { getAllThirdParties } from "./requests";
export const ALL_THIRD_PARTIES_QUERY_KEY = [
  "THIRD_PARTIES",
  "ALL_THIRD_PARTIES",
];
/**
 * Hook to fetch all third-parties.
 * @returns The query result.
 */
export const useAllThirdParties = () =>
  useQuery({
    queryKey: ALL_THIRD_PARTIES_QUERY_KEY,
    queryFn: () => getAllThirdParties(),
  });
