"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all lawyers from the server.
 * @returns A promise that resolves to an array of lawyers.
 * @throws {ApiError} if the request fails.
 */
export const getAllLawyers = async () => {
  const response = await fetchService.get("/litigation/lawyers");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((lawyer) => lawyer !== null);
  }
  throw new ApiError("Failed to fetch all lawyers");
};
