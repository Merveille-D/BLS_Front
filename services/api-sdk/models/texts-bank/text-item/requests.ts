"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all text items from the server.
 * @returns A promise that resolves to the text items.
 * @throws {ApiError} if the request fails.
 */
export const getAllTextItems = async () => {
  const response = await fetchService.get("/banks?type=file");
  if (response.ok) {
    const { data: items } = await response.json();
    return items
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            fileUrl: item.file_url,
          };
        } catch (error) {
          return null;
        }
      })
      .filter((item) => item !== null);
  }
  throw new ApiError("Failed to fetch text items");
};
/**
 * Fetches one text item from the server.
 * @param textItemId - The id of the text item.
 * @returns A promise that resolves to the text item.
 * @throws {ApiError} if the request fails.
 */
export const getOneTextItem = async (textItemId) => {
  const response = await fetchService.get(`/banks/${textItemId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      fileUrl: item.file_url,
    };
  }
  throw new ApiError("Failed to fetch text item");
};
/**
 * Creates a text item.
 * @param args - The form data to create the text item.
 * @returns The created text item.
 * @throws {ApiError} if the request fails.
 */
export const createTextItem = async (args) => {
  const file = args.formData.get("file");
  if (!file) {
    throw new ApiError("No file provided");
  }
  const formData = new FormData();
  formData.set("title", args.title);
  formData.set("file", file);
  formData.set("type", "file");
  const response = await fetchService.post("/banks", formData);
  if (!response.ok) {
    throw new ApiError("Failed to create the text item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    fileUrl: item.file_url,
  };
};
/**
 * Updates a text item.
 * @param textItemId - The id of the text item.
 * @param args - The form data to update the text item.
 * @returns The updated text item.
 * @throws {ApiError} if the request fails.
 */
export const updateTextItem = async (textItemId, args) => {
  const file = args.formData?.get("file");
  const formData = new FormData();
  if (args.title) {
    formData.set("title", args.title);
  }
  if (file) {
    formData.set("file", file);
  }
  const response = await fetchService.put(`/banks/${textItemId}`, formData);
  if (!response.ok) {
    throw new ApiError("Failed to update the text item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    fileUrl: item.file_url,
  };
};
/**
 * Deletes a text item.
 * @param textItemId - The id of the text item.
 * @throws {ApiError} if the request fails.
 */
export const deleteTextItem = async (textItemId) => {
  const response = await fetchService.delete(`/banks/${textItemId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the text item");
  }
};
