import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createJurisdiction, getAllJurisdictions } from "./requests";
/**
 * Tag for the query to fetch all jurisdictions.
 */
export const JURIDICTIONS_QUERY_KEY = ["JURIDICTIONS", "ALL_JURIDICTIONS"];
/**
 * Tag for the mutation to create a jurisdiction.
 */
export const CREATE_JURIDICTION_MUTATION_KEY = [
  "JURIDICTIONS",
  "CREATE_JURIDICTION",
];
/**
 * Hook to invalidate all jurisdictions query.
 * @returns A function to invalidate the all jurisdictions query.
 */
export const useInvalidateAllJurisdictions = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: JURIDICTIONS_QUERY_KEY,
    });
};
/**
 * Hook to fetch all jurisdictions.
 * @returns The query result.
 */
export const useAllJurisdictions = () =>
  useQuery({
    queryKey: JURIDICTIONS_QUERY_KEY,
    queryFn: () => getAllJurisdictions(),
  });
/**
 * Hook to create a jurisdiction.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateJurisdiction = (options) => {
  const invalidateAllJurisdictions = useInvalidateAllJurisdictions();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllJurisdictions();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllJurisdictions],
  );
  const mutation = useMutation({
    mutationFn: createJurisdiction,
    mutationKey: CREATE_JURIDICTION_MUTATION_KEY,
    ...getMutationOptions(options),
  });
  const mutate = (mutateArgs, mutateOptions) =>
    mutation.mutate(mutateArgs, getMutationOptions(mutateOptions));
  const mutateAsync = (mutateArgs, mutateOptions) =>
    mutation.mutateAsync(mutateArgs, getMutationOptions(mutateOptions));
  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
