"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all mortgages from the server.
 * @param queries - The queries to filter the mortgages.
 * @returns A promise that resolves to an array of mortgages.
 * @throws {ApiError} if the request fails.
 */
export const getAllMortgages = async (queries) => {
  const queriesString = new URLSearchParams({
    ...queries,
    security: "property",
  }).toString();
  const response = await fetchService.get(
    `/guarantees${queriesString ? `?${queriesString}` : ""}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.name,
            reference: item.reference,
            phase: item.phase,
            contractId: item.contract_id,
            isApproved: item.is_approved,
            estateSalePrice: item.sell_price_estate,
            hasRecovery: item.has_recovery,
            state: item.state,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((mortgage) => mortgage !== null);
  }
  throw new ApiError("Failed to fetch all mortgages");
};
/**
 * Fetches one mortgage from the server.
 * @param mortgageId - The id of the mortgage.
 * @returns A promise that resolves to the mortgage.
 * @throws {ApiError} if the request fails.
 */
export const getOneMortgage = async (mortgageId) => {
  const response = await fetchService.get(`/guarantees/${mortgageId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.name,
      reference: item.reference,
      phase: item.phase,
      contractId: item.contract_id,
      isApproved: item.is_approved,
      estateSalePrice: item.sell_price_estate,
      hasRecovery: item.has_recovery,
      state: item.state,
      currentStep: item.current_step && {
        id: item.current_step.id,
        title: item.current_step.title,
      },
      nextStep: item.next_step && {
        id: item.next_step.id,
        title: item.next_step.title,
      },
      files:
        item.documents?.map((file) => ({
          fileUrl: file.file_url,
          filename: file.filename,
        })) || [],
    };
  }
  throw new ApiError("Failed to fetch this mortgage");
};
/**
 * Creates a mortgage.
 * @param args - The form data to create the mortgage.
 * @returns The created mortgage.
 * @throws {ApiError} if the request fails.
 */
export const createMortgage = async (args) => {
  const response = await fetchService.post(
    "/guarantees",
    JSON.stringify({
      name: args.title,
      contract_id: args.contractId,
      type: "mortgage",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the mortgage");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    reference: item.reference,
    phase: item.phase,
    contractId: item.contract_id,
    isApproved: item.is_approved,
    estateSalePrice: item.sell_price_estate,
    hasRecovery: item.has_recovery,
    state: item.state,
  };
};
/**
 * Starts the realisation phase of a mortgage.
 * @param mortgageId - The id of the mortgage.
 * @throws {ApiError} if the request fails.
 */
export const startRealisation = async (mortgageId) => {
  const response = await fetchService.post(
    `/guarantees/realization/${mortgageId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to start the realisation phase");
  }
};
/**
 * Prints a mortgage.
 * @param mortgageId - The id of the mortgage.
 * @throws {ApiError} if the request fails.
 */
export const printMortgage = async (mortgageId) => {
  const response = await fetchService.get(
    `/guarantees/generate-pdf/${mortgageId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the mortgage");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "mortgage.pdf";
  return {
    buffer,
    filename,
  };
};
