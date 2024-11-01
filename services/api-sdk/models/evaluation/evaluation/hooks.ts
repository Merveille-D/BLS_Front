import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { changeTmzFromLocalToUTC } from "@/lib/utils";
import {
  completeEvaluation,
  createEvaluation,
  forwardEvaluation,
  getAllEvaluations,
  getOneEvaluation,
  printEvaluation,
  updateEvaluation,
} from "./requests";
/**
 * Tag for the query to fetch all evaluations
 */
export const ALL_EVALUATIONS_QUERY_TAG = ["EVALUATION", "ALL_EVALUATIONS"];
/**
 * Tag generator for the query to fetch one evaluation.
 * @param evaluationId - The id of the evaluation.
 * @returns The query tag.
 */
export const getOneEvaluationQueryTag = (evaluationId) => [
  "EVALUATION",
  "ONE_EVALUATION",
  evaluationId,
];
/**
 * Tag for the create evaluation mutation.
 */
export const CREATE_EVALUATION_MUTATION_KEY = [
  "EVALUATION",
  "CREATE_EVALUATION",
];
/**
 * Tag generator for the query to update an evaluation.
 * @param evaluationId - The id of the evaluation.
 * @returns The mutation key.
 */
export const getUpdateEvaluationMutationKey = (evaluationId) => [
  "EVALUATION",
  "UPDATE_EVALUATION",
  evaluationId,
];
/**
 * Tag generator for the query to forward an evaluation.
 * @param evaluationId - The id of the evaluation.
 * @returns The mutation key.
 */
export const getForwardEvaluationMutationKey = (evaluationId) => [
  "EVALUATION",
  "FORWARD_EVALUATION",
  evaluationId,
];
/**
 * Tag generator for the query to complete an evaluation.
 * @param evaluationId - The id of the evaluation.
 * @returns The mutation key.
 */
export const getCompleteEvaluationMutationKey = (evaluationId) => [
  "EVALUATION",
  "COMPLETE_EVALUATION",
  evaluationId,
];
/**
 * Tag generator for the mutation to print an evaluation.
 * @param evaluationId - The id of the evaluation.
 * @returns The mutation tag.
 */
export const getPrintEvaluationMutationKey = (evaluationId) => [
  "EVALUATION",
  "PRINT_EVALUATION",
  evaluationId,
];
/**
 * Hook to invalidate all evaluations query.
 * @returns A function to invalidate all evaluations query.
 */
export const useInvalidateAllEvaluations = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_EVALUATIONS_QUERY_TAG,
    });
};
/**
 * Hook to invalidate one evaluation query.
 * @returns A function to invalidate one evaluation query.
 */
export const useInvalidateOneEvaluation = () => {
  const queryClient = useQueryClient();
  return (evaluationId) =>
    queryClient.invalidateQueries({
      queryKey: getOneEvaluationQueryTag(evaluationId),
    });
};
/**
 * Hook to fetch all evaluations.
 * @returns The query result.
 */
export const useAllEvaluations = () =>
  useQuery({
    queryKey: ALL_EVALUATIONS_QUERY_TAG,
    queryFn: () => getAllEvaluations(),
  });
/**
 * Hook to fetch one evaluation.
 * @param evaluationId - The id of the evaluation.
 * @returns The query result.
 */
export const useOneEvaluation = (evaluationId) =>
  useQuery({
    queryKey: getOneEvaluationQueryTag(evaluationId),
    queryFn: () => getOneEvaluation(evaluationId),
  });
/**
 * Hook to create a new evaluation.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateEvaluation = (options) => {
  const invalidateAllEvaluations = useInvalidateAllEvaluations();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllEvaluations();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllEvaluations],
  );
  const mutation = useMutation({
    mutationFn: (args) => createEvaluation(args),
    mutationKey: CREATE_EVALUATION_MUTATION_KEY,
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
 * Hook to update an evaluation.
 * @param evaluationId - The id of the evaluation.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateEvaluation = (evaluationId, options) => {
  const invalidateAllEvaluations = useInvalidateAllEvaluations();
  const invalidateOneEvaluation = useInvalidateOneEvaluation();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllEvaluations();
        if (args[0]) await invalidateOneEvaluation(args[0]?.id);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllEvaluations, invalidateOneEvaluation],
  );
  const mutation = useMutation({
    mutationFn: (args) => updateEvaluation(evaluationId, args),
    mutationKey: getUpdateEvaluationMutationKey(evaluationId),
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
 * Hook to forward an evaluation.
 * @param evaluationId - The id of the evaluation to forward.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useForwardEvaluation = (evaluationId, options) => {
  const invalidateOneEvaluation = useInvalidateOneEvaluation();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneEvaluation(evaluationId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [evaluationId, invalidateOneEvaluation],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      forwardEvaluation(evaluationId, {
        ...args,
        dueDate: changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: getForwardEvaluationMutationKey(evaluationId),
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
 * Hook to complete an evaluation.
 * @param evaluationId - The id of the evaluation.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCompleteEvaluation = (evaluationId, options) => {
  const invalidateOneEvaluation = useInvalidateOneEvaluation();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneEvaluation(evaluationId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [evaluationId, invalidateOneEvaluation],
  );
  const mutation = useMutation({
    mutationFn: (args) => completeEvaluation(evaluationId, args),
    mutationKey: getCompleteEvaluationMutationKey(evaluationId),
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
 * Hook to print an evaluation.
 * @param evaluationId - The id of the evaluation to print.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const usePrintEvaluation = (evaluationId, options) => {
  const mutation = useMutation({
    mutationFn: () => printEvaluation(evaluationId),
    mutationKey: getPrintEvaluationMutationKey(evaluationId),
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
