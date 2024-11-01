"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all third-parties from the server.
 * @returns A promise that resolves to an array of third-parties.
 * @throws {ApiError} if the request fails.
 */
export const getAllThirdParties = async () => {
  const response = await fetchService.get("/tiers");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            name: item.name,
            grade: item.grade,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((transfer) => transfer !== null);
  }
  throw new ApiError("Failed to fetch all third parties");
};
