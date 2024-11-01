import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { getBankInfos, updateBankInfos } from "./requests";
export const BANK_INFOS_QUERY_KEY = ["SHAREHOLDERS", "BANK_INFOS"];
/**
 * Tag for the mutation to update bank infos
 */
export const UPDATE_BANK_INFOS_MUTATION_KEY = [
  "SHAREHOLDERS",
  "UPDATE_BANK_INFOS",
];
/**
 * Hook to invalidate bank infos query.
 * @returns A function to invalidate the bank infos query.
 */
export const useInvalidateBankInfos = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: BANK_INFOS_QUERY_KEY,
    });
};
/**
 * Hook to fetch bank infos.
 * @returns The query result.
 */
export const useBankInfos = () =>
  useQuery({
    queryKey: BANK_INFOS_QUERY_KEY,
    queryFn: () => getBankInfos(),
  });
/**
 * Hook to update bank infos.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useUpdateBankInfos = (options) => {
  const invalidateBankInfos = useInvalidateBankInfos();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateBankInfos();
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [invalidateBankInfos],
  );
  const mutation = useMutation({
    mutationFn: ({ logo, ...args }) => {
      const logoData = new FormData();
      if (logo) {
        logoData.append("logo", logo);
      }
      return updateBankInfos({
        ...args,
        logoData,
      });
    },
    mutationKey: UPDATE_BANK_INFOS_MUTATION_KEY,
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
