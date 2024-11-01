import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  createEvaluationCriteria,
  deleteEvaluationCriteria,
  getAllEvaluationCriteria,
  getOneEvaluationCriteria,
  updateEvaluationCriteria,
} from "./requests";
/**
 * Tag generator for the query to fetch all contract events.
 * @param profile - The profile of the user.
 * @returns The query tag.
 */
export const getAllEvaluationCriteriaQueryTag = (profile) =>
  ["EVALUATION_CRITERIA", "ALL_EVALUATION_CRITERIA", profile].filter(Boolean);
/**
 * Tag generator for the query to fetch one contract event.
 * @param criteriaId - The id of the contract event.
 * @returns The query tag.
 */
export const getOneEvaluationCriteriaQueryTag = (criteriaId) => [
  "EVALUATION_CRITERIA",
  "ONE_EVALUATION_CRITERIA",
  criteriaId,
];
/**
 * Tag for the create evaluation criteria mutation.
 */
export const CREATE_EVALUATION_CRITERIA_MUTATION_KEY = [
  "EVALUATION_CRITERIA",
  "CREATE_EVALUATION_CRITERIA",
];
/**
 * Tag generator for the mutation to update an evaluation criteria.
 * @param criteriaId - The id of the evaluation criteria.
 * @returns The mutation key.
 */
export const getUpdateEvaluationCriteriaMutationKey = (criteriaId) => [
  "EVALUATION_CRITERIA",
  "UPDATE_EVALUATION_CRITERIA",
  criteriaId,
];
/**
 * Tag generator for the mutation to delete an evaluation criteria.
 * @param criteriaId - The id of the evaluation criteria.
 * @returns The mutation key.
 */
export const getDeleteEvaluationCriteriaMutationKey = (criteriaId) => [
  "EVALUATION_CRITERIA",
  "DELETE_EVALUATION_CRITERIA",
  criteriaId,
];
/**
 * Hook to invalidate all evaluation criteria query.
 * @returns A function to invalidate all evaluation criteria query.
 */
export const useInvalidateAllEvaluationCriteria = () => {
  const queryClient = useQueryClient();
  return (profile) =>
    queryClient.invalidateQueries({
      queryKey: getAllEvaluationCriteriaQueryTag(profile),
    });
};
/**
 * Hook to invalidate one evaluation criteria query.
 * @returns A function to invalidate one evaluation criteria query.
 */
export const useInvalidateOneEvaluationCriteria = () => {
  const queryClient = useQueryClient();
  return (criteriaId) =>
    queryClient.invalidateQueries({
      queryKey: getOneEvaluationCriteriaQueryTag(criteriaId),
    });
};
/**
 * Hook to remove one evaluation criteria query.
 * @returns A function to remove one evaluation criteria query.
 */
export const useRemoveOneEvaluationCriteriaQuery = () => {
  const queryClient = useQueryClient();
  return (criteriaId) =>
    queryClient.removeQueries({
      queryKey: getOneEvaluationCriteriaQueryTag(criteriaId),
    });
};
/**
 * Hook to fetch all evaluation criteria.
 * @param filters - The filters to apply to the query.
 * @returns The query result.
 */
export const useAllEvaluationCriteria = (filters) =>
  useQuery({
    queryKey: getAllEvaluationCriteriaQueryTag(
      filters?.profileId ?? filters?.collaboratorId,
    ),
    queryFn: () =>
      filters?.profileId || filters?.collaboratorId
        ? getAllEvaluationCriteria(filters)
        : [],
  });
/**
 * Hook to fetch one evaluation criteria.
 * @param criteriaId - The id of the evaluation criteria.
 * @returns The query result.
 */
export const useOneEvaluationCriteria = (criteriaId) =>
  useQuery({
    queryKey: getOneEvaluationCriteriaQueryTag(criteriaId),
    queryFn: () => getOneEvaluationCriteria(criteriaId),
  });
/**
 * Hook to create a new evaluation criteria.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateEvaluationCriteria = (options) => {
  const invalidateAllEvaluationCriteria = useInvalidateAllEvaluationCriteria();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllEvaluationCriteria(args[0]?.profile.id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllEvaluationCriteria],
  );
  const mutation = useMutation({
    mutationFn: (args) => createEvaluationCriteria(args),
    mutationKey: CREATE_EVALUATION_CRITERIA_MUTATION_KEY,
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
 * Hook to update an evaluation criteria.
 * @param criteriaId - The id of the evaluation criteria to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateEvaluationCriteria = (criteriaId, options) => {
  const invalidateOneEvaluationCriteria = useInvalidateOneEvaluationCriteria();
  const invalidateAllEvaluationCriteria = useInvalidateAllEvaluationCriteria();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneEvaluationCriteria(criteriaId);
        await invalidateAllEvaluationCriteria(args[0]?.profile.id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      criteriaId,
      invalidateAllEvaluationCriteria,
      invalidateOneEvaluationCriteria,
    ],
  );
  const mutation = useMutation({
    mutationFn: (args) => updateEvaluationCriteria(criteriaId, args),
    mutationKey: getUpdateEvaluationCriteriaMutationKey(criteriaId),
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
 * Hook to delete an evaluation criteria.
 * @param criteriaId - The id of the evaluation criteria to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeleteEvaluationCriteria = (criteriaId, options) => {
  const removeOneEvaluationCriteria = useRemoveOneEvaluationCriteriaQuery();
  const invalidateAllEvaluationCriteria = useInvalidateAllEvaluationCriteria();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOneEvaluationCriteria(criteriaId);
        await invalidateAllEvaluationCriteria();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [criteriaId, invalidateAllEvaluationCriteria, removeOneEvaluationCriteria],
  );
  const mutation = useMutation({
    mutationFn: () => deleteEvaluationCriteria(criteriaId),
    mutationKey: getDeleteEvaluationCriteriaMutationKey(criteriaId),
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
