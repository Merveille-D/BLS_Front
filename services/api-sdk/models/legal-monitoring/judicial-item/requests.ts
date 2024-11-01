"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all judicial items from the server.
 * @returns A promise that resolves to the judicial items.
 * @throws {ApiError} if the request fails.
 */
export const getAllJudicialItems = async () => {
  const response = await fetchService.get("/legal-watches?type=legal");
  if (response.ok) {
    const { data: items } = await response.json();
    return items
      .map((item) => {
        try {
          return {
            id: item.id,
            reference: item.reference,
            title: item.name,
            summary: item.summary,
            innovation: item.innovation,
            isArchived: item.is_archived,
            eventDate: new Date(item.event_date),
            jurisdiction: {
              id: item.jurisdiction.id,
              title: item.jurisdiction.name,
            },
            jurisdictionLocation: item.jurisdiction_location,
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
  throw new ApiError("Failed to fetch judicial items");
};
/**
 * Fetches a single judicial item from the server.
 * @param itemId - The ID of the judicial item to fetch.
 * @returns A promise that resolves to the judicial item.
 * @throws {ApiError} if the request fails.
 */
export const getOneJudicialItem = async (itemId) => {
  const response = await fetchService.get(`/legal-watches/${itemId}`);
  if (!response.ok) {
    throw new ApiError("Failed to fetch the judicial item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    reference: item.reference,
    title: item.name,
    summary: item.summary,
    innovation: item.innovation,
    isArchived: item.is_archived,
    eventDate: new Date(item.event_date),
    jurisdiction: {
      id: item.jurisdiction.id,
      title: item.jurisdiction.name,
    },
    jurisdictionLocation: item.jurisdiction_location,
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
 * Creates a judicial item.
 * @param args - The form data to create the judicial item.
 * @returns The created judicial item.
 * @throws {ApiError} if the request fails.
 */
export const createJudicialItem = async (args) => {
  const response = await fetchService.post(
    "/legal-watches",
    JSON.stringify({
      name: args.title,
      summary: args.summary,
      innovation: args.innovation,
      event_date: formatDate(args.eventDate),
      jurisdiction_id: args.jurisdictionId,
      jurisdiction_location: args.jurisdictionLocation,
      type: "legal",
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
    throw new ApiError("Failed to create the judicial item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    reference: item.reference,
    title: item.name,
    summary: item.summary,
    innovation: item.innovation,
    isArchived: item.is_archived,
    eventDate: new Date(item.event_date),
    jurisdiction: {
      id: item.jurisdiction.id,
      title: item.jurisdiction.name,
    },
    jurisdictionLocation: item.jurisdiction_location,
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
 * Updates a judicial item.
 * @param itemId - The ID of the judicial item to update.
 * @param args - The form data to update the judicial item.
 * @returns The updated judicial item.
 * @throws {ApiError} if the request fails.
 */
export const updateJudicialItem = async (itemId, args) => {
  const response = await fetchService.put(
    `/legal-watches/${itemId}`,
    JSON.stringify({
      name: args.title,
      summary: args.summary,
      innovation: args.innovation,
      event_date: args.eventDate && formatDate(args.eventDate),
      jurisdiction_id: args.jurisdictionId,
      jurisdiction_location: args.jurisdictionLocation,
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
    throw new ApiError("Failed to update the judicial item");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    reference: item.reference,
    title: item.name,
    summary: item.summary,
    innovation: item.innovation,
    isArchived: item.is_archived,
    eventDate: new Date(item.event_date),
    jurisdiction: {
      id: item.jurisdiction.id,
      title: item.jurisdiction.name,
    },
    jurisdictionLocation: item.jurisdiction_location,
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
 * Prints a judicial item.
 * @param itemId - The id of the judicial item.
 * @throws {ApiError} if the request fails.
 */
export const printJudicialItem = async (itemId) => {
  const response = await fetchService.get(
    `/legal-watches/generate-pdf/${itemId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the judicial item");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "judicial_item.pdf";
  return {
    buffer,
    filename,
  };
};
