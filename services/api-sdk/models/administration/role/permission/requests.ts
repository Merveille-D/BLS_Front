"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all permissions from the server.
 * @returns A promise that resolves to an array of permissions.
 * @throws {ApiError} if the request fails.
 */
export const getAllPermissions = async () => {
  const response = await fetchService.get("/permissions");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.name,
            description: item.description,
            permissions: item.permissions.map((permission) => ({
              id: permission.id,
              value: permission.name,
              title: permission.label,
              description: permission.description,
            })),
          };
        } catch (e) {
          return null;
        }
      })
      .filter((permission) => permission !== null);
  }
  throw new ApiError("Failed to fetch all permissions");
};
