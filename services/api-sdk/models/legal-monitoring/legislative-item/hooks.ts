import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  createLegislativeItem,
  getAllLegislativeItems,
  getOneLegislativeItem,
  printLegislativeItem,
  updateLegislativeItem,
} from "./requests";
/**
 * Tag for the query to fetch all legislative items.
 */
export const LEGISLATIVE_ITEMS_QUERY_KEY = [
  "LEGISLATIVE_ITEMS",
  "ALL_LEGISLATIVE_ITEMS",
];
/**
 * Tag for the query to fetch one legislative item.
 * @param id - The id of the legislative item.
 * @returns The query key.
 */
export const getOneLegislativeItemQueryKey = (id) => [
  "LEGISLATIVE_ITEMS",
  "ONE_LEGISLATIVE_ITEM",
  id,
];
/**
 * Tag generator for the mutation to update a legislative item.
 * @param itemId - The id of the legislative item.
 * @returns The mutation tag.
 */
export const getUpdateLegislativeItemMutationKey = (itemId) => [
  "LEGISLATIVE_ITEMS",
  "UPDATE_LEGISLATIVE_ITEM",
  itemId,
];
/**
 * Tag generator for the mutation to print a legislative item.
 * @param itemId - The id of the legislative item.
 * @returns The mutation tag.
 */
export const getPrintLegislativeItemMutationKey = (itemId) => [
  "LEGISLATIVE_ITEMS",
  "PRINT_LEGISLATIVE_ITEM",
  itemId,
];
/**
 * Tag for the mutation to create a legislative item.
 */
export const CREATE_LEGISLATIVE_ITEM_MUTATION_KEY = [
  "LEGISLATIVE_ITEMS",
  "CREATE_LEGISLATIVE_ITEM",
];
/**
 * Hook to invalidate all legislative items query.
 * @returns A function to invalidate the all legislative items query.
 */
export const useInvalidateAllLegislativeItems = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: LEGISLATIVE_ITEMS_QUERY_KEY,
    });
};
/**
 * Hook to invalidate one legislative item query.
 * @returns A function to invalidate the one legislative item query.
 */
export const useInvalidateOneLegislativeItem = () => {
  const queryClient = useQueryClient();
  return (itemId) =>
    queryClient.invalidateQueries({
      queryKey: getOneLegislativeItemQueryKey(itemId),
    });
};
/**
 * Hook to fetch all legislative items.
 * @returns The query result.
 */
export const useAllLegislativeItems = () =>
  useQuery({
    queryKey: LEGISLATIVE_ITEMS_QUERY_KEY,
    queryFn: () => getAllLegislativeItems(),
  });
/**
 * Hook to fetch one legislative item.
 * @param itemId - The id of the legislative item.
 * @returns The query result.
 */
export const useOneLegislativeItem = (itemId) =>
  useQuery({
    queryKey: getOneLegislativeItemQueryKey(itemId),
    queryFn: () => getOneLegislativeItem(itemId),
  });
/**
 * Hook to create a legislative item.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateLegislativeItem = (options) => {
  const invalidateAllLegislativeItems = useInvalidateAllLegislativeItems();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllLegislativeItems();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllLegislativeItems],
  );
  const mutation = useMutation({
    mutationFn: createLegislativeItem,
    mutationKey: CREATE_LEGISLATIVE_ITEM_MUTATION_KEY,
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
 * Hook to update a legislative item.
 * @param itemId - The ID of the legislative item to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateLegislativeItem = (itemId, options) => {
  const invalidateAllLegislativeItems = useInvalidateAllLegislativeItems();
  const invalidateOneLegislativeItem = useInvalidateOneLegislativeItem();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllLegislativeItems();
        await invalidateOneLegislativeItem(itemId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllLegislativeItems, invalidateOneLegislativeItem, itemId],
  );
  const mutation = useMutation({
    mutationFn: (...args) => updateLegislativeItem(itemId, ...args),
    mutationKey: getUpdateLegislativeItemMutationKey(itemId),
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
 * Hook to print a legislative item.
 * @param itemId - The id of the legislative item to print.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const usePrintLegislativeItem = (itemId, options) => {
  const mutation = useMutation({
    mutationFn: () => printLegislativeItem(itemId),
    mutationKey: getPrintLegislativeItemMutationKey(itemId),
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
