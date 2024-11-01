"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all attendants from the server.
 * @param meetingId - The id of the management committee.
 * @returns A promise that resolves to an array of attendants.
 * @throws {ApiError} if the request fails.
 */
export const getAllMeetingAttendants = async (meetingId) => {
  const response = await fetchService.get(
    `/list_attendance_management_committees?management_committee_id=${meetingId}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            name: item.name,
            grade: item.grade,
            type: item.type,
            isAttending: item.status,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((attendant) => attendant !== null);
  }
  throw new ApiError("Failed to fetch all attendants");
};
/**
 * Fetches one attendant from the server.
 * @param attendantId - The id of the attendant.
 * @returns A promise that resolves to the attendant.
 * @throws {ApiError} if the request fails.
 */
export const getOneMeetingAttendant = async (attendantId) => {
  const response = await fetchService.get(`/representants/${attendantId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      name: item.name,
      grade: item.grade,
      type: item.type,
      isAttending: item.status,
    };
  }
  throw new ApiError("Failed to fetch this attendant");
};
/**
 * Creates an attendant.
 * @param meetingId - The id of the management committee.
 * @param args - The form data to create the attendant.
 * @returns The created attendant.
 * @throws {ApiError} if the request fails.
 */
export const createMeetingAttendant = async (meetingId, args) => {
  const response = await fetchService.post(
    "/representants",
    JSON.stringify({
      meeting_id: meetingId,
      name: args.name,
      grade: args.grade,
      type: "management_committee",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the attendant");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    name: item.name,
    type: item.type,
    grade: item.grade,
    isAttending: item.status,
  };
};
/**
 * Updates an attendant.
 * @param attendantId - The id of the attendant.
 * @param args - The form data to update the attendant.
 * @returns The updated attendant.
 * @throws {ApiError} if the request fails.
 */
export const updateMeetingAttendant = async (attendantId, args) => {
  const response = await fetchService.put(
    `/representants/${attendantId}`,
    JSON.stringify({
      name: args.name,
      grade: args.grade,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the attendant");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    name: item.name,
    type: item.type,
    grade: item.grade,
    isAttending: item.status,
  };
};
/**
 * Updates the status of multiple attendants.
 * @param meetingId - The id of the management committee.
 * @param args - The form data to update the attendants.
 * @throws {ApiError} if the request fails.
 */
export const updateMeetingAttendantsStatus = async (meetingId, args) => {
  const response = await fetchService.post(
    "/update_attendance_management_committees",
    JSON.stringify({
      management_committee_id: meetingId,
      directors: args.attendants.map(({ id, type, isAttending }) => ({
        id,
        type,
        status: isAttending,
      })),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to toggle the attendant status");
  }
};
/**
 * Prints the list of attendants of a management committee.
 * @param meetingId - The id of the management committee.
 * @throws {ApiError} if the request fails.
 */
export const printMeetingAttendantsList = async (meetingId) => {
  const response = await fetchService.get(
    `/generate_pdf_attendance_management_committees?management_committee_id=${meetingId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the list of attendants");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "list.pdf";
  return {
    buffer,
    filename,
  };
};
/**
 * Deletes a attendant of type checklist.
 * @param attendantId
 * @throws {ApiError} if the request fails.
 */
export const deleteMeetingAttendant = async (attendantId) => {
  const response = await fetchService.delete(`/representants/${attendantId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the attendant");
  }
};
