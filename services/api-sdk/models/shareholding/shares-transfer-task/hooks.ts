import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { changeTmzFromLocalToUTC } from "@/lib/utils";
import { useInvalidateOneSharesTransfer } from "@/services/api-sdk/models/shareholding/shares-transfer";
import {
  completeSharesTransferTask,
  forwardSharesTransferTask,
  getAllSharesTransferTasks,
  getOneSharesTransferTask,
} from "./requests";
/**
 * Tag generator for the query to fetch all transfer tasks
 * @param transferId - The id of the transfer.
 * @returns The query tag.
 */
export const getAllSharesTransferTasksQueryTag = (transferId) =>
  ["SHARES_TRANSFER_TASKS", "ALL_SHARES_TRANSFER_TASKS", transferId].filter(
    Boolean,
  );
/**
 * Tag generator for the query to fetch one transfer task
 * @param taskId - The id of the transfer task.
 * @returns The query tag.
 */
export const getOneSharesTransferTaskQueryTag = (taskId) => [
  "SHARES_TRANSFER_TASKS",
  "ONE_SHARES_TRANSFER_TASK",
  taskId,
];
export const getCompleteSharesTransferTaskMutationKey = (taskId) => [
  "SHARES_TRANSFER_TASKS",
  "COMPLETE_SHARES_TRANSFER_TASK",
  taskId,
];
/**
 * Tag generator for the mutation to forward an transfer task.
 * @param taskId - The id of the transfer task to forward.
 * @returns The mutation key
 */
export const getForwardSharesTransferTaskMutationKey = (taskId) => [
  "SHARES_TRANSFER_TASKS",
  "FORWARD_SHARES_TRANSFER_TASK",
  taskId,
];
/**
 * Hook to invalidate all transfer tasks query.
 * @returns A function to invalidate the all transfer tasks query.
 */
export const useInvalidateAllSharesTransferTasks = () => {
  const queryClient = useQueryClient();
  return (transferId) =>
    queryClient.invalidateQueries({
      queryKey: getAllSharesTransferTasksQueryTag(transferId),
    });
};
/**
 * Hook to invalidate the one transfer task query.
 * @returns A function to invalidate the one transfer task query.
 */
export const useInvalidateOneSharesTransferTask = () => {
  const queryClient = useQueryClient();
  return (taskId) =>
    queryClient.invalidateQueries({
      queryKey: getOneSharesTransferTaskQueryTag(taskId),
    });
};
/**
 * Hook to fetch all transfer tasks.
 * @param transferId - The id of the transfer.
 * @returns The query result.
 */
export const useAllSharesTransferTasks = (transferId) =>
  useQuery({
    queryKey: getAllSharesTransferTasksQueryTag(transferId),
    queryFn: () => getAllSharesTransferTasks(transferId),
  });
/**
 * Hook to fetch one transfer task.
 * @param taskId - The id of the transfer task.
 * @returns The query result.
 */
export const useOneSharesTransferTask = (taskId) =>
  useQuery({
    queryKey: getOneSharesTransferTaskQueryTag(taskId),
    queryFn: () => getOneSharesTransferTask(taskId),
  });
/**
 * Hook to complete an transfer task.
 * @param taskId - The id of the transfer task.
 * @param options - The options for the mutation.
 * @returns The mutation object.
 */
export const useCompleteSharesTransferTask = (taskId, options) => {
  const invalidateOneSharesTransferTask = useInvalidateOneSharesTransferTask();
  const invalidateAllSharesTransferTasks =
    useInvalidateAllSharesTransferTasks();
  const invalidateOneAccountSharesTransfer = useInvalidateOneSharesTransfer();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneSharesTransferTask(taskId);
        await invalidateAllSharesTransferTasks();
        if (args[0]?.transferId) {
          await invalidateOneAccountSharesTransfer(args[0].transferId);
        }
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      invalidateAllSharesTransferTasks,
      invalidateOneAccountSharesTransfer,
      invalidateOneSharesTransferTask,
      taskId,
    ],
  );
  const mutation = useMutation({
    mutationFn: (args) => {
      const newArgs = Object.entries(args).reduce(
        (acc, [key, value]) => {
          if (value instanceof Date) {
            return {
              ...acc,
              [key]: changeTmzFromLocalToUTC(value),
            };
          }
          if (typeof value === "string") {
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
        },
        { type: args.type },
      );
      return completeSharesTransferTask(taskId, newArgs);
    },
    mutationKey: getCompleteSharesTransferTaskMutationKey(taskId),
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
 * Hook to forward a transfer task.
 * @param taskId - The id of the transfer task to forward.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useForwardSharesTransferTask = (taskId, options) => {
  const invalidateOneSharesTransferTask = useInvalidateOneSharesTransferTask();
  const invalidateAllSharesTransferTasks =
    useInvalidateAllSharesTransferTasks();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneSharesTransferTask(taskId);
        await invalidateAllSharesTransferTasks();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [taskId, invalidateAllSharesTransferTasks, invalidateOneSharesTransferTask],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      forwardSharesTransferTask(taskId, {
        ...args,
        dueDate: changeTmzFromLocalToUTC(args.dueDate),
      }),
    mutationKey: getForwardSharesTransferTaskMutationKey(taskId),
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
