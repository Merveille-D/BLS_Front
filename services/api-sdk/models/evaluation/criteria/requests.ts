"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all evaluation criteria for a user profile from the server.
 * @param profile - The profile of the user.
 * @param collaboratorId - The id of the collaborator.
 * @returns A promise that resolves to the evaluation criteria.
 * @throws {ApiError} if the request fails.
 */
export const getAllEvaluationCriteria = async ({
  profileId,
  collaboratorId,
}) => {
  let url = "/performance_indicators";
  if (profileId) url += `?position_id=${profileId}`;
  else if (collaboratorId) url += `?collaborator_id=${collaboratorId}`;
  const response = await fetchService.get(url);
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            type: item.type,
            profile: item.position,
            maxScore: item.note,
            description: item.description,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((criteria) => criteria !== null);
  }
  throw new ApiError("Failed to fetch the evaluation criteria");
};
/**
 * Fetches a single evaluation criteria from the server.
 * @param criteriaId - The id of the evaluation criteria.
 * @returns A promise that resolves to the evaluation criteria.
 * @throws {ApiError} if the request fails.
 */
export const getOneEvaluationCriteria = async (criteriaId) => {
  const response = await fetchService.get(
    `/performance_indicators/${criteriaId}`,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      type: item.type,
      profile: item.position,
      maxScore: item.note,
      description: item.description,
    };
  }
  throw new ApiError("Failed to fetch the evaluation criteria");
};
/**
 * Creates a new evaluation criteria.
 * @param args - The form data to create the evaluation criteria.
 * @returns The created evaluation criteria.
 * @throws {ApiError} if the request fails.
 */
export const createEvaluationCriteria = async (args) => {
  const response = await fetchService.post(
    "/performance_indicators",
    JSON.stringify({
      title: args.title,
      type: args.type,
      position_id: args.profileId,
      note: args.maxScore,
      description: args.description,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the evaluation criteria");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    type: item.type,
    profile: item.position,
    maxScore: item.note,
    description: item.description,
  };
};
/**
 * Updates an evaluation criteria.
 * @param criteriaId - The id of the evaluation criteria.
 * @param args - The form data to update the evaluation criteria.
 * @returns The updated evaluation criteria.
 * @throws {ApiError} if the request fails.
 */
export const updateEvaluationCriteria = async (criteriaId, args) => {
  const response = await fetchService.put(
    `/performance_indicators/${criteriaId}`,
    JSON.stringify({
      title: args.title,
      type: args.type,
      position_id: args.profileId,
      note: args.maxScore,
      description: args.description,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the evaluation criteria");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    type: item.type,
    profile: item.position,
    maxScore: item.note,
    description: item.description,
  };
};
/**
 * Deletes an evaluation criteria.
 * @param criteriaId - The id of the evaluation criteria.
 * @throws {ApiError} if the request fails.
 */
export const deleteEvaluationCriteria = async (criteriaId) => {
  const response = await fetchService.delete(
    `/performance_indicators/${criteriaId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to delete the evaluation criteria");
  }
};
