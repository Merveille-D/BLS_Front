import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  createLinkItem,
  deleteLinkItem,
  getAllLinkItems,
  getOneLinkItem,
  updateLinkItem,
} from "./requests";
/**
 * Tag for the query to fetch all link items.
 */
export const LINK_ITEMS_QUERY_KEY = ["LINK_ITEMS", "ALL_LINK_ITEMS"];
/**
 * Tag generator for the query to fetch one link item.
 * @param linkItemId - The id of the link item.
 * @returns The query tag.
 */
export const getOneLinkItemQueryKey = (linkItemId) => [
  "LINK_ITEMS",
  "ONE_LINK_ITEM",
  linkItemId,
];
/**
 * Tag for the mutation to create a link item.
 */
export const CREATE_LINK_ITEM_MUTATION_KEY = ["LINK_ITEMS", "CREATE_LINK_ITEM"];
/**
 * Tag generator for the mutation to update a link item.
 * @param linkItemId - The id of the link item to update.
 * @returns The mutation key.
 */
export const getUpdateLinkItemMutationKey = (linkItemId) => [
  "LINK_ITEMS",
  "UPDATE_LINK_ITEM",
  linkItemId,
];
/**
 * Tag generator for the mutation to delete a link item.
 * @param linkItemId - The id of the link item to delete.
 * @returns The mutation key.
 */
export const getDeleteLinkItemMutationKey = (linkItemId) => [
  "LINK_ITEMS",
  "DELETE_LINK_ITEM",
  linkItemId,
];
/**
 * Hook to invalidate all link items query.
 * @returns A function to invalidate the all link items query.
 */
export const useInvalidateAllLinkItems = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: LINK_ITEMS_QUERY_KEY,
    });
};
/**
 * Hook to invalidate the one link item query.
 * @returns A function to invalidate the one link item query.
 */
export const useInvalidateOneLinkItem = () => {
  const queryClient = useQueryClient();
  return (linkItemId) =>
    queryClient.invalidateQueries({
      queryKey: getOneLinkItemQueryKey(linkItemId),
    });
};
/**
 * Hook to remove the one link item query.
 * @returns A function to remove the one link item query.
 */
export const useRemoveOneLinkItemQuery = () => {
  const queryClient = useQueryClient();
  return (linkItemId) =>
    queryClient.removeQueries({
      queryKey: getOneLinkItemQueryKey(linkItemId),
    });
};
/**
 * Hook to fetch all link items.
 * @returns The query result.
 */
export const useAllLinkItems = () =>
  useQuery({
    queryKey: LINK_ITEMS_QUERY_KEY,
    queryFn: () => getAllLinkItems(),
  });
/**
 * Hook to fetch one link item.
 * @param linkItemId - The id of the link item.
 * @returns The query result.
 */
export const useOneLinkItem = (linkItemId) =>
  useQuery({
    queryKey: getOneLinkItemQueryKey(linkItemId),
    queryFn: () => getOneLinkItem(linkItemId),
  });
/**
 * Hook to create a link item.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateLinkItem = (options) => {
  const invalidateAllLinkItems = useInvalidateAllLinkItems();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllLinkItems();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllLinkItems],
  );
  const mutation = useMutation({
    mutationFn: createLinkItem,
    mutationKey: CREATE_LINK_ITEM_MUTATION_KEY,
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
 * Hook to update a link item.
 * @param linkItemId - The id of the link item to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateLinkItem = (linkItemId, options) => {
  const invalidateOneLinkItem = useInvalidateOneLinkItem();
  const invalidateAllLinkItems = useInvalidateAllLinkItems();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneLinkItem(linkItemId);
        await invalidateAllLinkItems();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllLinkItems, invalidateOneLinkItem, linkItemId],
  );
  const mutation = useMutation({
    mutationFn: (args) => updateLinkItem(linkItemId, args),
    mutationKey: getUpdateLinkItemMutationKey(linkItemId),
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
 * Hook to delete a link item.
 * @param linkItemId - The id of the link item to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeleteLinkItem = (linkItemId, options) => {
  const removeOneLinkItem = useRemoveOneLinkItemQuery();
  const invalidateAllLinkItems = useInvalidateAllLinkItems();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOneLinkItem(linkItemId);
        await invalidateAllLinkItems();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllLinkItems, removeOneLinkItem, linkItemId],
  );
  const mutation = useMutation({
    mutationFn: () => deleteLinkItem(linkItemId),
    mutationKey: getDeleteLinkItemMutationKey(linkItemId),
    ...getMutationOptions(options),
  });
  const mutate = (mutateOptions) =>
    mutation.mutate(undefined, getMutationOptions(mutateOptions));
  const mutateAsync = (mutateOptions) =>
    mutation.mutateAsync(undefined, getMutationOptions(mutateOptions));
  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
