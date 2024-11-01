"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all recoveries from the server.
 * @returns A promise that resolves to an array of recoveries.
 * @throws {ApiError} if the request fails.
 */
export const getAllRecoveries = async () => {
  const response = await fetchService.get("/recovery");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          let type;
          if (item.type === "forced") {
            type = item.has_guarantee
              ? "forced_with_guarantee"
              : "forced_without_guarantee";
          } else {
            type = item.has_guarantee
              ? "friendly_with_guarantee"
              : "friendly_without_guarantee";
          }
          return {
            id: item.id,
            title: item.name,
            reference: item.reference,
            type,
            guaranteeId: item.guarantee_id,
            contractId: item.contract_id,
            isArchived: item.is_archived,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((recovery) => recovery !== null);
  }
  throw new ApiError("Failed to fetch all recoveries");
};
/**
 * Fetches one recovery from the server.
 * @param recoveryId - The id of the recovery.
 * @returns A promise that resolves to the recovery.
 * @throws {ApiError} if the request fails.
 */
export const getOneRecovery = async (recoveryId) => {
  const response = await fetchService.get(`/recovery/${recoveryId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    let type;
    if (item.type === "forced") {
      type = item.has_guarantee
        ? "forced_with_guarantee"
        : "forced_without_guarantee";
    } else {
      type = item.has_guarantee
        ? "friendly_with_guarantee"
        : "friendly_without_guarantee";
    }
    return {
      id: item.id,
      title: item.name,
      reference: item.reference,
      type,
      guaranteeId: item.guarantee_id,
      contractId: item.contract_id,
      isArchived: item.is_archived,
      currentStep: item.current_step && {
        id: item.current_step.id,
        title: item.current_step.name,
      },
      nextStep: item.next_step && {
        id: item.next_step.id,
        title: item.next_step.name,
      },
      files:
        item.documents?.map((file) => ({
          fileUrl: file.file_url,
          filename: file.filename,
        })) || [],
    };
  }
  throw new ApiError("Failed to fetch this recovery");
};
/**
 * Creates a recovery.
 * @param args - The form data to create the recovery.
 * @returns The created recovery.
 * @throws {ApiError} if the request fails.
 */
export const createRecovery = async (args) => {
  const type = args.type.includes("forced") ? "forced" : "friendly";
  const hasGuarantee = args.type.includes("with_guarantee");
  const response = await fetchService.post(
    "/recovery",
    JSON.stringify({
      name: args.title,
      type,
      has_guarantee: hasGuarantee,
      guarantee_id: args.guaranteeId,
      contract_id: args.contractId,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the recovery");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    reference: item.reference,
    type: args.type,
    guaranteeId: item.guarantee_id,
    isArchived: item.is_archived,
  };
};
/**
 * Prints a recovery.
 * @param recoveryId - The id of the recovery.
 * @throws {ApiError} if the request fails.
 */
export const printRecovery = async (recoveryId) => {
  const response = await fetchService.get(
    `/recovery/generate-pdf/${recoveryId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the recovery");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "recovery.pdf";
  return {
    buffer,
    filename,
  };
};
