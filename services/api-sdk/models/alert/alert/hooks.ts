import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { getAllAlerts, getOneAlert, markAlertAsRead } from "./requests";
/**
 * Tag generator for the query to fetch all alerts.
 * @param options - The options to filter the alerts.
 * @returns The query tag.
 */
export const getAllAlertsQueryTag = (options) =>
  ["ALERTS", "ALL_ALERTS", options].filter(Boolean);
/**
 * Tag generator for the query to fetch one alert
 * @param alertId - The id of the alert.
 * @returns The query tag.
 */
export const getOneAlertQueryTag = (alertId) => [
  "ALERTS",
  "ONE_ALERT",
  alertId,
];
/**
 * Tag generator for the mutation to mark an alert as read.
 * @param alertId - The id of the alert.
 * @returns The mutation key.
 */
export const getMarkAlertAsReadMutationKey = (alertId) => [
  "ALERTS",
  "MARK_ALERT_AS_READ",
  alertId,
];
/**
 * Hook to invalidate all alerts query.
 * @returns A function to invalidate the all alerts query.
 */
export const useInvalidateAllAlerts = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: getAllAlertsQueryTag(),
    });
};
/**
 * Hook to invalidate the one alert query.
 * @returns A function to invalidate the one alert query.
 */
export const useInvalidateOneAlert = () => {
  const queryClient = useQueryClient();
  return (alertId) =>
    queryClient.invalidateQueries({
      queryKey: getOneAlertQueryTag(alertId),
    });
};
/**
 * Hook to fetch all alerts
 * @param options - The options to filter the alerts.
 * @returns The query result.
 */
export const useAllAlerts = (options) =>
  useQuery({
    queryKey: getAllAlertsQueryTag(options),
    queryFn: () => getAllAlerts(options),
  });
/**
 * Hook to fetch one alert.
 * @param alertId - The id of the alert.
 * @returns The query result.
 */
export const useOneAlert = (alertId) =>
  useQuery({
    queryKey: getOneAlertQueryTag(alertId),
    queryFn: () => getOneAlert(alertId),
  });
/**
 * Hook to mark an alert as read.
 * @param alertId - The id of the alert to mark as read.
 * @param options - The options for the mutation.
 * @returns The mutation result.
 */
export const useMarkAlertAsRead = (alertId, options) => {
  const invalidateAllAlerts = useInvalidateAllAlerts();
  const invalidateOneAlert = useInvalidateOneAlert();
  const getMutationOptions = useCallback(
    (mutateOptions) => ({
      ...mutateOptions,
      onSettled: async (...args) => {
        await invalidateAllAlerts();
        await invalidateOneAlert(alertId);
        return mutateOptions?.onSettled?.(...args);
      },
    }),
    [alertId, invalidateAllAlerts, invalidateOneAlert],
  );
  const mutation = useMutation({
    mutationFn: () => markAlertAsRead(alertId),
    mutationKey: getMarkAlertAsReadMutationKey(alertId),
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
