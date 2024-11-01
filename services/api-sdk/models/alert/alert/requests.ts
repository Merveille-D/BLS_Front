"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all alerts from the server.
 * @param options - The options to filter the alerts.
 * @returns A promise that resolves to an array of alerts.
 * @throws {ApiError} if the request fails.
 */
export const getAllAlerts = async (options) => {
  const params = new URLSearchParams({
    ...(options?.module && { type: options.module }),
    ...(options?.isRead !== undefined && {
      is_read: options.isRead.toString(),
    }),
  });
  const response = await fetchService.get(`/notifications?${params}`);
  if (response.ok) {
    const { data } = await response.json();
    return data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            message: item.message,
            priority: item.priority,
            isRead: !!item.read_at,
            dueDate: new Date(item.deadline),
            module: item.type,
            moduleId: item.module_id,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((alert) => alert !== null);
  }
  throw new ApiError("Failed to fetch all alerts");
};
/**
 * Fetches one alert from the server.
 * @param alertId - The id of the alert.
 * @returns A promise that resolves to the alert.
 * @throws {ApiError} if the request fails.
 */
export const getOneAlert = async (alertId) => {
  const response = await fetchService.get(`/notifications/${alertId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      message: item.message,
      priority: item.priority,
      isRead: !!item.read_at,
      dueDate: new Date(item.deadline),
      module: item.type,
      moduleId: item.module_id,
    };
  }
  throw new ApiError("Failed to fetch this alert");
};
/**
 * Marks an alert as read.
 * @param alertId - The id of the alert.
 * @returns A promise that resolves to the alert.
 * @throws {ApiError} if the request fails.
 */
export const markAlertAsRead = async (alertId) => {
  const response = await fetchService.put(`/notifications/${alertId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      message: item.message,
      priority: item.priority,
      isRead: true,
      dueDate: new Date(item.deadline),
      module: item.type,
      moduleId: item.module_id,
    };
  }
  throw new ApiError("Failed to mark this alert as read");
};
