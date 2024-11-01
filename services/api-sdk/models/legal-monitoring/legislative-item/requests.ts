"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all legislative items from the server.
 * @returns A promise that resolves to the legislative items.
 * @throws {ApiError} if the request fails.
 */
export const getAllLegislativeItems = async () => {
  const response = await fetchService.get("/legal-watches?type=mixte");
  if (response.ok) {
    const { data: items } = await response.json();
    return items
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.name,
            reference: item.reference,
            caseNumber: item.case_number,
            summary: item.summary,
            innovation: item.innovation,
            isArchived: item.is_archived,
            type: item.type,
            effectiveDate: new Date(item.effective_date),
            nature: {
              id: item.nature.id,
              title: item.nature.name,
            },
            mail: item.is_archived
              ? undefined
              : {
                  recipient: item.recipient_type,
                  subject: item.mail_object,
                  content: item.mail_content,
                  addresses: item.mail_addresses,
                },
          };
        } catch (error) {
          return null;
        }
      })
      .filter((item) => item !== null);
  }
  throw new ApiError("Failed to fetch legislative items");
};
/**
 * Fetches a single legislative item from the server.
 * @param itemId - The ID of the legislative item to fetch.
 * @returns A promise that resolves to the legislative item.
 * @throws {ApiError} if the request fails.
 */
export const getOneLegislativeItem = async (itemId) => {
  const response = await fetchService.get(`/legal-watches/${itemId}`);
  if (!response.ok) {
    throw new ApiError("Failed to fetch the legislative item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    reference: item.reference,
    caseNumber: item.case_number,
    summary: item.summary,
    innovation: item.innovation,
    isArchived: item.is_archived,
    effectiveDate: new Date(item.effective_date),
    type: item.type,
    nature: {
      id: item.nature.id,
      title: item.nature.name,
    },
    mail: item.is_archived
      ? undefined
      : {
          recipient: item.recipient_type,
          subject: item.mail_object,
          content: item.mail_content,
          addresses: item.mail_addresses,
        },
  };
};
/**
 * Creates a legislative item.
 * @param args - The form data to create the legislative item.
 * @returns The created legislative item.
 * @throws {ApiError} if the request fails.
 */
export const createLegislativeItem = async (args) => {
  const response = await fetchService.post(
    "/legal-watches",
    JSON.stringify({
      name: args.title,
      case_number: args.caseNumber,
      summary: args.summary,
      innovation: args.innovation,
      effective_date: formatDate(args.effectiveDate),
      nature_id: args.natureId,
      type: args.type,
      is_archived: args.isArchived,
      ...(!args.isArchived && {
        recipient_type: args.mail?.recipient,
        mail_object: args.mail?.subject,
        mail_content: args.mail?.content,
        mail_addresses: args.mail?.addresses,
      }),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the legislative item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    reference: item.reference,
    caseNumber: item.case_number,
    summary: item.summary,
    innovation: item.innovation,
    isArchived: item.is_archived,
    effectiveDate: new Date(item.effective_date),
    type: item.type,
    nature: {
      id: item.nature.id,
      title: item.nature.name,
    },
    mail: item.is_archived
      ? undefined
      : {
          recipient: item.recipient_type,
          subject: item.mail_object,
          content: item.mail_content,
          addresses: item.mail_addresses,
        },
  };
};
/**
 * Updates a legislative item.
 * @param itemId - The ID of the legislative item to update.
 * @param args - The form data to update the legislative item.
 * @returns The updated legislative item.
 * @throws {ApiError} if the request fails.
 */
export const updateLegislativeItem = async (itemId, args) => {
  const response = await fetchService.put(
    `/legal-watches/${itemId}`,
    JSON.stringify({
      name: args.title,
      case_number: args.caseNumber,
      summary: args.summary,
      innovation: args.innovation,
      effective_date: args.effectiveDate && formatDate(args.effectiveDate),
      nature_id: args.natureId,
      type: args.type,
      is_archived: args.isArchived,
      ...(!args.isArchived && {
        recipient_type: args.mail?.recipient,
        mail_object: args.mail?.subject,
        mail_content: args.mail?.content,
        mail_addresses: args.mail?.addresses,
      }),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the legislative item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.name,
    reference: item.reference,
    caseNumber: item.case_number,
    summary: item.summary,
    innovation: item.innovation,
    isArchived: item.is_archived,
    effectiveDate: new Date(item.effective_date),
    type: item.type,
    nature: {
      id: item.nature.id,
      title: item.nature.name,
    },
    mail: item.is_archived
      ? undefined
      : {
          recipient: item.recipient_type,
          subject: item.mail_object,
          content: item.mail_content,
          addresses: item.mail_addresses,
        },
  };
};
/**
 * Prints a legislative item.
 * @param itemId - The id of the legislative item.
 * @throws {ApiError} if the request fails.
 */
export const printLegislativeItem = async (itemId) => {
  const response = await fetchService.get(
    `/legal-watches/generate-pdf/${itemId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the legislative item");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "legislative_item.pdf";
  return {
    buffer,
    filename,
  };
};
