"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all roles from the server.
 * @returns A promise that resolves to an array of roles.
 * @throws {ApiError} if the request fails.
 */
export const getAllRoles = async () => {
  const response = await fetchService.get("/roles");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.name,
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
      .filter((role) => role !== null);
  }
  throw new ApiError("Failed to fetch all roles");
};
/**
 * Creates a role.
 * @param args - The form data to create the role.
 * @returns The created role.
 * @throws {ApiError} if the request fails.
 */
export const createRole = async (args) => {
  const response = await fetchService.post(
    "/roles",
    JSON.stringify({
      name: args.title,
      permissions: args.permissionIds,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the role");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    permissions: item.permissions.map((permission) => ({
      id: permission.id,
      value: permission.name,
      title: permission.label,
      description: permission.description,
    })),
  };
};
