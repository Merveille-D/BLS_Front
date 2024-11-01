"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all meeting tasks of type checklist from the server.
 * @param meetingId - The id of the general meeting.
 * @returns A promise that resolves to an array of meeting tasks.
 * @throws {ApiError} if the request fails.
 */
export const getAllMeetingChecklistTasks = async (meetingId) => {
  const response = await fetchService.get(
    `/task_general_meetings?general_meeting_id=${meetingId}&type=checklist`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.libelle,
            completed: item.status,
          };
        } catch (e) {
          return null;
        }
      })
      .filter((task) => task !== null);
  }
  throw new ApiError("Failed to fetch all meeting tasks");
};
/**
 * Fetches one meeting task of type checklist from the server.
 * @param taskId - The id of the meeting task.
 * @returns A promise that resolves to the meeting task.
 * @throws {ApiError} if the request fails.
 */
export const getOneMeetingChecklistTask = async (taskId) => {
  const response = await fetchService.get(`/task_general_meetings/${taskId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.libelle,
      completed: item.status,
    };
  }
  throw new ApiError("Failed to fetch this meeting task");
};
/**
 * Creates a meeting task of type checklist.
 * @param meetingId - The id of the general meeting.
 * @param args - The form data to create the meeting task.
 * @returns The created meeting task.
 * @throws {ApiError} if the request fails.
 */
export const createMeetingChecklistTask = async (meetingId, args) => {
  const response = await fetchService.post(
    "/task_general_meetings",
    JSON.stringify({
      general_meeting_id: meetingId,
      libelle: args.title,
      type: "checklist",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the meeting task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    completed: item.status,
  };
};
/**
 * Updates a meeting task of type checklist.
 * @param taskId - The id of the meeting task.
 * @param args - The form data to update the meeting task.
 * @returns The updated meeting task.
 * @throws {ApiError} if the request fails.
 */
export const updateMeetingChecklistTask = async (taskId, args) => {
  const response = await fetchService.put(
    `/task_general_meetings/${taskId}`,
    JSON.stringify({
      libelle: args.title,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the meeting task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    completed: item.status,
  };
};
export const updateMeetingChecklistTaskStatus = async (taskId, args) => {
  const response = await fetchService.put(
    `/task_general_meetings/${taskId}`,
    JSON.stringify({
      status: args.completed,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to toggle the meeting task status");
  }
};
/**
 * Toggles the status of multiple meeting tasks of type checklist.
 * @param tasks - The list of meeting tasks to toggle.
 * @throws {ApiError} if the request fails.
 */
export const toggleMeetingChecklistTasksStatus = async (tasks) => {
  const response = await fetchService.put(
    "/update_status_task_general_meetings",
    JSON.stringify({
      tasks: tasks.map(({ id, completed }) => ({
        id,
        status: completed,
      })),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to toggle the meeting task status");
  }
};
/**
 * Deletes a meeting task of type checklist.
 * @param taskId
 * @throws {ApiError} if the request fails.
 */
export const deleteMeetingChecklistTask = async (taskId) => {
  const response = await fetchService.delete(
    `/task_general_meetings/${taskId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to delete the meeting task");
  }
};
