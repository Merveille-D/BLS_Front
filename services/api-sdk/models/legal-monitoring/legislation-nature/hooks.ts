import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { createLegislationNature, getAllLegislationNatures } from "./requests";
/**
 * Tag for the query to fetch all legislation natures.
 */
export const LEGISLATION_NATURES_QUERY_KEY = [
  "LEGISLATION_NATURES",
  "ALL_LEGISLATION_NATURES",
];
/**
 * Tag for the mutation to create a legislation nature.
 */
export const CREATE_LEGISLATION_NATURE_MUTATION_KEY = [
  "LEGISLATION_NATURES",
  "CREATE_LEGISLATION_NATURE",
];
/**
 * Hook to invalidate all legislation natures query.
 * @returns A function to invalidate the all legislation natures query.
 */
export const useInvalidateAllLegislationNatures = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: LEGISLATION_NATURES_QUERY_KEY,
    });
};
/**
 * Hook to fetch all legislation natures.
 * @returns The query result.
 */
export const useAllLegislationNatures = () =>
  useQuery({
    queryKey: LEGISLATION_NATURES_QUERY_KEY,
    queryFn: () => getAllLegislationNatures(),
  });
/**
 * Hook to create a legislation nature.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateLegislationNature = (options) => {
  const invalidateAllLegislationNatures = useInvalidateAllLegislationNatures();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllLegislationNatures();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllLegislationNatures],
  );
  const mutation = useMutation({
    mutationFn: createLegislationNature,
    mutationKey: CREATE_LEGISLATION_NATURE_MUTATION_KEY,
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
