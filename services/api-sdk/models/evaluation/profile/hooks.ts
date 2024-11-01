import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  createCollaboratorProfile,
  deleteCollaboratorProfile,
  getAllCollaboratorProfiles,
  getOneCollaboratorProfile,
  updateCollaboratorProfile,
} from "./requests";
/**
 * Tag generator for the query to fetch all contract events.
 * @returns The query tag.
 */
export const getAllCollaboratorProfilesQueryTag = () => [
  "COLLABORATOR_PROFILE",
  "ALL_COLLABORATOR_PROFILES",
];
/**
 * Tag generator for the query to fetch one contract event.
 * @param profileId - The id of the contract event.
 * @returns The query tag.
 */
export const getOneCollaboratorProfileQueryTag = (profileId) => [
  "COLLABORATOR_PROFILE",
  "ONE_COLLABORATOR_PROFILE",
  profileId,
];
/**
 * Tag for the create collaborator profile mutation.
 */
export const CREATE_COLLABORATOR_PROFILE_MUTATION_KEY = [
  "COLLABORATOR_PROFILE",
  "CREATE_COLLABORATOR_PROFILE",
];
/**
 * Tag generator for the mutation to update an collaborator profile.
 * @param profileId - The id of the collaborator profile.
 * @returns The mutation key.
 */
export const getUpdateCollaboratorProfileMutationKey = (profileId) => [
  "COLLABORATOR_PROFILE",
  "UPDATE_COLLABORATOR_PROFILE",
  profileId,
];
/**
 * Tag generator for the mutation to delete an collaborator profile.
 * @param profileId - The id of the collaborator profile.
 * @returns The mutation key.
 */
export const getDeleteCollaboratorProfileMutationKey = (profileId) => [
  "COLLABORATOR_PROFILE",
  "DELETE_COLLABORATOR_PROFILE",
  profileId,
];
/**
 * Hook to invalidate all collaborator profile query.
 * @returns A function to invalidate all collaborator profile query.
 */
export const useInvalidateAllCollaboratorProfiles = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: getAllCollaboratorProfilesQueryTag(),
    });
};
/**
 * Hook to invalidate one collaborator profile query.
 * @returns A function to invalidate one collaborator profile query.
 */
export const useInvalidateOneCollaboratorProfile = () => {
  const queryClient = useQueryClient();
  return (profileId) =>
    queryClient.invalidateQueries({
      queryKey: getOneCollaboratorProfileQueryTag(profileId),
    });
};
/**
 * Hook to remove one collaborator profile query.
 * @returns A function to remove one collaborator profile query.
 */
export const useRemoveOneCollaboratorProfileQuery = () => {
  const queryClient = useQueryClient();
  return (profileId) =>
    queryClient.removeQueries({
      queryKey: getOneCollaboratorProfileQueryTag(profileId),
    });
};
/**
 * Hook to fetch all collaborator profile.
 * @returns The query result.
 */
export const useAllCollaboratorProfiles = () =>
  useQuery({
    queryKey: getAllCollaboratorProfilesQueryTag(),
    queryFn: () => getAllCollaboratorProfiles(),
  });
/**
 * Hook to fetch one collaborator profile.
 * @param profileId - The id of the collaborator profile.
 * @returns The query result.
 */
export const useOneCollaboratorProfile = (profileId) =>
  useQuery({
    queryKey: getOneCollaboratorProfileQueryTag(profileId),
    queryFn: () => getOneCollaboratorProfile(profileId),
  });
/**
 * Hook to create a new collaborator profile.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateCollaboratorProfile = (options) => {
  const invalidateAllCollaboratorProfiles =
    useInvalidateAllCollaboratorProfiles();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllCollaboratorProfiles();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllCollaboratorProfiles],
  );
  const mutation = useMutation({
    mutationFn: (args) => createCollaboratorProfile(args),
    mutationKey: CREATE_COLLABORATOR_PROFILE_MUTATION_KEY,
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
 * Hook to update an collaborator profile.
 * @param profileId - The id of the collaborator profile to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateCollaboratorProfile = (profileId, options) => {
  const invalidateOneCollaboratorProfile =
    useInvalidateOneCollaboratorProfile();
  const invalidateAllCollaboratorProfiles =
    useInvalidateAllCollaboratorProfiles();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneCollaboratorProfile(profileId);
        await invalidateAllCollaboratorProfiles();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      profileId,
      invalidateAllCollaboratorProfiles,
      invalidateOneCollaboratorProfile,
    ],
  );
  const mutation = useMutation({
    mutationFn: (args) => updateCollaboratorProfile(profileId, args),
    mutationKey: getUpdateCollaboratorProfileMutationKey(profileId),
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
 * Hook to delete an collaborator profile.
 * @param profileId - The id of the collaborator profile to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeleteCollaboratorProfile = (profileId, options) => {
  const removeOneCollaboratorProfile = useRemoveOneCollaboratorProfileQuery();
  const invalidateAllCollaboratorProfiles =
    useInvalidateAllCollaboratorProfiles();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOneCollaboratorProfile(profileId);
        await invalidateAllCollaboratorProfiles();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      profileId,
      invalidateAllCollaboratorProfiles,
      removeOneCollaboratorProfile,
    ],
  );
  const mutation = useMutation({
    mutationFn: () => deleteCollaboratorProfile(profileId),
    mutationKey: getDeleteCollaboratorProfileMutationKey(profileId),
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
