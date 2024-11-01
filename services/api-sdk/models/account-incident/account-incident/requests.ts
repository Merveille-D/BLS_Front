"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all incidents from the server.
 * @returns A promise that resolves to an array of incidents.
 * @throws {ApiError} if the request fails.
 */
export const getAllAccountIncidents = async () => {
  const response = await fetchService.get(`/incidents`);
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            reference: item.reference,
            dateReceived: new Date(item.date_received),
            completed: item.status,
            isClient: item.client,
            category: item.category,
            author: {
              id: item.author_incident.id,
              name: item.author_incident.name,
              email: item.author_incident.email,
              phone: item.author_incident.telephone,
            },
            currentTask: item.current_task && {
              id: item.current_task.id,
              title: item.current_task.title,
              code: item.current_task.code,
            },
            files:
              item.files?.map((file) => ({
                fileUrl: file.file_url,
                filename: file.filename,
              })) || [],
          };
        } catch (e) {
          return null;
        }
      })
      .filter((incident) => incident !== null);
  }
  throw new ApiError("Failed to fetch all incidents");
};
/**
 * Fetches one incident from the server.
 * @param incidentId - The id of the incident.
 * @returns A promise that resolves to the incident.
 * @throws {ApiError} if the request fails.
 */
export const getOneAccountIncident = async (incidentId) => {
  const response = await fetchService.get(`/incidents/${incidentId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      reference: item.reference,
      dateReceived: new Date(item.date_received),
      completed: item.status,
      isClient: item.client,
      category: item.category,
      author: {
        id: item.author_incident.id,
        name: item.author_incident.name,
        email: item.author_incident.email,
        phone: item.author_incident.telephone,
      },
      currentTask: item.current_task && {
        id: item.current_task.id,
        title: item.current_task.title,
        code: item.current_task.code,
      },
      files:
        item.files?.map((file) => ({
          fileUrl: file.file_url,
          filename: file.filename,
        })) || [],
    };
  }
  throw new ApiError("Failed to fetch this incident");
};
/**
 * Creates a incident.
 * @param args - The form data to create the incident.
 * @returns The created incident.
 * @throws {ApiError} if the request fails.
 */
export const createAccountIncident = async (args) => {
  const response = await fetchService.post(
    "/incidents",
    JSON.stringify({
      title: args.title,
      date_received: formatDate(args.dateReceived),
      client: args.isClient,
      type: args.category,
      author_incident_id: args.author,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the incident");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    reference: item.reference,
    dateReceived: new Date(item.date_received),
    completed: item.status,
    isClient: item.client,
    category: item.category,
    author: {
      id: item.author_incident.id,
      name: item.author_incident.name,
      email: item.author_incident.email,
      phone: item.author_incident.telephone,
    },
    currentTask: item.current_task && {
      id: item.current_task.id,
      title: item.current_task.title,
      code: item.current_task.code,
    },
    files:
      item.files?.map((file) => ({
        fileUrl: file.file_url,
        filename: file.filename,
      })) || [],
  };
};
/**
 * Prints an account incident.
 * @param incidentId - The id of the incident.
 * @throws {ApiError} if the request fails.
 */
export const printAccountIncident = async (incidentId) => {
  const response = await fetchService.get(
    `/generate_pdf_fiche_suivi_incident?incident_id=${incidentId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the incident");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "incident.pdf";
  return {
    buffer,
    filename,
  };
};
