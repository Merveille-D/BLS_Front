import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useInvalidateAllStakeholders } from "@/services/api-sdk/models/contract/stakeholder";
import { createCorporateItem } from "./requests";
/**
 * Tag for the mutation to create a corporate item.
 */
export const CREATE_CORPORATE_ITEM_MUTATION_KEY = [
  "CORPORATE_ITEMS",
  "CREATE_CORPORATE_ITEM",
];
/**
 * Hook to create a corporate item.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateCorporateItem = (options) => {
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
    mutationFn: createCorporateItem,
    mutationKey: CREATE_CORPORATE_ITEM_MUTATION_KEY,
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
