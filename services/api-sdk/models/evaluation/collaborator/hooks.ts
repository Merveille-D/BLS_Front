import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  createCollaborator,
  deleteCollaborator,
  getAllCollaborators,
  getOneCollaborator,
  updateCollaborator,
} from "./requests";
/**
 * Tag generator for the query to fetch all collaborators.
 * @param profile - The profile of the user.
 * @returns The query tag.
 */
export const getAllCollaboratorsQueryTag = (profile) =>
  ["COLLABORATOR", "ALL_COLLABORATORS", profile].filter(Boolean);
/**
 * Tag generator for the query to fetch one contract event.
 * @param collaboratorId - The id of the contract event.
 * @returns The query tag.
 */
export const getOneCollaboratorQueryTag = (collaboratorId) => [
  "COLLABORATOR",
  "ONE_COLLABORATOR",
  collaboratorId,
];
/**
 * Tag for the create collaborator mutation.
 */
export const CREATE_COLLABORATOR_MUTATION_KEY = [
  "COLLABORATOR",
  "CREATE_COLLABORATOR",
];
/**
 * Tag generator for the mutation to update an collaborator.
 * @param collaboratorId - The id of the collaborator.
 * @returns The mutation key.
 */
export const getUpdateCollaboratorMutationKey = (collaboratorId) => [
  "COLLABORATOR",
  "UPDATE_COLLABORATOR",
  collaboratorId,
];
/**
 * Tag generator for the mutation to delete an collaborator.
 * @param collaboratorId - The id of the collaborator.
 * @returns The mutation key.
 */
export const getDeleteCollaboratorMutationKey = (collaboratorId) => [
  "COLLABORATOR",
  "DELETE_COLLABORATOR",
  collaboratorId,
];
/**
 * Hook to invalidate all collaborator query.
 * @returns A function to invalidate all collaborator query.
 */
export const useInvalidateAllCollaborators = () => {
  const queryClient = useQueryClient();
  return (profile) =>
    queryClient.invalidateQueries({
      queryKey: getAllCollaboratorsQueryTag(profile),
    });
};
/**
 * Hook to invalidate one collaborator query.
 * @returns A function to invalidate one collaborator query.
 */
export const useInvalidateOneCollaborator = () => {
  const queryClient = useQueryClient();
  return (collaboratorId) =>
    queryClient.invalidateQueries({
      queryKey: getOneCollaboratorQueryTag(collaboratorId),
    });
};
/**
 * Hook to remove one collaborator query.
 * @returns A function to remove one collaborator query.
 */
export const useRemoveOneCollaboratorQuery = () => {
  const queryClient = useQueryClient();
  return (collaboratorId) =>
    queryClient.removeQueries({
      queryKey: getOneCollaboratorQueryTag(collaboratorId),
    });
};
/**
 * Hook to fetch all collaborators.
 * @param profile - The profile of the user.
 * @returns The query result.
 */
export const useAllCollaborators = (profile) =>
  useQuery({
    queryKey: getAllCollaboratorsQueryTag(profile),
    queryFn: () => getAllCollaborators(profile),
  });
/**
 * Hook to fetch one collaborator.
 * @param collaboratorId - The id of the collaborator.
 * @returns The query result.
 */
export const useOneCollaborator = (collaboratorId) =>
  useQuery({
    queryKey: getOneCollaboratorQueryTag(collaboratorId),
    queryFn: () => getOneCollaborator(collaboratorId),
  });
/**
 * Hook to create a new collaborator.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateCollaborator = (options) => {
  const invalidateAllCollaborators = useInvalidateAllCollaborators();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        // @ts-ignore: should remove question mark after profile
        await invalidateAllCollaborators(args[0]?.profile?.id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllCollaborators],
  );
  const mutation = useMutation({
    mutationFn: (args) => createCollaborator(args),
    mutationKey: CREATE_COLLABORATOR_MUTATION_KEY,
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
 * Hook to update an collaborator.
 * @param collaboratorId - The id of the collaborator to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateCollaborator = (collaboratorId, options) => {
  const invalidateOneCollaborator = useInvalidateOneCollaborator();
  const invalidateAllCollaborators = useInvalidateAllCollaborators();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneCollaborator(collaboratorId);
        await invalidateAllCollaborators(args[0]?.profile.id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [collaboratorId, invalidateAllCollaborators, invalidateOneCollaborator],
  );
  const mutation = useMutation({
    mutationFn: (args) => updateCollaborator(collaboratorId, args),
    mutationKey: getUpdateCollaboratorMutationKey(collaboratorId),
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
 * Hook to delete an collaborator.
 * @param collaboratorId - The id of the collaborator to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeleteCollaborator = (collaboratorId, options) => {
  const removeOneCollaborator = useRemoveOneCollaboratorQuery();
  const invalidateAllCollaborators = useInvalidateAllCollaborators();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOneCollaborator(collaboratorId);
        await invalidateAllCollaborators();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [collaboratorId, invalidateAllCollaborators, removeOneCollaborator],
  );
  const mutation = useMutation({
    mutationFn: () => deleteCollaborator(collaboratorId),
    mutationKey: getDeleteCollaboratorMutationKey(collaboratorId),
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
