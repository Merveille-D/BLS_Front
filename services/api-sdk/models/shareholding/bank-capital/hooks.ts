import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { changeTmzFromLocalToUTC } from "@/lib/utils";
import { useInvalidateBankInfos } from "@/services/api-sdk/models/shareholding/bank-infos";
import {
  createBankCapital,
  deleteBankCapital,
  getAllBankCapitals,
  getOneBankCapital,
  updateBankCapital,
} from "./requests";
export const ALL_BANK_CAPITALS_QUERY_KEY = [
  "BANK_CAPITALS",
  "ALL_BANK_CAPITALS",
];
/**
 * Tag generator for the query to fetch one capital
 * @param capitalId
 * @returns The query tag.
 */
export const getOneBankCapitalQueryTag = (capitalId) => [
  "BANK_CAPITALS",
  "ONE_BANK_CAPITAL",
  capitalId,
];
/**
 * Tag for the mutation to create an capital.
 */
export const CREATE_BANK_CAPITAL_MUTATION_KEY = [
  "BANK_CAPITALS",
  "CREATE_BANK_CAPITAL",
];
/**
 * Tag generator for the mutation to update an capital.
 * @param capitalId - The id of the capital to update.
 * @returns The mutation key.
 */
export const getUpdateBankCapitalMutationKey = (capitalId) => [
  "BANK_CAPITALS",
  "UPDATE_BANK_CAPITAL",
  capitalId,
];
export const getDeleteBankCapitalMutationKey = (capitalId) => [
  "BANK_CAPITALS",
  "DELETE_BANK_CAPITAL",
  capitalId,
];
/**
 * Hook to invalidate all capitals query.
 * @returns A function to invalidate the all capitals query.
 */
export const useInvalidateAllBankCapitals = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ALL_BANK_CAPITALS_QUERY_KEY,
    });
};
/**
 * Hook to invalidate the one capital query.
 * @returns A function to invalidate the one capital query.
 */
export const useInvalidateOneBankCapital = () => {
  const queryClient = useQueryClient();
  return (capitalId) =>
    queryClient.invalidateQueries({
      queryKey: getOneBankCapitalQueryTag(capitalId),
    });
};
/**
 * Hook to remove the one capital query.
 * @returns A function to remove the one capital query.
 */
export const useRemoveOneBankCapitalQuery = () => {
  const queryClient = useQueryClient();
  return (capitalId) =>
    queryClient.removeQueries({
      queryKey: getOneBankCapitalQueryTag(capitalId),
    });
};
/**
 * Hook to fetch all capitals.
 * @returns The query result.
 */
export const useAllBankCapitals = () =>
  useQuery({
    queryKey: ALL_BANK_CAPITALS_QUERY_KEY,
    queryFn: () => getAllBankCapitals(),
  });
/**
 * Hook to fetch one capital.
 * @param capitalId - The id of the capital.
 * @returns The query result.
 */
export const useOneBankCapital = (capitalId) =>
  useQuery({
    queryKey: getOneBankCapitalQueryTag(capitalId),
    queryFn: () => getOneBankCapital(capitalId),
  });
/**
 * Hook to create an capital.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useCreateBankCapital = (options) => {
  const invalidateAllBankCapitals = useInvalidateAllBankCapitals();
  const invalidateBankInfos = useInvalidateBankInfos();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllBankCapitals();
        await invalidateBankInfos();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateAllBankCapitals, invalidateBankInfos],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      createBankCapital({
        ...args,
        date: changeTmzFromLocalToUTC(args.date),
      }),
    mutationKey: CREATE_BANK_CAPITAL_MUTATION_KEY,
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
 * Hook to update an capital.
 * @param capitalId - The id of the capital to update.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateBankCapital = (capitalId, options) => {
  const invalidateOneBankCapital = useInvalidateOneBankCapital();
  const invalidateAllBankCapitals = useInvalidateAllBankCapitals();
  const invalidateBankInfos = useInvalidateBankInfos();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateOneBankCapital(capitalId);
        await invalidateAllBankCapitals();
        await invalidateBankInfos();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      capitalId,
      invalidateAllBankCapitals,
      invalidateBankInfos,
      invalidateOneBankCapital,
    ],
  );
  const mutation = useMutation({
    mutationFn: (args) =>
      updateBankCapital(capitalId, {
        ...args,
        date: args.date && changeTmzFromLocalToUTC(args.date),
      }),
    mutationKey: getUpdateBankCapitalMutationKey(capitalId),
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
 * Hook to delete a capital.
 * @param capitalId - The id of the capital to delete.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useDeleteBankCapital = (capitalId, options) => {
  const removeOneBankCapital = useRemoveOneBankCapitalQuery();
  const invalidateAllBankCapitals = useInvalidateAllBankCapitals();
  const invalidateBankInfos = useInvalidateBankInfos();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        removeOneBankCapital(capitalId);
        await invalidateAllBankCapitals();
        await invalidateBankInfos();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [
      capitalId,
      invalidateAllBankCapitals,
      invalidateBankInfos,
      removeOneBankCapital,
    ],
  );
  const mutation = useMutation({
    mutationFn: () => deleteBankCapital(capitalId),
    mutationKey: getDeleteBankCapitalMutationKey(capitalId),
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
