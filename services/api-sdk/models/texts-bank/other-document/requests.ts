"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all documents from the server.
 * @returns A promise that resolves to the documents.
 * @throws {ApiError} if the request fails.
 */
export const getAllOtherDocuments = async () => {
  const response = await fetchService.get("/banks?type=other");
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
  throw new ApiError("Failed to fetch documents");
};
/**
 * Fetches one document from the server.
 * @param documentId - The id of the document.
 * @returns A promise that resolves to the document.
 * @throws {ApiError} if the request fails.
 */
export const getOneOtherDocument = async (documentId) => {
  const response = await fetchService.get(`/banks/${documentId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      fileUrl: item.file_url,
    };
  }
  throw new ApiError("Failed to fetch document");
};
/**
 * Creates a document.
 * @param args - The form data to create the document.
 * @returns The created document.
 * @throws {ApiError} if the request fails.
 */
export const createOtherDocument = async (args) => {
  const file = args.formData.get("file");
  if (!file) {
    throw new ApiError("No file provided");
  }
  const formData = new FormData();
  formData.set("title", args.title);
  formData.set("file", file);
  formData.set("type", "other");
  const response = await fetchService.post("/banks", formData);
  if (!response.ok) {
    throw new ApiError("Failed to create the document");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    fileUrl: item.file_url,
  };
};
/**
 * Updates a document.
 * @param documentId - The id of the document.
 * @param args - The form data to update the document.
 * @returns The updated document.
 * @throws {ApiError} if the request fails.
 */
export const updateOtherDocument = async (documentId, args) => {
  const file = args.formData?.get("file");
  const formData = new FormData();
  if (args.title) {
    formData.set("title", args.title);
  }
  if (file) {
    formData.set("file", file);
  }
  const response = await fetchService.put(`/banks/${documentId}`, formData);
  if (!response.ok) {
    throw new ApiError("Failed to update the document");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    fileUrl: item.file_url,
  };
};
/**
 * Deletes a document.
 * @param documentId - The id of the document.
 * @throws {ApiError} if the request fails.
 */
export const deleteOtherDocument = async (documentId) => {
  const response = await fetchService.delete(`/banks/${documentId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the document");
  }
};
