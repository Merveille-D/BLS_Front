"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all link items from the server.
 * @returns A promise that resolves to the link items.
 * @throws {ApiError} if the request fails.
 */
export const getAllLinkItems = async () => {
  const response = await fetchService.get("/banks?type=link");
  if (response.ok) {
    const { data: items } = await response.json();
    return items
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            link: item.link,
          };
        } catch (error) {
          return null;
        }
      })
      .filter((item) => item !== null);
  }
  throw new ApiError("Failed to fetch link items");
};
/**
 * Fetches one link item from the server.
 * @param linkItemId - The id of the link item.
 * @returns A promise that resolves to the link item.
 * @throws {ApiError} if the request fails.
 */
export const getOneLinkItem = async (linkItemId) => {
  const response = await fetchService.get(`/banks/${linkItemId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      link: item.link,
    };
  }
  throw new ApiError("Failed to fetch link item");
};
/**
 * Creates a link item.
 * @param args - The form data to create the link item.
 * @returns The created link item.
 * @throws {ApiError} if the request fails.
 */
export const createLinkItem = async (args) => {
  const response = await fetchService.post(
    "/banks",
    JSON.stringify({
      title: args.title,
      link: args.link,
      type: "link",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the link item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    link: item.link,
  };
};
/**
 * Updates a link item.
 * @param linkItemId - The id of the link item.
 * @param args - The form data to update the link item.
 * @returns The updated link item.
 * @throws {ApiError} if the request fails.
 */
export const updateLinkItem = async (linkItemId, args) => {
  const response = await fetchService.put(
    `/banks/${linkItemId}`,
    JSON.stringify({
      title: args.title,
      link: args.link,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the link item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    link: item.link,
  };
};
/**
 * Deletes a link item.
 * @param linkItemId - The id of the link item.
 * @throws {ApiError} if the request fails.
 */
export const deleteLinkItem = async (linkItemId) => {
  const response = await fetchService.delete(`/banks/${linkItemId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the link item");
  }
};
