"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all litigation parties from the server.
 * @returns A promise that resolves to an array of litigation parties.
 * @throws {ApiError} if the request fails.
 */
export const getAllLitigationParties = async () => {
  const response = await fetchService.get("/litigation/parties");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.name,
            phone: item.phone,
            email: item.email,
            address: item.address,
            type: item.party_type,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((task) => task !== null);
  }
  throw new ApiError("Failed to fetch all litigation parties");
};
/**
 * Creates a litigation party.
 * @param args - The form data to create the litigation party.
 * @returns The created litigation party.
 * @throws {ApiError} if the request fails.
 */
export const createLitigationParty = async (args) => {
  const response = await fetchService.post(
    "/litigation/parties",
    JSON.stringify({
      name: args.title,
      phone: args.phone,
      email: args.email,
      address: args.address,
      type: args.type,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the litigation party");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    phone: item.phone,
    email: item.email,
    address: item.address,
    type: item.party_type,
  };
};
