import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  createJudicialItem,
  getAllJudicialItems,
  getOneJudicialItem,
  printJudicialItem,
  updateJudicialItem,
} from "./requests";
/**
 * Tag for the query to fetch all judicial items.
 */
export const JUDICIAL_ITEMS_QUERY_KEY = [
  "JUDICIAL_ITEMS",
  "ALL_JUDICIAL_ITEMS",
];
/**
 * Tag for the query to fetch one judicial item.
 * @param itemId - The ID of the judicial item.
 * @returns The query key.
 */
export const getOneJudicialItemQueryKey = (itemId) => [
  "JUDICIAL_ITEMS",
  "ONE_JUDICIAL_ITEM",
  itemId,
];
/**
 * Tag generator for the mutation to update a judicial item.
 * @param itemId - The id of the judicial item.
 * @returns The mutation tag.
 */
export const getUpdateJudicialItemMutationKey = (itemId) => [
  "JUDICIAL_ITEMS",
  "UPDATE_JUDICIAL_ITEM",
  itemId,
];
/**
 * Tag generator for the mutation to print a judicial item.
 * @param itemId - The id of the judicial item.
 * @returns The mutation tag.
 */
export const getPrintJudicialItemMutationKey = (itemId) => [
  "JUDICIAL_ITEMS",
  "PRINT_JUDICIAL_ITEM",
  itemId,
];
/**
 * Tag for the mutation to create a judicial item.
 */
export const CREATE_JUDICIAL_ITEM_MUTATION_KEY = [
  "JUDICIAL_ITEMS",
  "CREATE_JUDICIAL_ITEM",
];
/**
 * Hook to invalidate all judicial items query.
 * @returns A function to invalidate the all judicial items query.
 */
export const useInvalidateAllJudicialItems = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: JUDICIAL_ITEMS_QUERY_KEY,
    });
};
/**
 * Hook to invalidate one judicial item query.
 * @returns A function to invalidate the one judicial item query.
 */
export const useInvalidateOneJudicialItem = () => {
  const queryClient = useQueryClient();
  return (itemId) =>
    queryClient.invalidateQueries({
      queryKey: getOneJudicialItemQueryKey(itemId),
    });
};
/**
 * Hook to fetch all judicial items.
 * @returns The query result.
 */
export const useAllJudicialItems = () =>
  useQuery({
    queryKey: JUDICIAL_ITEMS_QUERY_KEY,
    queryFn: () => getAllJudicialItems(),
  });
/**
 * Hook to fetch one judicial item.
 * @param itemId - The ID of the judicial item.
 * @returns The query result.
 */
export const useOneJudicialItem = (itemId) =>
  useQuery({
    queryKey: getOneJudicialItemQueryKey(itemId),
    queryFn: () => getOneJudicialItem(itemId),
  });
/**
 * Hook to create a judicial item.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateJudicialItem = (options) => {
  const invalidateAllJudicialItems = useInvalidateAllJudicialItems();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllJudicialItems();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllJudicialItems],
  );
  const mutation = useMutation({
    mutationFn: createJudicialItem,
    mutationKey: CREATE_JUDICIAL_ITEM_MUTATION_KEY,
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
/**
 * Hook to update a judicial item.
 * @param itemId - The ID of the judicial item to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateJudicialItem = (itemId, options) => {
  const invalidateAllJudicialItems = useInvalidateAllJudicialItems();
  const invalidateOneJudicialItem = useInvalidateOneJudicialItem();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllJudicialItems();
        await invalidateOneJudicialItem(itemId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllJudicialItems, invalidateOneJudicialItem, itemId],
  );
  const mutation = useMutation({
    mutationFn: (...args) => updateJudicialItem(itemId, ...args),
    mutationKey: getUpdateJudicialItemMutationKey(itemId),
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
/**
 * Hook to print a judicial item.
 * @param itemId - The id of the judicial item to print.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const usePrintJudicialItem = (itemId, options) => {
  const mutation = useMutation({
    mutationFn: () => printJudicialItem(itemId),
    mutationKey: getPrintJudicialItemMutationKey(itemId),
    ...options,
  });
  const mutate = (mutateOptions) => mutation.mutate(undefined, mutateOptions);
  const mutateAsync = (mutateOptions) =>
    mutation.mutateAsync(undefined, mutateOptions);
  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
