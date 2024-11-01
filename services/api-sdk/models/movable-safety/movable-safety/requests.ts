"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all movable safeties from the server.
 * @param queries - The queries to filter the movable safeties.
 * @returns A promise that resolves to an array of movable safeties.
 * @throws {ApiError} if the request fails.
 */
export const getAllMovableSafeties = async (queries) => {
  const queriesString = new URLSearchParams({
    ...queries,
    security: "movable",
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
            security: item.security,
            formalizationType: item.formalization_type,
            contractId: item.contract_id,
            hasRecovery: item.has_recovery,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((movableSafety) => movableSafety !== null);
  }
  throw new ApiError("Failed to fetch all movable safeties");
};
/**
 * Fetches one movable safety from the server.
 * @param movableSafetyId - The id of the movable safety.
 * @returns A promise that resolves to the movable safety.
 * @throws {ApiError} if the request fails.
 */
export const getOneMovableSafety = async (movableSafetyId) => {
  const response = await fetchService.get(`/guarantees/${movableSafetyId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.name,
      reference: item.reference,
      phase: item.phase,
      type: item.type,
      security: item.security,
      formalizationType: item.formalization_type,
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
  throw new ApiError("Failed to fetch this movable safety");
};
/**
 * Creates a movable safety.
 * @param args - The form data to create the movable safety.
 * @returns The created movable safety.
 * @throws {ApiError} if the request fails.
 */
export const createMovableSafety = async (args) => {
  const response = await fetchService.post(
    "/guarantees",
    JSON.stringify({
      name: args.title,
      type: args.type,
      security: args.security,
      formalization_type: args.formalizationType,
      contract_id: args.contractId,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the movable safety");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    reference: item.reference,
    phase: item.phase,
    type: item.type,
    security: item.security,
    formalizationType: item.formalization_type,
    contractId: item.contract_id,
    hasRecovery: item.has_recovery,
  };
};
/**
 * Starts the realisation phase of a movable safety.
 * @param movableSafetyId - The id of the movable safety.
 * @throws {ApiError} if the request fails.
 */
export const startRealisation = async (movableSafetyId) => {
  const response = await fetchService.post(
    `/guarantees/realization/${movableSafetyId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to start the realisation phase");
  }
};
/**
 * Prints a movable safety.
 * @param movableSafetyId - The id of the movable safety.
 * @throws {ApiError} if the request fails.
 */
export const printMovableSafety = async (movableSafetyId) => {
  const response = await fetchService.get(
    `/guarantees/generate-pdf/${movableSafetyId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the movable safety");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "movable-safety.pdf";
  return {
    buffer,
    filename,
  };
};
