import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { changeTmzFromLocalToUTC } from "@/lib/utils";
// eslint-disable-next-line import/no-cycle
import { useInvalidateOnePersonalSafety } from "@/services/api-sdk/models/personal-safety";
import { deletePersonalSafetyStep } from "@/services/api-sdk/models/personal-safety/personal-safety-step";
import {
  completePersonalSafetyStep,
  createPersonalSafetyStep,
  forwardPersonalSafetyStep,
  getAllPersonalSafetySteps,
  getOnePersonalSafetyStep,
  updatePersonalSafetyStep,
} from "./requests";
/**
 * Tag generator for the query to fetch all personal safety steps.
 * @param personalSafetyId - The id of the personal safety
 * @returns The query tag.
 */
export const getAllPersonalSafetyStepsQueryTag = (personalSafetyId) =>
  [
    "PERSONAL_SAFETY_STEPS",
    "ALL_PERSONAL_SAFETY_STEPS",
    personalSafetyId,
  ].filter(Boolean);
/**
 * Tag generator for the query to fetch one personal safety step.
 * @param stepId - The id of the personal safety step.
 * @returns The query tag.
 */
export const getOnePersonalSafetyStepQueryTag = (stepId) => [
  "PERSONAL_SAFETY_STEPS",
  "ONE_PERSONAL_SAFETY_STEP",
  stepId,
];
/**
 * Tag for the mutation to create a personal safety step.
 */
export const CREATE_PERSONAL_SAFETY_STEP_MUTATION_KEY = [
  "PERSONAL_SAFETY_STEPS",
  "CREATE_PERSONAL_SAFETY_STEP",
];
/**
 * Tag generator for the mutation to update a personal safety step.
 * @param stepId - The id of the personal safety step to update.
 * @returns The mutation key.
 */
export const getUpdatePersonalSafetyStepMutationKey = (stepId) => [
  "PERSONAL_SAFETY_STEPS",
  "UPDATE_PERSONAL_SAFETY_STEP",
  stepId,
];
export const getDeletePersonalSafetyStepMutationKey = (stepId) => [
  "PERSONAL_SAFETY_STEPS",
  "DELETE_PERSONAL_SAFETY_STEP",
  stepId,
];
/**
 * Tag generator for the mutation to forward a personal safety step.
 * @param stepId - The id of the personal safety step to forward.
 * @returns The mutation key
 */
export const getForwardPersonalSafetyStepMutationKey = (stepId) => [
  "PERSONAL_SAFETY_STEPS",
  "FORWARD_PERSONAL_SAFETY_STEP",
  stepId,
];
export const getCompletePersonalSafetyStepMutationKey = (stepId) => [
  "PERSONAL_SAFETY_STEPS",
  "COMPLETE_PERSONAL_SAFETY_STEP",
  stepId,
];
/**
 * Hook to invalidate all personal safety steps query.
 * @returns A function to invalidate the all personal safety steps query.
 */
export const useInvalidateAllPersonalSafetySteps = () => {
  const queryClient = useQueryClient();
  return (personalSafetyId) =>
    queryClient.invalidateQueries({
      queryKey: getAllPersonalSafetyStepsQueryTag(personalSafetyId),
    });
};
/**
 * Hook to invalidate the one personal safety step query.
 * @returns A function to invalidate the one personal safety step query.
 */
export const useInvalidateOnePersonalSafetyStep = () => {
  const queryClient = useQueryClient();
  return (stepId) =>
    queryClient.invalidateQueries({
      queryKey: getOnePersonalSafetyStepQueryTag(stepId),
    });
};
/**
 * Hook to remove the one personal safety step query.
 * @returns A function to remove the one personal safety step query.
 */
export const useRemoveOnePersonalSafetyStepQuery = () => {
  const queryClient = useQueryClient();
  return (stepId) =>
    queryClient.removeQueries({
      queryKey: getOnePersonalSafetyStepQueryTag(stepId),
    });
};
/**
 * Hook to fetch all personal safety steps.
 * @param personalSafetyId - The id of the personal safety.
 * @returns The query result.
 */
export const useAllPersonalSafetySteps = (personalSafetyId) =>
  useQuery({
    queryKey: getAllPersonalSafetyStepsQueryTag(personalSafetyId),
    queryFn: () => getAllPersonalSafetySteps(personalSafetyId),
  });
/**
 * Hook to fetch one personal safety step.
 * @param stepId - The id of the personal safety step.
 * @returns The query result.
 */
export const useOnePersonalSafetyStep = (stepId) =>
  useQuery({
    queryKey: getOnePersonalSafetyStepQueryTag(stepId),
    queryFn: () => getOnePersonalSafetyStep(stepId),
  });
/**
 * Hook to create a personal safety step.
 * @param personalSafetyId - The id of the personal safety.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreatePersonalSafetyStep = (personalSafetyId, options) => {
  const invalidateAllPersonalSafetySteps =
    useInvalidateAllPersonalSafetySteps();
  const invalidateOnePersonalSafety = useInvalidateOnePersonalSafety();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllPersonalSafetySteps();
        await invalidateOnePersonalSafety(personalSafetyId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateAllPersonalSafetySteps,
      invalidateOnePersonalSafety,
      personalSafetyId,
    ],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      createPersonalSafetyStep(personalSafetyId, {
        ...args,
        dueDate: changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: CREATE_PERSONAL_SAFETY_STEP_MUTATION_KEY,
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
 * Hook to update a personal safety step.
 * @param stepId - The id of the personal safety step to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdatePersonalSafetyStep = (stepId, options) => {
  const invalidateOnePersonalSafetyStep = useInvalidateOnePersonalSafetyStep();
  const invalidateAllPersonalSafetySteps =
    useInvalidateAllPersonalSafetySteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOnePersonalSafetyStep(stepId);
        await invalidateAllPersonalSafetySteps();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [stepId, invalidateAllPersonalSafetySteps, invalidateOnePersonalSafetyStep],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      updatePersonalSafetyStep(stepId, {
        ...args,
        dueDate: args.dueDate && changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: getUpdatePersonalSafetyStepMutationKey(stepId),
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
 * Hook to complete a personal safety step.
 * @param stepId - The id of the personal safety step.
 * @param options - The options for the mutation.
 * @returns The mutation object.
 */
export const useCompletePersonalSafetyStep = (stepId, options) => {
  const invalidateAllPersonalSafetySteps =
    useInvalidateAllPersonalSafetySteps();
  const invalidateOnePersonalSafetyStep = useInvalidateOnePersonalSafetyStep();
  const invalidateOnePersonalSafety = useInvalidateOnePersonalSafety();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllPersonalSafetySteps();
        if (args[0]) {
          await invalidateOnePersonalSafetyStep(stepId);
          await invalidateOnePersonalSafety(args[0].personalSafetyId);
        }
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateAllPersonalSafetySteps,
      invalidateOnePersonalSafety,
      invalidateOnePersonalSafetyStep,
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
      return completePersonalSafetyStep(stepId, newArgs);
    },
    mutationKey: getCompletePersonalSafetyStepMutationKey(stepId),
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
 * Hook to forward a personal safety step.
 * @param stepId - The id of the personal safety step to forward.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useForwardPersonalSafetyStep = (stepId, options) => {
  const invalidateOnePersonalSafetyStep = useInvalidateOnePersonalSafetyStep();
  const invalidateAllPersonalSafetySteps =
    useInvalidateAllPersonalSafetySteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOnePersonalSafetyStep(stepId);
        await invalidateAllPersonalSafetySteps();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [stepId, invalidateAllPersonalSafetySteps, invalidateOnePersonalSafetyStep],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      forwardPersonalSafetyStep(stepId, {
        ...args,
        dueDate: changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: getForwardPersonalSafetyStepMutationKey(stepId),
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
 * Hook to delete a personal safety step.
 * @param stepId - The id of the personal safety step to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeletePersonalSafetyStep = (stepId, options) => {
  const removeOnePersonalSafetyStep = useRemoveOnePersonalSafetyStepQuery();
  const invalidateAllPersonalSafetySteps =
    useInvalidateAllPersonalSafetySteps();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOnePersonalSafetyStep(stepId);
        await invalidateAllPersonalSafetySteps();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [stepId, invalidateAllPersonalSafetySteps, removeOnePersonalSafetyStep],
  );
  const mutation = useMutation({
    mutationFn: () => deletePersonalSafetyStep(stepId),
    mutationKey: getDeletePersonalSafetyStepMutationKey(stepId),
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
