"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all personal safeties from the server.
 * @param queries - The queries to filter the personal safeties.
 * @returns A promise that resolves to an array of personal safeties.
 * @throws {ApiError} if the request fails.
 */
export const getAllPersonalSafeties = async (queries) => {
  const queriesString = new URLSearchParams({
    ...queries,
    security: "personal",
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
            type: item.type,
            contractId: item.contract_id,
            hasRecovery: item.has_recovery,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((personalSafety) => personalSafety !== null);
  }
  throw new ApiError("Failed to fetch all personal safeties");
};
/**
 * Fetches one personal safety from the server.
 * @param personalSafetyId - The id of the personal safety.
 * @returns A promise that resolves to the personal safety.
 * @throws {ApiError} if the request fails.
 */
export const getOnePersonalSafety = async (personalSafetyId) => {
  const response = await fetchService.get(`/guarantees/${personalSafetyId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.name,
      reference: item.reference,
      phase: item.phase,
      type: item.type,
      contractId: item.contract_id,
      hasRecovery: item.has_recovery,
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
  throw new ApiError("Failed to fetch this personal safety");
};
/**
 * Creates a personal safety.
 * @param args - The form data to create the personal safety.
 * @returns The created personal safety.
 * @throws {ApiError} if the request fails.
 */
export const createPersonalSafety = async (args) => {
  const response = await fetchService.post(
    "/guarantees",
    JSON.stringify({
      name: args.title,
      type: args.type,
      contract_id: args.contractId,
      autonomous_id: args.guaranteeId,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the personal safety");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    reference: item.reference,
    phase: item.phase,
    type: item.type,
    contractId: item.contract_id,
    hasRecovery: item.has_recovery,
  };
};
/**
 * Starts the realisation phase of a personal safety.
 * @param personalSafetyId - The id of the personal safety.
 * @throws {ApiError} if the request fails.
 */
export const startRealisation = async (personalSafetyId) => {
  const response = await fetchService.post(
    `/guarantees/realization/${personalSafetyId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to start the realisation phase");
  }
};
/**
 * Prints a personal safety.
 * @param personalSafetyId - The id of the personal safety.
 * @throws {ApiError} if the request fails.
 */
export const printPersonalSafety = async (personalSafetyId) => {
  const response = await fetchService.get(
    `/guarantees/generate-pdf/${personalSafetyId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the personal safety");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "personal-safety.pdf";
  return {
    buffer,
    filename,
  };
};
