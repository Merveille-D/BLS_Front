import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
// eslint-disable-next-line import/no-cycle
import {
  printPersonalSafety,
  useInvalidateAllPersonalSafetySteps,
} from "@/services/api-sdk/models/personal-safety";
import {
  createPersonalSafety,
  getAllPersonalSafeties,
  getOnePersonalSafety,
  startRealisation,
} from "./requests";
/**
 * Tag for the query to fetch all personal safeties.
 */
export const ALL_PERSONAL_SAFETIES_QUERY_TAG = [
  "PERSONAL_SAFETIES",
  "ALL_PERSONAL_SAFETIES",
];
/**
 * Tag generator for the query to fetch one personal safety
 * @param personalSafetyId - The id of the personal safety.
 * @returns The query tag.
 */
export const getOnePersonalSafetyQueryTag = (personalSafetyId) => [
  "PERSONAL_SAFETIES",
  "ONE_PERSONAL_SAFETY",
  personalSafetyId,
];
/**
 * Tag generator for the mutation to print a personal safety.
 * @param personalSafetyId - The id of the personal safety.
 * @returns The mutation tag.
 */
export const getPrintPersonalSafetyMutationKey = (personalSafetyId) => [
  "PERSONAL_SAFETY",
  "PRINT_PERSONAL_SAFETY",
  personalSafetyId,
];
/**
 * Tag generator for the mutation to start realisation.
 * @param personalSafetyId - The id of the personal safety.
 * @returns The mutation tag.
 */
export const getStartRealisationMutationKey = (personalSafetyId) => [
  "PERSONAL_SAFETIES",
  "START_REALISATION",
  personalSafetyId,
];
/**
 * Tag for the mutation to create a personal safety.
 */
export const CREATE_PERSONAL_SAFETY_MUTATION_KEY = [
  "PERSONAL_SAFETIES",
  "CREATE_PERSONAL_SAFETY",
];
/**
 * Hook to invalidate all personal safeties query.
 * @returns A function to invalidate the all personal safeties query.
 */
export const useInvalidateAllPersonalSafeties = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_PERSONAL_SAFETIES_QUERY_TAG,
    });
};
/**
 * Hook to invalidate the one personal safety query.
 * @returns A function to invalidate the one personal safety query.
 */
export const useInvalidateOnePersonalSafety = () => {
  const queryClient = useQueryClient();
  return (personalSafetyId) =>
    queryClient.invalidateQueries({
      queryKey: getOnePersonalSafetyQueryTag(personalSafetyId),
    });
};
/**
 * Hook to remove the one personal safety query.
 * @returns A function to remove the one personal safety query.
 */
export const useRemoveOnePersonalSafetyQuery = () => {
  const queryClient = useQueryClient();
  return (personalSafetyId) =>
    queryClient.removeQueries({
      queryKey: getOnePersonalSafetyQueryTag(personalSafetyId),
    });
};
/**
 * Hook to fetch all personal safeties.
 * @param queries - The queries to filter the personal safeties.
 * @returns The query result.
 */
export const useAllPersonalSafeties = (queries) =>
  useQuery({
    queryKey: ALL_PERSONAL_SAFETIES_QUERY_TAG,
    queryFn: () => getAllPersonalSafeties(queries),
  });
/**
 * Hook to fetch one personal safety.
 * @param personalSafetyId - The id of the personal safety.
 * @returns The query result.
 */
export const useOnePersonalSafety = (personalSafetyId) =>
  useQuery({
    queryKey: getOnePersonalSafetyQueryTag(personalSafetyId),
    queryFn: () => getOnePersonalSafety(personalSafetyId),
  });
/**
 * Hook to create a personal safety.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreatePersonalSafety = (options) => {
  const invalidateAllPersonalSafeties = useInvalidateAllPersonalSafeties();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllPersonalSafeties();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllPersonalSafeties],
  );
  const mutation = useMutation({
    mutationFn: (args) => createPersonalSafety(args),
    mutationKey: CREATE_PERSONAL_SAFETY_MUTATION_KEY,
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
 * @param personalSafetyId - The id of the personal safety.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useStartRealisation = (personalSafetyId, options) => {
  const invalidateOnePersonalSafety = useInvalidateOnePersonalSafety();
  const invalidateAllPersonalSafetySteps =
    useInvalidateAllPersonalSafetySteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOnePersonalSafety(personalSafetyId);
        await invalidateAllPersonalSafetySteps(personalSafetyId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateOnePersonalSafety,
      personalSafetyId,
      invalidateAllPersonalSafetySteps,
    ],
  );
  const mutation = useMutation({
    mutationFn: () => startRealisation(personalSafetyId),
    mutationKey: getStartRealisationMutationKey(personalSafetyId),
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
 * Hook to print a personal safety.
 * @param personalSafetyId - The id of the personal safety to print.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const usePrintPersonalSafety = (personalSafetyId, options) => {
  const mutation = useMutation({
    mutationFn: () => printPersonalSafety(personalSafetyId),
    mutationKey: getPrintPersonalSafetyMutationKey(personalSafetyId),
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
