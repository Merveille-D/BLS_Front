"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all directors from the server.
 * @returns A promise that resolves to an array of directors.
 * @throws {ApiError} if the request fails.
 */
export const getAllDirectors = async () => {
  const response = await fetchService.get("/directors");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            name: item.name,
            birthDate: new Date(item.birthdate),
            birthPlace: item.birthplace,
            nationality: item.nationality,
            address: item.address,
            mandates: item.mandates.map((mandate) => ({
              id: mandate.id,
              status: mandate.status,
              startDate: new Date(mandate.appointment_date),
              endDate: new Date(mandate.expiry_date),
              renewalDate: new Date(mandate.renewal_date),
            })),
          };
        } catch (e) {
          return null;
        }
      })
      .filter((director) => director !== null);
  }
  throw new ApiError("Failed to fetch all directors");
};
/**
 * Fetches one director from the server.
 * @param directorId - The id of the director.
 * @returns A promise that resolves to the director.
 * @throws {ApiError} if the request fails.
 */
export const getOneDirector = async (directorId) => {
  const response = await fetchService.get(`/directors/${directorId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      name: item.name,
      birthDate: new Date(item.birthdate),
      birthPlace: item.birthplace,
      nationality: item.nationality,
      address: item.address,
      mandates: item.mandates.map((mandate) => ({
        id: mandate.id,
        status: mandate.status,
        startDate: new Date(mandate.appointment_date),
        endDate: new Date(mandate.expiry_date),
        renewalDate: new Date(mandate.renewal_date),
      })),
    };
  }
  throw new ApiError("Failed to fetch this director");
};
/**
 * Creates a director.
 * @param args - The form data to create the director.
 * @returns The created director.
 * @throws {ApiError} if the request fails.
 */
export const createDirector = async (args) => {
  const response = await fetchService.post(
    "/directors",
    JSON.stringify({
      name: args.name,
      birthdate: formatDate(args.birthDate),
      birthplace: args.birthPlace,
      nationality: args.nationality,
      address: args.address,
      appointment_date: formatDate(args.mandateStartDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the director");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    name: item.name,
    birthDate: new Date(item.birthdate),
    birthPlace: item.birthplace,
    nationality: item.nationality,
    address: item.address,
    mandates: item.mandates.map((mandate) => ({
      id: mandate.id,
      status: mandate.status,
      startDate: new Date(mandate.appointment_date),
      endDate: new Date(mandate.expiry_date),
      renewalDate: new Date(mandate.renewal_date),
    })),
  };
};
/**
 * Updates a director.
 * @param directorId - The id of the director.
 * @param args - The form data to update the director.
 * @returns The updated director.
 * @throws {ApiError} if the request fails.
 */
export const updateDirector = async (directorId, args) => {
  const response = await fetchService.put(
    `/directors/${directorId}`,
    JSON.stringify({
      name: args.name,
      birthdate: args.birthDate && formatDate(args.birthDate),
      birthplace: args.birthPlace,
      nationality: args.nationality,
      address: args.address,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the director");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    name: item.name,
    birthDate: new Date(item.birthdate),
    birthPlace: item.birthplace,
    nationality: item.nationality,
    address: item.address,
    mandates: item.mandates.map((mandate) => ({
      id: mandate.id,
      status: mandate.status,
      startDate: new Date(mandate.appointment_date),
      endDate: new Date(mandate.expiry_date),
      renewalDate: new Date(mandate.renewal_date),
    })),
  };
};
/**
 * Deletes a director.
 * @param directorId - The id of the director.
 * @throws {ApiError} if the request fails.
 */
export const deleteDirector = async (directorId) => {
  const response = await fetchService.delete(`/directors/${directorId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the director");
  }
};
