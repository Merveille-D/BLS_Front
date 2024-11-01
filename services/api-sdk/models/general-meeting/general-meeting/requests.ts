"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all archived general meetings from the server.
 * @returns A promise that resolves to an array of general meetings.
 * @throws {ApiError} if the request fails.
 */
export const getArchivedGeneralMeetings = async () => {
  const response = await fetchService.get("/general_meetings?status=closed");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.libelle,
            reference: item.reference,
            meetingDate: new Date(item.meeting_date),
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
      .filter((generalMeeting) => generalMeeting !== null);
  }
  throw new ApiError("Failed to fetch archived general meetings");
};
/**
 * Fetches the current general meeting from the server.
 * @returns A promise that resolves to the current general meeting or null if there is none.
 * @throws {ApiError} if the request fails.
 */
export const getCurrentGeneralMeeting = async () => {
  const response = await fetchService.get("/general_meetings?status=pending");
  if (response.ok) {
    const data = await response.json();
    if (data.data.length === 0) return null;
    const item = data.data[0];
    return {
      id: item.id,
      title: item.libelle,
      reference: item.reference,
      meetingDate: new Date(item.meeting_date),
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
  throw new ApiError("Failed to fetch current general meeting");
};
/**
 * Fetches a general meeting by its id.
 * @param meetingId - The id of the general meeting to fetch.
 * @returns A promise that resolves to the general meeting.
 * @throws {ApiError} if the request fails.
 */
export const getOneGeneralMeeting = async (meetingId) => {
  const response = await fetchService.get(`/general_meetings/${meetingId}`);
  if (response.ok) {
    const data = await response.json();
    const item = data.data;
    return {
      id: item.id,
      title: item.libelle,
      reference: item.reference,
      meetingDate: new Date(item.meeting_date),
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
  throw new ApiError("Failed to fetch current general meeting");
};
/**
 * Creates a new general meeting.
 * @param args - The form data to create.
 * @returns The created general meeting.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const createGeneralMeeting = async (args) => {
  const response = await fetchService.post(
    "/general_meetings",
    JSON.stringify({
      libelle: args.title,
      meeting_date: formatDate(args.meetingDate),
      type: args.meetingType,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the general meeting");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    reference: item.reference,
    meetingDate: new Date(item.meeting_date),
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
 * Updates a general meeting.
 * @param meetingId - The id of the general meeting to update.
 * @param args - The form data to update.
 * @returns The updated general meeting.
 * @throws {ApiError} if the request fails.
 */
export const updateGeneralMeeting = async (meetingId, args) => {
  const response = await fetchService.put(
    `/general_meetings/${meetingId}`,
    JSON.stringify({
      libelle: args.title,
      meeting_date: args.meetingDate && formatDate(args.meetingDate),
      type: args.meetingType,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the general meeting");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    reference: item.reference,
    meetingDate: new Date(item.meeting_date),
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
export const addGeneralMeetingFile = async (meetingId, args) => {
  const uploadedFile = args.formData.get("file");
  if (!(uploadedFile instanceof File)) {
    throw new Error("No file provided");
  }
  const formData = new FormData();
  formData.set("general_meeting_id", meetingId);
  formData.set("files[0][file]", uploadedFile);
  formData.set("files[0][type]", args.fileType);
  const response = await fetchService.post(`/ag_attachements`, formData);
  if (!response.ok) {
    throw new ApiError("Failed to add the file to the general meeting");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    reference: item.reference,
    meetingDate: new Date(item.meeting_date),
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
export const printGeneralMeeting = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_fiche_suivi_ag?general_meeting_id=${meetingId}`,
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
export const printGeneralMeetingChecklist = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_checklist_and_procedures_ag?type=checklist&general_meeting_id=${meetingId}`,
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
export const printGeneralMeetingProcedures = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_checklist_and_procedures_ag?type=procedure&general_meeting_id=${meetingId}`,
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
