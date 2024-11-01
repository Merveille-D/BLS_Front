"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all users from the server.
 * @returns A promise that resolves to an array of users.
 * @throws {ApiError} if the request fails.
 */
export const getAllUsers = async () => {
  const response = await fetchService.get("/users");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            username: item.username,
            firstname: item.firstname,
            lastname: item.lastname,
            email: item.email,
            roles: item.roles.map((role) => ({
              id: role.id,
              title: role.name,
            })),
            subsidiary: {
              id: item.subsidiary.id,
              title: item.subsidiary.name,
            },
          };
        } catch (e) {
          return null;
        }
      })
      .filter((user) => user !== null);
  }
  throw new ApiError("Failed to fetch all users");
};
/**
 * Creates a user.
 * @param args - The form data to create the user.
 * @returns The created user.
 * @throws {ApiError} if the request fails.
 */
export const createUser = async (args) => {
  const response = await fetchService.post(
    "/users",
    JSON.stringify({
      username: args.username,
      firstname: args.firstname,
      lastname: args.lastname,
      email: args.email,
      role_id: args.roleIds[0],
      subsidiary_id: args.subsidiaryId,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the user");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    username: item.username,
    firstname: item.firstname,
    lastname: item.lastname,
    email: item.email,
    roles: item.roles.map((role) => ({
      id: role.id,
      title: role.name,
    })),
    subsidiary: {
      id: item.subsidiary.id,
      title: item.subsidiary.name,
    },
  };
};
/**
 * Deletes a user
 * @param userId - The id of the user to delete.
 * @throws {ApiError} if the request fails.
 */
export const deleteUser = async (userId) => {
  const response = await fetchService.delete(`/users/${userId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the user");
  }
};
