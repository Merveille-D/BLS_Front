"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all administrators from the server.
 * @returns A promise that resolves to an array of administrators.
 * @throws {ApiError} if the request fails.
 */
export const getAllAdministrators = async () => {
  const response = await fetchService.get("/ca_administrators");
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
            share: item.shares,
            sharePercentage: item.share_percentage,
            type: item.type,
            quality: item.quality,
            role: item.function,
            denomination: item.denomination,
            companyHeadOffice: item.company_head_office,
            companyNationality: item.company_nationality,
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
      .filter((administrator) => administrator !== null);
  }
  throw new ApiError("Failed to fetch all administrators");
};
/**
 * Fetches one administrator from the server.
 * @param administratorId - The id of the administrator.
 * @returns A promise that resolves to the administrator.
 * @throws {ApiError} if the request fails.
 */
export const getOneAdministrator = async (administratorId) => {
  const response = await fetchService.get(
    `/ca_administrators/${administratorId}`,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      name: item.name,
      birthDate: new Date(item.birthdate),
      birthPlace: item.birthplace,
      nationality: item.nationality,
      address: item.address,
      share: item.shares,
      sharePercentage: item.share_percentage,
      type: item.type,
      quality: item.quality,
      role: item.function,
      denomination: item.denomination,
      companyHeadOffice: item.company_head_office,
      companyNationality: item.company_nationality,
      mandates: item.mandates.map((mandate) => ({
        id: mandate.id,
        status: mandate.status,
        startDate: new Date(mandate.appointment_date),
        endDate: new Date(mandate.expiry_date),
        renewalDate: new Date(mandate.renewal_date),
      })),
    };
  }
  throw new ApiError("Failed to fetch this administrator");
};
/**
 * Creates a administrator.
 * @param args - The form data to create the administrator.
 * @returns The created administrator.
 * @throws {ApiError} if the request fails.
 */
export const createAdministrator = async (args) => {
  const response = await fetchService.post(
    "/ca_administrators",
    JSON.stringify({
      name: args.name,
      birthdate: formatDate(args.birthDate),
      birthplace: args.birthPlace,
      nationality: args.nationality,
      address: args.address,
      shares: args.share,
      share_percentage: args.sharePercentage,
      quality: args.quality,
      function: args.role,
      type: args.type,
      denomination: args.denomination,
      company_head_office: args.companyHeadOffice,
      company_nationality: args.companyNationality,
      appointment_date: formatDate(args.mandateStartDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the administrator");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    name: item.name,
    birthDate: new Date(item.birthdate),
    birthPlace: item.birthplace,
    nationality: item.nationality,
    address: item.address,
    share: item.shares,
    sharePercentage: item.share_percentage,
    type: item.type,
    quality: item.quality,
    role: item.function,
    denomination: item.denomination,
    companyHeadOffice: item.company_head_office,
    companyNationality: item.company_nationality,
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
 * Updates a administrator.
 * @param administratorId - The id of the administrator.
 * @param args - The form data to update the administrator.
 * @returns The updated administrator.
 * @throws {ApiError} if the request fails.
 */
export const updateAdministrator = async (administratorId, args) => {
  const response = await fetchService.put(
    `/ca_administrators/${administratorId}`,
    JSON.stringify({
      name: args.name,
      birthdate: args.birthDate && formatDate(args.birthDate),
      birthplace: args.birthPlace,
      nationality: args.nationality,
      address: args.address,
      shares: args.share,
      share_percentage: args.sharePercentage,
      quality: args.quality,
      function: args.role,
      type: args.type,
      denomination: args.denomination,
      company_head_office: args.companyHeadOffice,
      company_nationality: args.companyNationality,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the administrator");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    name: item.name,
    birthDate: new Date(item.birthdate),
    birthPlace: item.birthplace,
    nationality: item.nationality,
    address: item.address,
    share: item.shares,
    sharePercentage: item.share_percentage,
    type: item.type,
    quality: item.quality,
    role: item.function,
    denomination: item.denomination,
    companyHeadOffice: item.company_head_office,
    companyNationality: item.company_nationality,
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
 * Deletes a administrator.
 * @param administratorId - The id of the administrator.
 * @throws {ApiError} if the request fails.
 */
export const deleteAdministrator = async (administratorId) => {
  const response = await fetchService.delete(
    `/ca_administrators/${administratorId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to delete the administrator");
  }
};
