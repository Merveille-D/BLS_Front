"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Creates a corporate item.
 * @param args - The form data to create the corporate item.
 * @returns The created corporate item.
 * @throws {ApiError} if the request fails.
 */
export const createCorporateItem = async (args) => {
  const response = await fetchService.post(
    "/parts",
    JSON.stringify({
      name: args.name,
      denomination: args.denomination,
      type: "corporate",
      email: args.email,
      telephone: args.phone,
      residence: args.residence,
      id_card: args.cardId,
      zip_code: args.zipCode,
      number_rccm: args.numberRCCM,
      number_ifu: args.numberIFU,
      capital: args.capital,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the corporate item");
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
    denomination: item.denomination,
    numberRCCM: item.number_rccm,
    numberIFU: item.number_ifu,
    capital: item.capital,
  };
};
