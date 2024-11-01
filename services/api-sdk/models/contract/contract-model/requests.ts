"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches one contract model from the server.
 * @param parentId - The id of the contract model parent.
 * @returns A promise that resolves to the contract model children.
 * @throws {ApiError} if the request fails.
 */
export const getAllContractModels = async (parentId) => {
  const searchParams = new URLSearchParams();
  if (parentId) {
    searchParams.set("parent_id", parentId);
  }
  const response = await fetchService.get(
    `/contract_models?${searchParams.toString()}`,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.parent?.id,
      name: item.parent?.name,
      type: "folder",
      children: item.children?.map((model) => ({
        id: model.id,
        parentId: item.parent?.id,
        type: model.type,
        name: model.name,
        fileUrl: model.file_path,
      })),
    };
  }
  throw new ApiError("Failed to fetch this contract model");
};
/**
 * Creates a contract model.
 * @param args - The form data to create the contract model.
 * @returns The created contract model.
 * @throws {ApiError} if the request fails.
 */
export const createContractModel = async (args) => {
  const file = args.fileData?.get("file");
  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }
  if (args.parentId) {
    formData.append("parent_id", args.parentId);
  }
  formData.append("name", args.name);
  formData.append("type", args.type);
  const response = await fetchService.post("/contract_models", formData);
  if (!response.ok) {
    throw new ApiError("Failed to create the contract model");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    parentId: item.parent_id,
    type: item.type,
    name: item.name,
    fileUrl: item.file_path,
  };
};
/**
 * Updates a contract model.
 * @param modelId - The id of the contract model category.
 * @param args - The form data to update the contract model category.
 * @returns The updated contract model category.
 * @throws {ApiError} if the request fails.
 */
export const updateContractModel = async (modelId, args) => {
  const response = await fetchService.put(
    `/contract_models/${modelId}`,
    JSON.stringify({
      name: args.name,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the contract model");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    parentId: item.parent_id,
    type: item.type,
    name: item.name,
    fileUrl: item.file_path,
  };
};
/**
 * Deletes a contract model.
 * @param modelId - The id of the contract model.
 * @throws {ApiError} if the request fails.
 */
export const deleteContractModel = async (modelId) => {
  const response = await fetchService.delete(`/contract_models/${modelId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the contract model");
  }
};
