"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all archived management committees from the server.
 * @returns A promise that resolves to an array of management committees.
 * @throws {ApiError} if the request fails.
 */
export const getArchivedManagementCommittees = async () => {
  const response = await fetchService.get(
    "/management_committees?status=closed",
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
  throw new ApiError("Failed to fetch archived management committees");
};
/**
 * Fetches the current management committee from the server.
 * @returns A promise that resolves to the current management committee or null if there is none.
 * @throws {ApiError} if the request fails.
 */
export const getCurrentManagementCommittee = async () => {
  const response = await fetchService.get(
    "/management_committees?status=pending",
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
  throw new ApiError("Failed to fetch current management committee");
};
/**
 * Fetches a management committee by its id.
 * @param meetingId - The id of the management committee to fetch.
 * @returns A promise that resolves to the management committee.
 * @throws {ApiError} if the request fails.
 */
export const getOneManagementCommittee = async (meetingId) => {
  const response = await fetchService.get(
    `/management_committees/${meetingId}`,
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
  throw new ApiError("Failed to fetch current management committee");
};
/**
 * Creates a new management committee.
 * @param args - The form data to create.
 * @returns The created management committee.
 * @throws {ApiError} if the request fails.
 * @throws {InvalidResponseError} if the response is invalid.
 */
export const createManagementCommittee = async (args) => {
  const response = await fetchService.post(
    "/management_committees",
    JSON.stringify({
      libelle: args.title,
      session_date: formatDate(args.meetingDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the management committee");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    reference: item.reference,
    meetingDate: new Date(item.session_date),
    status: item.status,
    files:
      item.files?.map((file) => ({
        fileUrl: file.file_url,
        filename: file.filename,
        fileType: file.type,
      })) ?? [],
  };
};
/**
 * Updates a management committee.
 * @param meetingId - The id of the management committee to update.
 * @param args - The form data to update.
 * @returns The updated management committee.
 * @throws {ApiError} if the request fails.
 */
export const updateManagementCommittee = async (meetingId, args) => {
  const response = await fetchService.put(
    `/management_committees/${meetingId}`,
    JSON.stringify({
      libelle: args.title,
      session_date: args.meetingDate && formatDate(args.meetingDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the management committee");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    reference: item.reference,
    meetingDate: new Date(item.session_date),
    status: item.status,
    files:
      item.files?.map((file) => ({
        fileUrl: file.file_url,
        filename: file.filename,
        fileType: file.type,
      })) ?? [],
  };
};
export const addManagementCommitteeFile = async (meetingId, args) => {
  const uploadedFile = args.formData.get("file");
  if (!(uploadedFile instanceof File)) {
    throw new Error("No file provided");
  }
  const formData = new FormData();
  formData.set("management_committee_id", meetingId);
  formData.set("files[0][file]", uploadedFile);
  formData.set("files[0][type]", args.fileType);
  const response = await fetchService.post(`/cd_attachements`, formData);
  if (!response.ok) {
    throw new ApiError("Failed to add the file to the management committee");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    reference: item.reference,
    meetingDate: new Date(item.session_date),
    status: item.status,
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
export const printManagementCommittee = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_fiche_suivi_codir?management_committee_id=${meetingId}`,
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
export const printManagementCommitteeChecklist = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_checklist_and_procedures_codir?type=checklist&management_committee_id=${meetingId}`,
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
export const printManagementCommitteeProcedures = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_checklist_and_procedures_codir?type=procedure&management_committee_id=${meetingId}`,
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
