"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
import { formatDate } from "@/services/api-sdk/lib/utils";
/**
 * Fetches all capitals from the server.
 * @returns A promise that resolves to an array of capitals.
 * @throws {ApiError} if the request fails.
 */
export const getAllBankCapitals = async () => {
  const response = await fetchService.get("/capitals");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            capital: item.amount,
            nominalValue: item.par_value,
            date: new Date(item.date),
          };
        } catch (e) {
          return null;
        }
      })
      .filter((capital) => capital !== null);
  }
  throw new ApiError("Failed to fetch all capitals");
};
/**
 * Fetches one capital from the server.
 * @param capitalId - The id of the capital.
 * @returns A promise that resolves to the capital.
 * @throws {ApiError} if the request fails.
 */
export const getOneBankCapital = async (capitalId) => {
  const response = await fetchService.get(`/capitals/${capitalId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      capital: item.amount,
      nominalValue: item.par_value,
      date: new Date(item.date),
    };
  }
  throw new ApiError("Failed to fetch this capital");
};
/**
 * Creates a capital.
 * @param args - The form data to create the capital.
 * @returns The created capital.
 * @throws {ApiError} if the request fails.
 */
export const createBankCapital = async (args) => {
  const response = await fetchService.post(
    "/capitals",
    JSON.stringify({
      amount: args.capital,
      par_value: args.nominalValue,
      date: formatDate(args.date),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the capital");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    capital: item.amount,
    nominalValue: item.par_value,
    date: new Date(item.date),
  };
};
/**
 * Updates a capital.
 * @param capitalId - The id of the capital.
 * @param args - The form data to update the capital.
 * @returns The updated capital.
 * @throws {ApiError} if the request fails.
 */
export const updateBankCapital = async (capitalId, args) => {
  const response = await fetchService.put(
    `/capitals/${capitalId}`,
    JSON.stringify({
      amount: args.capital,
      par_value: args.nominalValue,
      date: args.date && formatDate(args.date),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the capital");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    capital: item.amount,
    nominalValue: item.par_value,
    date: new Date(item.date),
  };
};
/**
 * Deletes a capital.
 * @param capitalId - The id of the capital.
 * @throws {ApiError} if the request fails.
 */
export const deleteBankCapital = async (capitalId) => {
  const response = await fetchService.delete(`/capitals/${capitalId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the capital");
  }
};
