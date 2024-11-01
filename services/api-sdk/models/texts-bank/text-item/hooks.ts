import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  createTextItem,
  deleteTextItem,
  getAllTextItems,
  getOneTextItem,
  updateTextItem,
} from "./requests";
/**
 * Tag for the query to fetch all text items.
 */
export const TEXT_ITEMS_QUERY_KEY = ["TEXT_ITEMS", "ALL_TEXT_ITEMS"];
/**
 * Tag generator for the query to fetch one text item.
 * @param textItemId - The id of the text item.
 * @returns The query tag.
 */
export const getOneTextItemQueryKey = (textItemId) => [
  "TEXT_ITEMS",
  "ONE_TEXT_ITEM",
  textItemId,
];
/**
 * Tag for the mutation to create a text item.
 */
export const CREATE_TEXT_ITEM_MUTATION_KEY = ["TEXT_ITEMS", "CREATE_TEXT_ITEM"];
/**
 * Tag generator for the mutation to update a text item.
 * @param textItemId - The id of the text item to update.
 * @returns The mutation key.
 */
export const getUpdateTextItemMutationKey = (textItemId) => [
  "TEXT_ITEMS",
  "UPDATE_TEXT_ITEM",
  textItemId,
];
/**
 * Tag generator for the mutation to delete a text item.
 * @param textItemId - The id of the text item to delete.
 * @returns The mutation key.
 */
export const getDeleteTextItemMutationKey = (textItemId) => [
  "TEXT_ITEMS",
  "DELETE_TEXT_ITEM",
  textItemId,
];
/**
 * Hook to invalidate all text items query.
 * @returns A function to invalidate the all text items query.
 */
export const useInvalidateAllTextItems = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: TEXT_ITEMS_QUERY_KEY,
    });
};
/**
 * Hook to invalidate the one text item query.
 * @returns A function to invalidate the one text item query.
 */
export const useInvalidateOneTextItem = () => {
  const queryClient = useQueryClient();
  return (textItemId) =>
    queryClient.invalidateQueries({
      queryKey: getOneTextItemQueryKey(textItemId),
    });
};
/**
 * Hook to remove the one text item query.
 * @returns A function to remove the one text item query.
 */
export const useRemoveOneTextItemQuery = () => {
  const queryClient = useQueryClient();
  return (textItemId) =>
    queryClient.removeQueries({
      queryKey: getOneTextItemQueryKey(textItemId),
    });
};
/**
 * Hook to fetch all text items.
 * @returns The query result.
 */
export const useAllTextItems = () =>
  useQuery({
    queryKey: TEXT_ITEMS_QUERY_KEY,
    queryFn: () => getAllTextItems(),
  });
/**
 * Hook to fetch one text item.
 * @param textItemId - The id of the text item.
 * @returns The query result.
 */
export const useOneTextItem = (textItemId) =>
  useQuery({
    queryKey: getOneTextItemQueryKey(textItemId),
    queryFn: () => getOneTextItem(textItemId),
  });
/**
 * Hook to create a text item.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateTextItem = (options) => {
  const invalidateAllTextItems = useInvalidateAllTextItems();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllTextItems();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllTextItems],
  );
  const mutation = useMutation({
    mutationFn: (args) => {
      const formData = new FormData();
      formData.set("file", args.file);
      return createTextItem({
        title: args.title,
        formData,
      });
    },
    mutationKey: CREATE_TEXT_ITEM_MUTATION_KEY,
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
 * Hook to update a text item.
 * @param textItemId - The id of the text item to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateTextItem = (textItemId, options) => {
  const invalidateOneTextItem = useInvalidateOneTextItem();
  const invalidateAllTextItems = useInvalidateAllTextItems();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneTextItem(textItemId);
        await invalidateAllTextItems();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllTextItems, invalidateOneTextItem, textItemId],
  );
  const mutation = useMutation({
    mutationFn: (args) => {
      const formData = new FormData();
      if (args.file) {
        formData.set("file", args.file);
      }
      return updateTextItem(textItemId, {
        title: args.title,
        formData,
      });
    },
    mutationKey: getUpdateTextItemMutationKey(textItemId),
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
 * Hook to delete a text item.
 * @param textItemId - The id of the text item to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeleteTextItem = (textItemId, options) => {
  const removeOneTextItem = useRemoveOneTextItemQuery();
  const invalidateAllTextItems = useInvalidateAllTextItems();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOneTextItem(textItemId);
        await invalidateAllTextItems();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllTextItems, removeOneTextItem, textItemId],
  );
  const mutation = useMutation({
    mutationFn: () => deleteTextItem(textItemId),
    mutationKey: getDeleteTextItemMutationKey(textItemId),
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
