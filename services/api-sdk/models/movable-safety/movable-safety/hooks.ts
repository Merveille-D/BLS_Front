import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
// eslint-disable-next-line import/no-cycle
import {
  printMovableSafety,
  useInvalidateAllMovableSafetySteps,
} from "@/services/api-sdk/models/movable-safety";
import {
  createMovableSafety,
  getAllMovableSafeties,
  getOneMovableSafety,
  startRealisation,
} from "./requests";
/**
 * Tag for the query to fetch all movable safeties.
 */
export const ALL_MOVABLE_SAFETIES_QUERY_TAG = [
  "MOVABLE_SAFETIES",
  "ALL_MOVABLE_SAFETIES",
];
/**
 * Tag generator for the query to fetch one movable safety
 * @param movableSafetyId - The id of the movable safety.
 * @returns The query tag.
 */
export const getOneMovableSafetyQueryTag = (movableSafetyId) => [
  "MOVABLE_SAFETIES",
  "ONE_MOVABLE_SAFETY",
  movableSafetyId,
];
/**
 * Tag generator for the mutation to print a movable safety.
 * @param movableSafetyId - The id of the movable safety.
 * @returns The mutation tag.
 */
export const getPrintMovableSafetyMutationKey = (movableSafetyId) => [
  "MOVABLE_SAFETY",
  "PRINT_MOVABLE_SAFETY",
  movableSafetyId,
];
/**
 * Tag generator for the mutation to start realisation.
 * @param movableSafetyId - The id of the movable safety.
 * @returns The mutation tag.
 */
export const getStartRealisationMutationKey = (movableSafetyId) => [
  "MOVABLE_SAFETIES",
  "START_REALISATION",
  movableSafetyId,
];
/**
 * Tag for the mutation to create a movable safety.
 */
export const CREATE_MOVABLE_SAFETY_MUTATION_KEY = [
  "MOVABLE_SAFETIES",
  "CREATE_MOVABLE_SAFETY",
];
/**
 * Hook to invalidate all movable safeties query.
 * @returns A function to invalidate the all movable safeties query.
 */
export const useInvalidateAllMovableSafeties = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_MOVABLE_SAFETIES_QUERY_TAG,
    });
};
/**
 * Hook to invalidate the one movable safety query.
 * @returns A function to invalidate the one movable safety query.
 */
export const useInvalidateOneMovableSafety = () => {
  const queryClient = useQueryClient();
  return (movableSafetyId) =>
    queryClient.invalidateQueries({
      queryKey: getOneMovableSafetyQueryTag(movableSafetyId),
    });
};
/**
 * Hook to remove the one movable safety query.
 * @returns A function to remove the one movable safety query.
 */
export const useRemoveOneMovableSafetyQuery = () => {
  const queryClient = useQueryClient();
  return (movableSafetyId) =>
    queryClient.removeQueries({
      queryKey: getOneMovableSafetyQueryTag(movableSafetyId),
    });
};
/**
 * Hook to fetch all movable safeties.
 * @param queries - The queries to filter the movable safeties.
 * @returns The query result.
 */
export const useAllMovableSafeties = (queries) =>
  useQuery({
    queryKey: ALL_MOVABLE_SAFETIES_QUERY_TAG,
    queryFn: () => getAllMovableSafeties(queries),
  });
/**
 * Hook to fetch one movable safety.
 * @param movableSafetyId - The id of the movable safety.
 * @returns The query result.
 */
export const useOneMovableSafety = (movableSafetyId) =>
  useQuery({
    queryKey: getOneMovableSafetyQueryTag(movableSafetyId),
    queryFn: () => getOneMovableSafety(movableSafetyId),
  });
/**
 * Hook to create a movable safety.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateMovableSafety = (options) => {
  const invalidateAllMovableSafeties = useInvalidateAllMovableSafeties();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllMovableSafeties();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllMovableSafeties],
  );
  const mutation = useMutation({
    mutationFn: (args) => createMovableSafety(args),
    mutationKey: CREATE_MOVABLE_SAFETY_MUTATION_KEY,
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
 * Hook to start realisation.
 * @param movableSafetyId - The id of the movable safety.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useStartRealisation = (movableSafetyId, options) => {
  const invalidateOneMovableSafety = useInvalidateOneMovableSafety();
  const invalidateAllMovableSafetySteps = useInvalidateAllMovableSafetySteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneMovableSafety(movableSafetyId);
        await invalidateAllMovableSafetySteps(movableSafetyId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateOneMovableSafety,
      movableSafetyId,
      invalidateAllMovableSafetySteps,
    ],
  );
  const mutation = useMutation({
    mutationFn: () => startRealisation(movableSafetyId),
    mutationKey: getStartRealisationMutationKey(movableSafetyId),
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
/**
 * Hook to print a movable safety.
 * @param movableSafetyId - The id of the movable safety to print.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const usePrintMovableSafety = (movableSafetyId, options) => {
  const mutation = useMutation({
    mutationFn: () => printMovableSafety(movableSafetyId),
    mutationKey: getPrintMovableSafetyMutationKey(movableSafetyId),
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
