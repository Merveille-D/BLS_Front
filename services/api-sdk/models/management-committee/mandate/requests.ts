"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches one mandate from the server.
 * @param mandateId - The id of the mandate.
 * @returns A promise that resolves to the mandate.
 * @throws {ApiError} if the request fails.
 */
export const getOneMandate = async (mandateId) => {
  const response = await fetchService.get(`/mandates/${mandateId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      status: item.status,
      startDate: new Date(item.appointment_date),
      endDate: new Date(item.expiry_date),
      renewalDate: new Date(item.renewal_date),
    };
  }
  throw new ApiError("Failed to fetch this mandate");
};
/**
 * Updates a mandate.
 * @param mandateId - The id of the mandate.
 * @param args - The form data to update the mandate.
 * @returns The updated mandate.
 * @throws {ApiError} if the request fails.
 */
export const updateMandate = async (mandateId, args) => {
  const response = await fetchService.put(
    `/mandates/${mandateId}`,
    JSON.stringify({
      appointment_date: formatDate(args.startDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the mandate");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    status: item.status,
    startDate: new Date(item.appointment_date),
    endDate: new Date(item.expiry_date),
    renewalDate: new Date(item.renewal_date),
  };
};
/**
 * Renews a mandate.
 * @param directorId - The id of the director.
 * @param args - The form data to renew the mandate.
 * @throws {ApiError} if the request fails.
 */
export const renewMandate = async (directorId, args) => {
  const response = await fetchService.put(
    "/renew_mandate_administrator",
    JSON.stringify({
      director_id: directorId,
      appointment_date: formatDate(args.startDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to renew the mandate");
  }
};
