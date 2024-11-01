"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all subsidiaries from the server.
 * @returns A promise that resolves to an array of subsidiaries.
 * @throws {ApiError} if the request fails.
 */
export const getAllSubsidiaries = async () => {
  const response = await fetchService.get("/subsidiaries");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.name,
            country: item.country,
            address: item.address,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((subsidiary) => subsidiary !== null);
  }
  throw new ApiError("Failed to fetch all subsidiaries");
};
/**
 * Creates a subsidiary.
 * @param args - The form data to create the subsidiary.
 * @returns The created subsidiary.
 * @throws {ApiError} if the request fails.
 */
export const createSubsidiary = async (args) => {
  const response = await fetchService.post(
    "/subsidiaries",
    JSON.stringify({
      name: args.title,
      country: args.country,
      address: args.address,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the subsidiary");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    country: item.country,
    address: item.address,
  };
};
