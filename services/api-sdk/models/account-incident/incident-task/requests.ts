"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all incident tasks from the server.
 * @param incidentId - The id of the task.
 * @returns A promise that resolves to an array of incident tasks.
 * @throws {ApiError} if the request fails.
 */
export const getAllIncidentTasks = async (incidentId) => {
  const response = await fetchService.get(
    `/task_incidents?incident_id=${incidentId}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            incidentId: item.incident_id,
            dueDate: item.deadline ? new Date(item.deadline) : undefined,
            completed: item.status,
            createdBy: item.created_by,
            form: {
              title: item.form.form_title,
              code: item.code,
              fields: item.form.fields.map((field) => ({
                type: field.type,
                name: field.name,
                label: field.label,
              })),
            },
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
      .filter((task) => task !== null);
  }
  throw new ApiError("Failed to fetch all incident tasks");
};
/**
 * Fetches one incident task from the server.
 * @param taskId - The id of the incident task.
 * @returns A promise that resolves to the incident task.
 * @throws {ApiError} if the request fails.
 */
export const getOneIncidentTask = async (taskId) => {
  const response = await fetchService.get(`/task_incidents/${taskId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      incidentId: item.incident_id,
      dueDate: item.deadline ? new Date(item.deadline) : undefined,
      completed: item.status,
      createdBy: item.created_by,
      form: {
        title: item.form.form_title,
        code: item.code,
        fields: item.form.fields.map((field) => ({
          type: field.type,
          name: field.name,
          label: field.label,
        })),
      },
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
  throw new ApiError("Failed to fetch this incident task");
};
/**
 * Completes an incident task on the server.
 * @param taskId - The id of the incident task.
 * @param data - The data to complete the incident task.
 * @returns A promise that resolves to the completed incident task.
 * @throws {ApiError} if the request fails.
 */
export const completeIncidentTask = async (taskId, data) => {
  const formData = new FormData();
  formData.append("task_incident_id", taskId);
  formData.append("status", "1");
  formData.append("type", data.type);
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string") {
      formData.append(key, value);
    } else if (value instanceof Date) {
      formData.append(key, formatDate(value));
    } else {
      value.getAll(`${key}[files]`).forEach((file, index) => {
        formData.append(`${key}[${index}][file]`, file);
      });
      value.getAll(`${key}[names]`).forEach((name, index) => {
        formData.append(`${key}[${index}][name]`, name);
      });
    }
  });
  const response = await fetchService.post(
    "/complete_task_incidents",
    formData,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      incidentId: item.incident_id,
      dueDate: item.deadline ? new Date(item.deadline) : undefined,
      completed: item.status,
      createdBy: item.created_by,
      form: {
        title: item.form.form_title,
        code: item.code,
        fields: item.form.fields.map((field) => ({
          type: field.type,
          name: field.name,
          label: field.label,
        })),
      },
    };
  }
  console.log(await response.text());
  throw new ApiError("Failed to complete this incident task");
};
/**
 * Forwards an incident task.
 * @param taskId - The id of the incident task.
 * @param args - The form data to forward the incident task.
 * @returns The forwarded incident task.
 * @throws {ApiError} if the request fails.
 */
export const forwardIncidentTask = async (taskId, args) => {
  const response = await fetchService.post(
    `/complete_task_incidents?task_incident_id=${taskId}`,
    JSON.stringify({
      forward_title: args.title,
      deadline_transfer: formatDate(args.dueDate),
      description: args.description,
      collaborators: [args.receiverId],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to forward the incident task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    incidentId: item.incident_id,
    dueDate: item.deadline ? new Date(item.deadline) : undefined,
    completed: item.status,
    createdBy: item.created_by,
    form: {
      title: item.form.form_title,
      code: item.code,
      fields: item.form.fields.map((field) => ({
        type: field.type,
        name: field.name,
        label: field.label,
      })),
    },
  };
};
