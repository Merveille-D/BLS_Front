"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all collaborators for a user profile from the server.
 * @param profile - The profile of the user.
 * @returns A promise that resolves to an array of collaborators.
 * @throws {ApiError} if the request fails.
 */
export const getAllCollaborators = async (profile) => {
  const response = await fetchService.get(
    profile ? `/collaborators?position_id=${profile}` : "/collaborators",
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            firstname: item.firstname,
            lastname: item.lastname,
            profile: item.position,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((collaborator) => collaborator !== null);
  }
  throw new ApiError("Failed to fetch the collaborator");
};
/**
 * Fetches a single collaborator from the server.
 * @param collaboratorId - The id of the collaborator.
 * @returns A promise that resolves to the collaborator.
 * @throws {ApiError} if the request fails.
 */
export const getOneCollaborator = async (collaboratorId) => {
  const response = await fetchService.get(`/collaborators/${collaboratorId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      firstname: item.firstname,
      lastname: item.lastname,
      profile: item.position,
    };
  }
  throw new ApiError("Failed to fetch the collaborator");
};
/**
 * Creates a new collaborator.
 * @param args - The form data to create the collaborator.
 * @returns The created collaborator.
 * @throws {ApiError} if the request fails.
 */
export const createCollaborator = async (args) => {
  const response = await fetchService.post(
    "/collaborators",
    JSON.stringify({
      firstname: args.firstname,
      lastname: args.lastname,
      position_id: args.profileId,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the collaborator");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    firstname: item.firstname,
    lastname: item.lastname,
    profile: item.position,
  };
};
/**
 * Updates a collaborator.
 * @param collaboratorId - The id of the collaborator.
 * @param args - The form data to update the collaborator.
 * @returns The updated collaborator.
 * @throws {ApiError} if the request fails.
 */
export const updateCollaborator = async (collaboratorId, args) => {
  const response = await fetchService.put(
    `/collaborators/${collaboratorId}`,
    JSON.stringify({
      firstname: args.firstname,
      lastname: args.lastname,
      position_id: args.profileId,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the collaborator");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    firstname: item.firstname,
    lastname: item.lastname,
    profile: item.position,
  };
};
/**
 * Deletes a collaborator.
 * @param collaboratorId - The id of the collaborator.
 * @throws {ApiError} if the request fails.
 */
export const deleteCollaborator = async (collaboratorId) => {
  const response = await fetchService.delete(
    `/collaborators/${collaboratorId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to delete the collaborator");
  }
};
