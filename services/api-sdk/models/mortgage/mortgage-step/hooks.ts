import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { changeTmzFromLocalToUTC } from "@/lib/utils";
// eslint-disable-next-line import/no-cycle
import {
  createMortgageStep,
  forwardMortgageStep,
  updateMortgageStep,
  useInvalidateOneMortgage,
} from "@/services/api-sdk/models/mortgage";
import { deleteMortgageStep } from "@/services/api-sdk/models/mortgage/mortgage-step";
import {
  completeMortgageStep,
  getAllMortgageSteps,
  getOneMortgageStep,
} from "./requests";
/**
 * Tag generator for the query to fetch all mortgage tasks
 * @param mortgageId - The id of the mortgage.
 * @returns The query tag.
 */
export const getAllMortgageStepsQueryTag = (mortgageId) =>
  ["MORTGAGE_STEPS", "ALL_MORTGAGE_STEPS", mortgageId].filter(Boolean);
/**
 * Tag generator for the query to fetch one mortgage task
 * @param stepId - The id of the mortgage task.
 * @returns The query tag.
 */
export const getOneMortgageStepQueryTag = (stepId) => [
  "MORTGAGE_STEPS",
  "ONE_MORTGAGE_STEP",
  stepId,
];
/**
 * Tag for the mutation to create a mortgage step.
 */
export const CREATE_MORTGAGE_STEP_MUTATION_KEY = [
  "MORTGAGE_STEPS",
  "CREATE_MORTGAGE_STEP",
];
/**
 * Tag generator for the mutation to update a mortgage step.
 * @param stepId - The id of the mortgage step to update.
 * @returns The mutation key.
 */
export const getUpdateMortgageStepMutationKey = (stepId) => [
  "MORTGAGE_STEPS",
  "UPDATE_MORTGAGE_STEP",
  stepId,
];
export const getDeleteMortgageStepMutationKey = (stepId) => [
  "MORTGAGE_STEPS",
  "DELETE_MORTGAGE_STEP",
  stepId,
];
/**
 * Tag generator for the mutation to forward a mortgage step.
 * @param stepId - The id of the mortgage step to forward.
 * @returns The mutation key
 */
export const getForwardMortgageStepMutationKey = (stepId) => [
  "MORTGAGE_STEPS",
  "FORWARD_MORTGAGE_STEP",
  stepId,
];
export const getCompleteMortgageStepMutationKey = (stepId) => [
  "MORTGAGE_STEPS",
  "COMPLETE_MORTGAGE_STEP",
  stepId,
];
/**
 * Hook to invalidate all mortgage tasks query.
 * @returns A function to invalidate the all mortgage tasks query.
 */
export const useInvalidateAllMortgageSteps = () => {
  const queryClient = useQueryClient();
  return (mortgageId) =>
    queryClient.invalidateQueries({
      queryKey: getAllMortgageStepsQueryTag(mortgageId),
    });
};
/**
 * Hook to invalidate the one mortgage step query.
 * @returns A function to invalidate the one mortgage step query.
 */
export const useInvalidateOneMortgageStep = () => {
  const queryClient = useQueryClient();
  return (stepId) =>
    queryClient.invalidateQueries({
      queryKey: getOneMortgageStepQueryTag(stepId),
    });
};
/**
 * Hook to remove the one mortgage step query.
 * @returns A function to remove the one mortgage step query.
 */
export const useRemoveOneMortgageStepQuery = () => {
  const queryClient = useQueryClient();
  return (stepId) =>
    queryClient.removeQueries({
      queryKey: getOneMortgageStepQueryTag(stepId),
    });
};
/**
 * Hook to fetch all mortgage tasks.
 * @param mortgageId - The id of the mortgage.
 * @returns The query result.
 */
export const useAllMortgageSteps = (mortgageId) =>
  useQuery({
    queryKey: getAllMortgageStepsQueryTag(mortgageId),
    queryFn: () => getAllMortgageSteps(mortgageId),
  });
/**
 * Hook to fetch one mortgage task.
 * @param stepId - The id of the mortgage task.
 * @returns The query result.
 */
export const useOneMortgageStep = (stepId) =>
  useQuery({
    queryKey: getOneMortgageStepQueryTag(stepId),
    queryFn: () => getOneMortgageStep(stepId),
  });
/**
 * Hook to create a mortgage step.
 * @param mortgageId - The id of the mortgage.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateMortgageStep = (mortgageId, options) => {
  const invalidateAllMortgageSteps = useInvalidateAllMortgageSteps();
  const invalidateOneMortgage = useInvalidateOneMortgage();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllMortgageSteps();
        await invalidateOneMortgage(mortgageId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllMortgageSteps, invalidateOneMortgage, mortgageId],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      createMortgageStep(mortgageId, {
        ...args,
        dueDate: changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: CREATE_MORTGAGE_STEP_MUTATION_KEY,
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
 * Hook to update a mortgage step.
 * @param stepId - The id of the mortgage step to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateMortgageStep = (stepId, options) => {
  const invalidateOneMortgageStep = useInvalidateOneMortgageStep();
  const invalidateAllMortgageSteps = useInvalidateAllMortgageSteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneMortgageStep(stepId);
        await invalidateAllMortgageSteps();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [stepId, invalidateAllMortgageSteps, invalidateOneMortgageStep],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      updateMortgageStep(stepId, {
        ...args,
        dueDate: args.dueDate && changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: getUpdateMortgageStepMutationKey(stepId),
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
 * Hook to complete a mortgage task.
 * @param stepId - The id of the mortgage step.
 * @param options - The options for the mutation.
 * @returns The mutation object.
 */
export const useCompleteMortgageStep = (stepId, options) => {
  const invalidateAllMortgageSteps = useInvalidateAllMortgageSteps();
  const invalidateOneMortgageStep = useInvalidateOneMortgageStep();
  const invalidateOneMortgage = useInvalidateOneMortgage();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllMortgageSteps();
        if (args[0]) {
          await invalidateOneMortgageStep(stepId);
          await invalidateOneMortgage(args[0].mortgageId);
        }
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateAllMortgageSteps,
      invalidateOneMortgage,
      invalidateOneMortgageStep,
      stepId,
    ],
  );
  const mutation = useMutation({
    mutationFn: (args) => {
      const newArgs = args
        ? Object.entries(args).reduce((acc, [key, value]) => {
            if (value instanceof Date) {
              return {
                ...acc,
                [key]: changeTmzFromLocalToUTC(value),
              };
            }
            if (typeof value === "string" || typeof value === "number") {
              return {
                ...acc,
                [key]: value,
              };
            }
            const formData = new FormData();
            Array.from(value).forEach((file) => {
              formData.append(`${key}[files]`, file.file);
              formData.append(`${key}[names]`, file.name);
            });
            return {
              ...acc,
              [key]: formData,
            };
          }, {})
        : undefined;
      return completeMortgageStep(stepId, newArgs);
    },
    mutationKey: getCompleteMortgageStepMutationKey(stepId),
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
 * Hook to forward a mortgage step.
 * @param stepId - The id of the mortgage step to forward.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useForwardMortgageStep = (stepId, options) => {
  const invalidateOneMortgageStep = useInvalidateOneMortgageStep();
  const invalidateAllMortgageSteps = useInvalidateAllMortgageSteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneMortgageStep(stepId);
        await invalidateAllMortgageSteps();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [stepId, invalidateAllMortgageSteps, invalidateOneMortgageStep],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      forwardMortgageStep(stepId, {
        ...args,
        dueDate: changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: getForwardMortgageStepMutationKey(stepId),
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
 * Hook to delete a mortgage step.
 * @param stepId - The id of the mortgage step to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeleteMortgageStep = (stepId, options) => {
  const removeOneMortgageStep = useRemoveOneMortgageStepQuery();
  const invalidateAllMortgageSteps = useInvalidateAllMortgageSteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOneMortgageStep(stepId);
        await invalidateAllMortgageSteps();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [stepId, invalidateAllMortgageSteps, removeOneMortgageStep],
  );
  const mutation = useMutation({
    mutationFn: () => deleteMortgageStep(stepId),
    mutationKey: getDeleteMortgageStepMutationKey(stepId),
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
