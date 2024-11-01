"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all guarantees from the server.
 * @param queries - The queries to filter the guarantees.
 * @returns A promise that resolves to an array of guarantees.
 * @throws {ApiError} if the request fails.
 */
export const getAllGuarantees = async (queries) => {
  const queriesString = new URLSearchParams(queries).toString();
  const response = await fetchService.get(
    `/guarantees${queriesString ? `?${queriesString}` : ""}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.name,
            reference: item.reference,
            phase: item.phase,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((guarantee) => guarantee !== null);
  }
  throw new ApiError("Failed to fetch all guarantees");
};
