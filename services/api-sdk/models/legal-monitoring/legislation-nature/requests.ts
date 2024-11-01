"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all legislation natures from the server.
 * @returns A promise that resolves to the legislation natures.
 * @throws {ApiError} if the request fails.
 */
export const getAllLegislationNatures = async () => {
  const response = await fetchService.get("/litigation/natures");
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
  throw new ApiError("Failed to fetch legislation natures");
};
/**
 * Creates a legislation nature.
 * @param args - The form data to create the legislation nature.
 * @returns The created legislation nature.
 * @throws {ApiError} if the request fails.
 */
export const createLegislationNature = async (args) => {
  const response = await fetchService.post(
    "/litigation/natures",
    JSON.stringify({
      name: args.title,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the legislation nature");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
  };
};
