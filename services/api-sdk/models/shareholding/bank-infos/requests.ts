"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches bank infos from the server.
 * @returns A promise that resolves to bank infos.
 * @throws {ApiError} if the request fails.
 */
export const getBankInfos = async () => {
  const response = await fetchService.get("/bank_infos");
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      name: item?.denomination,
      logoUrl: item?.logo,
      headOffice: item?.siege_social,
      shareholdersCount: item?.total_shareholders,
      capital: item?.capital?.amount,
      nominalValue: item?.capital?.par_value,
      majorityShareholder: item?.majority_shareholder && {
        name: item.majority_shareholder.name,
        sharePercentage: item.majority_shareholder.percentage,
      },
    };
  }
  throw new ApiError("Failed to fetch bank infos");
};
/**
 * Updates bank infos.
 * @param args - The form data to update bank infos.
 * @returns The updated bank infos.
 * @throws {ApiError} if the request fails.
 */
export const updateBankInfos = async (args) => {
  const logo = args.logoData?.get("logo");
  const formData = new FormData();
  if (args.name) {
    formData.append("denomination", args.name);
  }
  if (logo) {
    formData.append("logo", logo);
  }
  if (args.headOffice) {
    formData.append("siege_social", args.headOffice);
  }
  const response = await fetchService.post("/bank_infos", formData);
  if (!response.ok) {
    throw new ApiError("Failed to update bank infos");
  }
  const { data: item } = await response.json();
  return {
    name: item.denomination,
    logoUrl: item.logo,
    headOffice: item.siege_social,
    shareholdersCount: item.total_shareholders,
    capital: item?.capital?.amount,
    nominalValue: item?.capital?.par_value,
    majorityShareholder: item.majority_shareholder && {
      name: item.majority_shareholder.name,
      sharePercentage: item.majority_shareholder.percentage,
    },
  };
};
