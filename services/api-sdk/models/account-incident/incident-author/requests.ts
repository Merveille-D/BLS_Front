"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all incident authors from the server.
 * @returns A promise that resolves to an array of incident authors.
 * @throws {ApiError} if the request fails.
 */
export const getAllIncidentAuthors = async () => {
  const response = await fetchService.get("/author_incidents");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.telephone,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((task) => task !== null);
  }
  throw new ApiError("Failed to fetch all incident authors");
};
/**
 * Fetches one incident author from the server.
 * @param authorId - The id of the incident author.
 * @returns A promise that resolves to the incident author.
 * @throws {ApiError} if the request fails.
 */
export const getOneIncidentAuthor = async (authorId) => {
  const response = await fetchService.get(`/author_incidents/${authorId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.telephone,
    };
  }
  throw new ApiError("Failed to fetch this incident author");
};
/**
 * Creates a incident author.
 * @param args - The form data to create the incident author.
 * @returns The created incident author.
 * @throws {ApiError} if the request fails.
 */
export const createIncidentAuthor = async (args) => {
  const response = await fetchService.post(
    "/author_incidents",
    JSON.stringify({
      name: args.name,
      email: args.email,
      telephone: args.phone,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the incident author");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.telephone,
  };
};
/**
 * Updates a incident author.
 * @param authorId - The id of the incident author.
 * @param args - The form data to update the incident author.
 * @returns The updated incident author.
 * @throws {ApiError} if the request fails.
 */
export const updateIncidentAuthor = async (authorId, args) => {
  const response = await fetchService.put(
    `/author_incidents/${authorId}`,
    JSON.stringify({
      name: args.name,
      email: args.email,
      telephone: args.phone,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the incident author");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.telephone,
  };
};
/**
 * Deletes a incident author.
 * @param authorId - The id of the incident author.
 * @throws {ApiError} if the request fails.
 */
export const deleteIncidentAuthor = async (authorId) => {
  const response = await fetchService.delete(`/author_incidents/${authorId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the incident author");
  }
};
