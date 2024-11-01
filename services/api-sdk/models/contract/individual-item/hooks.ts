import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useInvalidateAllStakeholders } from "@/services/api-sdk/models/contract/stakeholder";
import { createIndividualItem } from "./requests";
/**
 * Tag for the mutation to create an individual item.
 */
export const CREATE_INDIVIDUAL_ITEM_MUTATION_KEY = [
  "INDIVIDUAL_ITEMS",
  "CREATE_INDIVIDUAL_ITEM",
];
/**
 * Hook to create a individual item.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateIndividualItem = (options) => {
  const invalidateAllStakeholders = useInvalidateAllStakeholders();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllStakeholders();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllStakeholders],
  );
  const mutation = useMutation({
    mutationFn: createIndividualItem,
    mutationKey: CREATE_INDIVIDUAL_ITEM_MUTATION_KEY,
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
