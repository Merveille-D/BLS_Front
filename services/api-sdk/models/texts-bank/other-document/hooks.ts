import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  createOtherDocument,
  deleteOtherDocument,
  getAllOtherDocuments,
  getOneOtherDocument,
  updateOtherDocument,
} from "./requests";
/**
 * Tag for the query to fetch all documents.
 */
export const OTHER_DOCUMENTS_QUERY_KEY = [
  "OTHER_DOCUMENTS",
  "ALL_OTHER_DOCUMENTS",
];
/**
 * Tag generator for the query to fetch one document.
 * @param documentId - The id of the document.
 * @returns The query tag.
 */
export const getOneOtherDocumentQueryKey = (documentId) => [
  "OTHER_DOCUMENTS",
  "ONE_OTHER_DOCUMENT",
  documentId,
];
/**
 * Tag for the mutation to create a document.
 */
export const CREATE_OTHER_DOCUMENT_MUTATION_KEY = [
  "OTHER_DOCUMENTS",
  "CREATE_OTHER_DOCUMENT",
];
/**
 * Tag generator for the mutation to update a document.
 * @param documentId - The id of the document to update.
 * @returns The mutation key.
 */
export const getUpdateOtherDocumentMutationKey = (documentId) => [
  "OTHER_DOCUMENTS",
  "UPDATE_OTHER_DOCUMENT",
  documentId,
];
/**
 * Tag generator for the mutation to delete a document.
 * @param documentId - The id of the document to delete.
 * @returns The mutation key.
 */
export const getDeleteOtherDocumentMutationKey = (documentId) => [
  "OTHER_DOCUMENTS",
  "DELETE_OTHER_DOCUMENT",
  documentId,
];
/**
 * Hook to invalidate all documents query.
 * @returns A function to invalidate the all documents query.
 */
export const useInvalidateAllOtherDocuments = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: OTHER_DOCUMENTS_QUERY_KEY,
    });
};
/**
 * Hook to invalidate the one document query.
 * @returns A function to invalidate the one document query.
 */
export const useInvalidateOneOtherDocument = () => {
  const queryClient = useQueryClient();
  return (documentId) =>
    queryClient.invalidateQueries({
      queryKey: getOneOtherDocumentQueryKey(documentId),
    });
};
/**
 * Hook to remove the one document query.
 * @returns A function to remove the one document query.
 */
export const useRemoveOneOtherDocumentQuery = () => {
  const queryClient = useQueryClient();
  return (documentId) =>
    queryClient.removeQueries({
      queryKey: getOneOtherDocumentQueryKey(documentId),
    });
};
/**
 * Hook to fetch all documents.
 * @returns The query result.
 */
export const useAllOtherDocuments = () =>
  useQuery({
    queryKey: OTHER_DOCUMENTS_QUERY_KEY,
    queryFn: () => getAllOtherDocuments(),
  });
/**
 * Hook to fetch one document.
 * @param documentId - The id of the document.
 * @returns The query result.
 */
export const useOneOtherDocument = (documentId) =>
  useQuery({
    queryKey: getOneOtherDocumentQueryKey(documentId),
    queryFn: () => getOneOtherDocument(documentId),
  });
/**
 * Hook to create a document.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateOtherDocument = (options) => {
  const invalidateAllOtherDocuments = useInvalidateAllOtherDocuments();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllOtherDocuments();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllOtherDocuments],
  );
  const mutation = useMutation({
    mutationFn: (args) => {
      const formData = new FormData();
      formData.set("file", args.file);
      return createOtherDocument({
        title: args.title,
        formData,
      });
    },
    mutationKey: CREATE_OTHER_DOCUMENT_MUTATION_KEY,
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
 * Hook to update a document.
 * @param documentId - The id of the document to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateOtherDocument = (documentId, options) => {
  const invalidateOneOtherDocument = useInvalidateOneOtherDocument();
  const invalidateAllOtherDocuments = useInvalidateAllOtherDocuments();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneOtherDocument(documentId);
        await invalidateAllOtherDocuments();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllOtherDocuments, invalidateOneOtherDocument, documentId],
  );
  const mutation = useMutation({
    mutationFn: (args) => {
      const formData = new FormData();
      if (args.file) {
        formData.set("file", args.file);
      }
      return updateOtherDocument(documentId, {
        title: args.title,
        formData,
      });
    },
    mutationKey: getUpdateOtherDocumentMutationKey(documentId),
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
 * Hook to delete a document.
 * @param documentId - The id of the document to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeleteOtherDocument = (documentId, options) => {
  const removeOneOtherDocument = useRemoveOneOtherDocumentQuery();
  const invalidateAllOtherDocuments = useInvalidateAllOtherDocuments();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOneOtherDocument(documentId);
        await invalidateAllOtherDocuments();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllOtherDocuments, removeOneOtherDocument, documentId],
  );
  const mutation = useMutation({
    mutationFn: () => deleteOtherDocument(documentId),
    mutationKey: getDeleteOtherDocumentMutationKey(documentId),
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
