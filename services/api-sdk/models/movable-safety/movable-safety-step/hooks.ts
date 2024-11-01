import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { changeTmzFromLocalToUTC } from "@/lib/utils";
// eslint-disable-next-line import/no-cycle
import { useInvalidateOneMovableSafety } from "@/services/api-sdk/models/movable-safety";
import { deleteMovableSafetyStep } from "@/services/api-sdk/models/movable-safety/movable-safety-step";
import {
  completeMovableSafetyStep,
  createMovableSafetyStep,
  forwardMovableSafetyStep,
  getAllMovableSafetySteps,
  getOneMovableSafetyStep,
  updateMovableSafetyStep,
} from "./requests";
/**
 * Tag generator for the query to fetch all movable safety steps.
 * @param movableSafetyId - The id of the movable safety
 * @returns The query tag.
 */
export const getAllMovableSafetyStepsQueryTag = (movableSafetyId) =>
  ["MOVABLE_SAFETY_STEPS", "ALL_MOVABLE_SAFETY_STEPS", movableSafetyId].filter(
    Boolean,
  );
/**
 * Tag generator for the query to fetch one movable safety step.
 * @param stepId - The id of the movable safety step.
 * @returns The query tag.
 */
export const getOneMovableSafetyStepQueryTag = (stepId) => [
  "MOVABLE_SAFETY_STEPS",
  "ONE_MOVABLE_SAFETY_STEP",
  stepId,
];
/**
 * Tag for the mutation to create a movable safety step.
 */
export const CREATE_MOVABLE_SAFETY_STEP_MUTATION_KEY = [
  "MOVABLE_SAFETY_STEPS",
  "CREATE_MOVABLE_SAFETY_STEP",
];
/**
 * Tag generator for the mutation to update a movable safety step.
 * @param stepId - The id of the movable safety step to update.
 * @returns The mutation key.
 */
export const getUpdateMovableSafetyStepMutationKey = (stepId) => [
  "MOVABLE_SAFETY_STEPS",
  "UPDATE_MOVABLE_SAFETY_STEP",
  stepId,
];
export const getDeleteMovableSafetyStepMutationKey = (stepId) => [
  "MOVABLE_SAFETY_STEPS",
  "DELETE_MOVABLE_SAFETY_STEP",
  stepId,
];
/**
 * Tag generator for the mutation to forward a movable safety step.
 * @param stepId - The id of the movable safety step to forward.
 * @returns The mutation key
 */
export const getForwardMovableSafetyStepMutationKey = (stepId) => [
  "MOVABLE_SAFETY_STEPS",
  "FORWARD_MOVABLE_SAFETY_STEP",
  stepId,
];
export const getCompleteMovableSafetyStepMutationKey = (stepId) => [
  "MOVABLE_SAFETY_STEPS",
  "COMPLETE_MOVABLE_SAFETY_STEP",
  stepId,
];
/**
 * Hook to invalidate all movable safety steps query.
 * @returns A function to invalidate the all movable safety steps query.
 */
export const useInvalidateAllMovableSafetySteps = () => {
  const queryClient = useQueryClient();
  return (movableSafetyId) =>
    queryClient.invalidateQueries({
      queryKey: getAllMovableSafetyStepsQueryTag(movableSafetyId),
    });
};
/**
 * Hook to invalidate the one movable safety step query.
 * @returns A function to invalidate the one movable safety step query.
 */
export const useInvalidateOneMovableSafetyStep = () => {
  const queryClient = useQueryClient();
  return (stepId) =>
    queryClient.invalidateQueries({
      queryKey: getOneMovableSafetyStepQueryTag(stepId),
    });
};
/**
 * Hook to remove the one movable safety step query.
 * @returns A function to remove the one movable safety step query.
 */
export const useRemoveOneMovableSafetyStepQuery = () => {
  const queryClient = useQueryClient();
  return (stepId) =>
    queryClient.removeQueries({
      queryKey: getOneMovableSafetyStepQueryTag(stepId),
    });
};
/**
 * Hook to fetch all movable safety steps.
 * @param movableSafetyId - The id of the movable safety.
 * @returns The query result.
 */
export const useAllMovableSafetySteps = (movableSafetyId) =>
  useQuery({
    queryKey: getAllMovableSafetyStepsQueryTag(movableSafetyId),
    queryFn: () => getAllMovableSafetySteps(movableSafetyId),
  });
/**
 * Hook to fetch one movable safety step.
 * @param stepId - The id of the movable safety step.
 * @returns The query result.
 */
export const useOneMovableSafetyStep = (stepId) =>
  useQuery({
    queryKey: getOneMovableSafetyStepQueryTag(stepId),
    queryFn: () => getOneMovableSafetyStep(stepId),
  });
/**
 * Hook to create a movable safety step.
 * @param movableSafetyId - The id of the movable safety.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateMovableSafetyStep = (movableSafetyId, options) => {
  const invalidateAllMovableSafetySteps = useInvalidateAllMovableSafetySteps();
  const invalidateOneMovableSafety = useInvalidateOneMovableSafety();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllMovableSafetySteps();
        await invalidateOneMovableSafety(movableSafetyId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateAllMovableSafetySteps,
      invalidateOneMovableSafety,
      movableSafetyId,
    ],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      createMovableSafetyStep(movableSafetyId, {
        ...args,
        dueDate: changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: CREATE_MOVABLE_SAFETY_STEP_MUTATION_KEY,
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
 * Hook to update a movable safety step.
 * @param stepId - The id of the movable safety step to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateMovableSafetyStep = (stepId, options) => {
  const invalidateOneMovableSafetyStep = useInvalidateOneMovableSafetyStep();
  const invalidateAllMovableSafetySteps = useInvalidateAllMovableSafetySteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneMovableSafetyStep(stepId);
        await invalidateAllMovableSafetySteps();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [stepId, invalidateAllMovableSafetySteps, invalidateOneMovableSafetyStep],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      updateMovableSafetyStep(stepId, {
        ...args,
        dueDate: args.dueDate && changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: getUpdateMovableSafetyStepMutationKey(stepId),
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
 * Hook to complete a movable safety step.
 * @param stepId - The id of the movable safety step.
 * @param options - The options for the mutation.
 * @returns The mutation object.
 */
export const useCompleteMovableSafetyStep = (stepId, options) => {
  const invalidateAllMovableSafetySteps = useInvalidateAllMovableSafetySteps();
  const invalidateOneMovableSafetyStep = useInvalidateOneMovableSafetyStep();
  const invalidateOneMovableSafety = useInvalidateOneMovableSafety();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllMovableSafetySteps();
        if (args[0]) {
          await invalidateOneMovableSafetyStep(stepId);
          await invalidateOneMovableSafety(args[0].movableSafetyId);
        }
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateAllMovableSafetySteps,
      invalidateOneMovableSafety,
      invalidateOneMovableSafetyStep,
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
      return completeMovableSafetyStep(stepId, newArgs);
    },
    mutationKey: getCompleteMovableSafetyStepMutationKey(stepId),
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
 * Hook to forward a movable safety step.
 * @param stepId - The id of the movable safety step to forward.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useForwardMovableSafetyStep = (stepId, options) => {
  const invalidateOneMovableSafetyStep = useInvalidateOneMovableSafetyStep();
  const invalidateAllMovableSafetySteps = useInvalidateAllMovableSafetySteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneMovableSafetyStep(stepId);
        await invalidateAllMovableSafetySteps();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [stepId, invalidateAllMovableSafetySteps, invalidateOneMovableSafetyStep],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      forwardMovableSafetyStep(stepId, {
        ...args,
        dueDate: changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: getForwardMovableSafetyStepMutationKey(stepId),
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
 * Hook to delete a movable safety step.
 * @param stepId - The id of the movable safety step to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeleteMovableSafetyStep = (stepId, options) => {
  const removeOneMovableSafetyStep = useRemoveOneMovableSafetyStepQuery();
  const invalidateAllMovableSafetySteps = useInvalidateAllMovableSafetySteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOneMovableSafetyStep(stepId);
        await invalidateAllMovableSafetySteps();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [stepId, invalidateAllMovableSafetySteps, removeOneMovableSafetyStep],
  );
  const mutation = useMutation({
    mutationFn: () => deleteMovableSafetyStep(stepId),
    mutationKey: getDeleteMovableSafetyStepMutationKey(stepId),
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
