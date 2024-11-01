"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all jurisdictions from the server.
 * @returns A promise that resolves to the jurisdictions.
 * @throws {ApiError} if the request fails.
 */
export const getAllJurisdictions = async () => {
  const response = await fetchService.get("/litigation/jurisdiction");
  if (response.ok) {
    const { data: items } = await response.json();
    return items
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.name,
          };
        } catch (error) {
          return null;
        }
      })
      .filter((item) => item !== null);
  }
  throw new ApiError("Failed to fetch jurisdictions");
};
/**
 * Creates a jurisdiction.
 * @param args - The form data to create the jurisdiction.
 * @returns The created jurisdiction.
 * @throws {ApiError} if the request fails.
 */
export const createJurisdiction = async (args) => {
  const response = await fetchService.post(
    "/litigation/jurisdiction",
    JSON.stringify({
      name: args.title,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the jurisdiction");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
  };
};
