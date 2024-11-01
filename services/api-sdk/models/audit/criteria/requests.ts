"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all audit criteria for a user module from the server.
 * @param module - The module of the user.
 * @returns A promise that resolves to the audit criteria.
 * @throws {ApiError} if the request fails.
 */
export const getAllAuditCriteria = async ({ module }) => {
  let url = "/audit_performance_indicators";
  if (module) url += `?module=${module}`;
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
            module: item.module,
            maxScore: item.note,
            description: item.description,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((criteria) => criteria !== null);
  }
  console.log(module, await response.text());
  throw new ApiError("Failed to fetch the audit criteria");
};
/**
 * Fetches a single audit criteria from the server.
 * @param criteriaId - The id of the audit criteria.
 * @returns A promise that resolves to the audit criteria.
 * @throws {ApiError} if the request fails.
 */
export const getOneAuditCriteria = async (criteriaId) => {
  const response = await fetchService.get(
    `/audit_performance_indicators/${criteriaId}`,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      type: item.type,
      module: item.module,
      maxScore: item.note,
      description: item.description,
    };
  }
  throw new ApiError("Failed to fetch the audit criteria");
};
/**
 * Creates a new audit criteria.
 * @param args - The form data to create the audit criteria.
 * @returns The created audit criteria.
 * @throws {ApiError} if the request fails.
 */
export const createAuditCriteria = async (args) => {
  const response = await fetchService.post(
    "/audit_performance_indicators",
    JSON.stringify({
      title: args.title,
      type: args.type,
      module: args.module,
      note: args.maxScore,
      description: args.description,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the audit criteria");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    type: item.type,
    module: item.module,
    maxScore: item.note,
    description: item.description,
  };
};
/**
 * Updates an audit criteria.
 * @param criteriaId - The id of the audit criteria.
 * @param args - The form data to update the audit criteria.
 * @returns The updated audit criteria.
 * @throws {ApiError} if the request fails.
 */
export const updateAuditCriteria = async (criteriaId, args) => {
  const response = await fetchService.put(
    `/audit_performance_indicators/${criteriaId}`,
    JSON.stringify({
      title: args.title,
      type: args.type,
      module: args.module,
      note: args.maxScore,
      description: args.description,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the audit criteria");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    type: item.type,
    module: item.module,
    maxScore: item.note,
    description: item.description,
  };
};
/**
 * Deletes an audit criteria.
 * @param criteriaId - The id of the audit criteria.
 * @throws {ApiError} if the request fails.
 */
export const deleteAuditCriteria = async (criteriaId) => {
  const response = await fetchService.delete(
    `/audit_performance_indicators/${criteriaId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to delete the audit criteria");
  }
};
