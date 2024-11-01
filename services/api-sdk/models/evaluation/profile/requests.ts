"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all collaborator profile for a user profile from the server.
 * @returns A promise that resolves to the collaborator profile.
 * @throws {ApiError} if the request fails.
 */
export const getAllCollaboratorProfiles = async () => {
  const response = await fetchService.get("/positions");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((criteria) => criteria !== null);
  }
  throw new ApiError("Failed to fetch the collaborator profile");
};
/**
 * Fetches a single collaborator profile from the server.
 * @param profileId - The id of the collaborator profile.
 * @returns A promise that resolves to the collaborator profile.
 * @throws {ApiError} if the request fails.
 */
export const getOneCollaboratorProfile = async (profileId) => {
  const response = await fetchService.get(`/positions/${profileId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
    };
  }
  throw new ApiError("Failed to fetch the collaborator profile");
};
/**
 * Creates a new collaborator profile.
 * @param args - The form data to create the collaborator profile.
 * @returns The created collaborator profile.
 * @throws {ApiError} if the request fails.
 */
export const createCollaboratorProfile = async (args) => {
  const response = await fetchService.post(
    "/positions",
    JSON.stringify({
      title: args.title,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the collaborator profile");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
  };
};
/**
 * Updates a collaborator profile.
 * @param profileId - The id of the collaborator profile.
 * @param args - The form data to update the collaborator profile.
 * @returns The updated collaborator profile.
 * @throws {ApiError} if the request fails.
 */
export const updateCollaboratorProfile = async (profileId, args) => {
  const response = await fetchService.put(
    `/positions/${profileId}`,
    JSON.stringify({
      title: args.title,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the collaborator profile");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
  };
};
/**
 * Deletes a collaborator profile.
 * @param profileId - The id of the collaborator profile.
 * @throws {ApiError} if the request fails.
 */
export const deleteCollaboratorProfile = async (profileId) => {
  const response = await fetchService.delete(`/positions/${profileId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the collaborator profile");
  }
};
