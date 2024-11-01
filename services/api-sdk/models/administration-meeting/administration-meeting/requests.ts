"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all archived administration meetings from the server.
 * @returns A promise that resolves to an array of administration meetings.
 * @throws {ApiError} if the request fails.
 */
export const getArchivedAdministrationMeetings = async () => {
  const response = await fetchService.get(
    "/session_administrators?status=closed",
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.libelle,
            reference: item.reference,
            meetingDate: new Date(item.session_date),
            status: item.status,
            meetingType: item.type,
            files:
              item.files?.map((file) => ({
                fileUrl: file.file_url,
                filename: file.filename,
                fileType: file.type,
              })) ?? [],
          };
        } catch (e) {
          return null;
        }
      })
      .filter((administrationMeeting) => administrationMeeting !== null);
  }
  throw new ApiError("Failed to fetch archived administration meetings");
};
/**
 * Fetches the current administration meeting from the server.
 * @returns A promise that resolves to the current administration meeting or null if there is none.
 * @throws {ApiError} if the request fails.
 */
export const getCurrentAdministrationMeeting = async () => {
  const response = await fetchService.get(
    "/session_administrators?status=pending",
  );
  if (response.ok) {
    const data = await response.json();
    if (data.data.length === 0) return null;
    const item = data.data[0];
    return {
      id: item.id,
      title: item.libelle,
      reference: item.reference,
      meetingDate: new Date(item.session_date),
      status: item.status,
      meetingType: item.type,
      files:
        item.files?.map((file) => ({
          fileUrl: file.file_url,
          filename: file.filename,
          fileType: file.type,
        })) ?? [],
      nextTask: item.next_task && {
        id: item.next_task.id,
        title: item.next_task.libelle,
        dueDate: new Date(item.next_task.deadline),
        assignee: item.next_task.responsible,
        supervisor: item.next_task.supervisor,
      },
    };
  }
  throw new ApiError("Failed to fetch current administration meeting");
};
/**
 * Fetches a administration meeting by its id.
 * @param meetingId - The id of the administration meeting to fetch.
 * @returns A promise that resolves to the administration meeting.
 * @throws {ApiError} if the request fails.
 */
export const getOneAdministrationMeeting = async (meetingId) => {
  const response = await fetchService.get(
    `/session_administrators/${meetingId}`,
  );
  if (response.ok) {
    const data = await response.json();
    const item = data.data;
    return {
      id: item.id,
      title: item.libelle,
      reference: item.reference,
      meetingDate: new Date(item.session_date),
      status: item.status,
      meetingType: item.type,
      files:
        item.files?.map((file) => ({
          fileUrl: file.file_url,
          filename: file.filename,
          fileType: file.type,
        })) ?? [],
      nextTask: item.next_task && {
        id: item.next_task.id,
        title: item.next_task.libelle,
        dueDate: new Date(item.next_task.deadline),
        assignee: item.next_task.responsible,
        supervisor: item.next_task.supervisor,
      },
    };
  }
  throw new ApiError("Failed to fetch current administration meeting");
};
/**
 * Creates a new administration meeting.
 * @param args - The form data to create.
 * @returns The created administration meeting.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const createAdministrationMeeting = async (args) => {
  const response = await fetchService.post(
    "/session_administrators",
    JSON.stringify({
      libelle: args.title,
      session_date: formatDate(args.meetingDate),
      type: args.meetingType,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the administration meeting");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    reference: item.reference,
    meetingDate: new Date(item.session_date),
    status: item.status,
    meetingType: item.type,
    files:
      item.files?.map((file) => ({
        fileUrl: file.file_url,
        filename: file.filename,
        fileType: file.type,
      })) ?? [],
  };
};
/**
 * Updates a administration meeting.
 * @param meetingId - The id of the administration meeting to update.
 * @param args - The form data to update.
 * @returns The updated administration meeting.
 * @throws {ApiError} if the request fails.
 */
export const updateAdministrationMeeting = async (meetingId, args) => {
  const response = await fetchService.put(
    `/session_administrators/${meetingId}`,
    JSON.stringify({
      libelle: args.title,
      session_date: args.meetingDate && formatDate(args.meetingDate),
      type: args.meetingType,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the administration meeting");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    reference: item.reference,
    meetingDate: new Date(item.session_date),
    status: item.status,
    meetingType: item.type,
    files:
      item.files?.map((file) => ({
        fileUrl: file.file_url,
        filename: file.filename,
        fileType: file.type,
      })) ?? [],
  };
};
export const addAdministrationMeetingFile = async (meetingId, args) => {
  const uploadedFile = args.formData.get("file");
  if (!(uploadedFile instanceof File)) {
    throw new Error("No file provided");
  }
  const formData = new FormData();
  formData.set("session_administrator_id", meetingId);
  formData.set("files[0][file]", uploadedFile);
  formData.set("files[0][type]", args.fileType);
  const response = await fetchService.post(`/ca_attachements`, formData);
  if (!response.ok) {
    throw new ApiError("Failed to add the file to the administration meeting");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    reference: item.reference,
    meetingDate: new Date(item.session_date),
    status: item.status,
    meetingType: item.type,
    files:
      item.files?.map((file) => ({
        fileUrl: file.file_url,
        filename: file.filename,
        fileType: file.type,
      })) ?? [],
  };
};
/**
 * Prints a meeting.
 * @param meetingId - The id of the meeting.
 * @throws {ApiError} if the request fails.
 */
export const printAdministrationMeeting = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_fiche_suivi_ca?session_administrator_id=${meetingId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the meeting");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "meeting.pdf";
  return {
    buffer,
    filename,
  };
};
/**
 * Prints a meeting checklist.
 * @param meetingId - The id of the meeting.
 * @throws {ApiError} if the request fails.
 */
export const printAdministrationMeetingChecklist = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_checklist_and_procedures_ca?type=checklist&session_administrator_id=${meetingId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the meeting checklist");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "checklist.pdf";
  return {
    buffer,
    filename,
  };
};
/**
 * Prints a meeting procedures.
 * @param meetingId - The id of the meeting.
 * @throws {ApiError} if the request fails.
 */
export const printAdministrationMeetingProcedures = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_checklist_and_procedures_ca?type=procedure&session_administrator_id=${meetingId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the meeting procedures");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "procedures.pdf";
  return {
    buffer,
    filename,
  };
};
