"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Creates an individual item.
 * @param args - The form data to create the individual item.
 * @returns The created individual item.
 * @throws {ApiError} if the request fails.
 */
export const createIndividualItem = async (args) => {
  const response = await fetchService.post(
    "/parts",
    JSON.stringify({
      name: args.name,
      type: "individual",
      email: args.email,
      telephone: args.phone,
      residence: args.residence,
      id_card: args.cardId,
      zip_code: args.zipCode,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the individual item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.telephone,
    residence: item.residence,
    cardId: item.id_card,
    zipCode: item.zip_code,
  };
};
