"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all meeting tasks from the server.
 * @param meetingId - The id of the administration meeting.
 * @returns A promise that resolves to an array of meeting tasks.
 * @throws {ApiError} if the request fails.
 */
export const getAllMeetingTasks = async (meetingId) => {
  const response = await fetchService.get(
    `/task_management_committees?management_committee_id=${meetingId}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.libelle,
            dueDate: new Date(item.deadline),
            completed: item.status,
            assignee: item.responsible ?? undefined,
            supervisor: item.supervisor ?? undefined,
            meetingId: item.management_committee_id,
            createdBy: item.created_by,
            forwards: item.transfers?.map((transfer) => ({
              id: transfer.id,
              title: transfer.title,
              dueDate: new Date(transfer.deadline),
              description: transfer.description,
              sender: {
                id: transfer.sender.id,
                firstname: transfer.sender.firstname,
                lastname: transfer.sender.lastname,
                email: transfer.sender.email,
              },
              receiver: {
                id: transfer.collaborators[0].id,
                firstname: transfer.collaborators[0].firstname,
                lastname: transfer.collaborators[0].lastname,
                email: transfer.collaborators[0].email,
              },
            })),
          };
        } catch (e) {
          return null;
        }
      })
      .filter((task) => task !== null)
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }
  throw new ApiError("Failed to fetch all meeting tasks");
};
/**
 * Fetches one meeting task from the server.
 * @param taskId - The id of the meeting task.
 * @returns A promise that resolves to the meeting task.
 * @throws {ApiError} if the request fails.
 */
export const getOneMeetingTask = async (taskId) => {
  const response = await fetchService.get(
    `/task_management_committees/${taskId}`,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.libelle,
      dueDate: new Date(item.deadline),
      completed: item.status,
      assignee: item.responsible ?? undefined,
      supervisor: item.supervisor ?? undefined,
      meetingId: item.management_committee_id,
      createdBy: item.created_by,
      forwards: item.transfers?.map((transfer) => ({
        id: transfer.id,
        title: transfer.title,
        dueDate: new Date(transfer.deadline),
        description: transfer.description,
        sender: {
          id: transfer.sender.id,
          firstname: transfer.sender.firstname,
          lastname: transfer.sender.lastname,
          email: transfer.sender.email,
        },
        receiver: {
          id: transfer.collaborators[0].id,
          firstname: transfer.collaborators[0].firstname,
          lastname: transfer.collaborators[0].lastname,
          email: transfer.collaborators[0].email,
        },
      })),
    };
  }
  throw new ApiError("Failed to fetch this meeting task");
};
/**
 * Creates a meeting task.
 * @param meetingId - The id of the administration meeting.
 * @param args - The form data to create the meeting task.
 * @returns The created meeting task.
 * @throws {ApiError} if the request fails.
 */
export const createMeetingTask = async (meetingId, args) => {
  const response = await fetchService.post(
    "/task_management_committees",
    JSON.stringify({
      management_committee_id: meetingId,
      libelle: args.title,
      deadline: formatDate(args.dueDate),
      responsible: args.assignee,
      supervisor: args.supervisor,
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
    dueDate: new Date(item.deadline),
    completed: item.status,
    assignee: item.responsible ?? undefined,
    supervisor: item.supervisor ?? undefined,
    meetingId: item.management_committee_id,
    createdBy: item.created_by,
  };
};
/**
 * Updates a meeting task.
 * @param taskId - The id of the meeting task.
 * @param args - The form data to update the meeting task.
 * @returns The updated meeting task.
 * @throws {ApiError} if the request fails.
 */
export const updateMeetingTask = async (taskId, args) => {
  const response = await fetchService.put(
    `/task_management_committees/${taskId}`,
    JSON.stringify({
      libelle: args.title,
      deadline: args.dueDate && formatDate(args.dueDate),
      responsible: args.assignee ?? undefined,
      supervisor: args.supervisor ?? undefined,
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
    dueDate: new Date(item.deadline),
    completed: item.status,
    assignee: item.responsible ?? undefined,
    supervisor: item.supervisor ?? undefined,
    meetingId: item.management_committee_id,
    createdBy: item.created_by,
  };
};
/**
 * Marks a meeting task as completed.
 * @param taskId - The id of the meeting task.
 * @returns The updated meeting task.
 * @throws {ApiError} if the request fails.
 */
export const markMeetingTaskAsCompleted = async (taskId) => {
  const response = await fetchService.put(
    `/task_management_committees/${taskId}`,
    JSON.stringify({
      status: true,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to mark the meeting task as completed");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    dueDate: new Date(item.deadline),
    completed: item.status,
    assignee: item.responsible ?? undefined,
    supervisor: item.supervisor ?? undefined,
    meetingId: item.management_committee_id,
    createdBy: item.created_by,
  };
};
/**
 * Forwards a meeting task.
 * @param taskId - The id of the meeting task.
 * @param args - The form data to forward the meeting task.
 * @returns The forwarded meeting task.
 * @throws {ApiError} if the request fails.
 */
export const forwardMeetingTask = async (taskId, args) => {
  const response = await fetchService.put(
    `/task_management_committees/${taskId}`,
    JSON.stringify({
      forward_title: args.title,
      deadline_transfer: formatDate(args.dueDate),
      description: args.description,
      collaborators: [args.receiverId],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to forward the meeting task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    dueDate: new Date(item.deadline),
    completed: item.status,
    assignee: item.responsible ?? undefined,
    supervisor: item.supervisor ?? undefined,
    meetingId: item.management_committee_id,
    createdBy: item.created_by,
  };
};
/**
 * Deletes a meeting task.
 * @param taskId - The id of the meeting task.
 * @throws {ApiError} if the request fails.
 */
export const deleteMeetingTask = async (taskId) => {
  const response = await fetchService.delete(
    `/task_management_committees/${taskId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to delete the meeting task");
  }
};
