"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all litigation tasks from the server.
 * @param litigationId - The id of the step.
 * @returns A promise that resolves to an array of litigation tasks.
 * @throws {ApiError} if the request fails.
 */
export const getAllLitigationTasks = async (litigationId) => {
  const response = await fetchService.get(
    `/litigation/tasks?id=${litigationId}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            litigationId: item.model_id,
            completed: item.status,
            type: item.type,
            createdBy: item.created_by,
            minDueDate: item.min_deadline
              ? new Date(item.min_deadline)
              : undefined,
            maxDueDate: item.max_deadline
              ? new Date(item.max_deadline)
              : undefined,
            form: item.form && {
              title: item.form.form_title,
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
      .filter((step) => step !== null);
  }
  throw new ApiError("Failed to fetch all litigation tasks");
};
/**
 * Fetches one litigation task from the server.
 * @param taskId - The id of the litigation task.
 * @returns A promise that resolves to the litigation task.
 * @throws {ApiError} if the request fails.
 */
export const getOneLitigationTask = async (taskId) => {
  const response = await fetchService.get(`/litigation/tasks/${taskId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      litigationId: item.model_id,
      completed: item.status,
      type: item.type,
      createdBy: item.created_by,
      minDueDate: item.min_deadline ? new Date(item.min_deadline) : undefined,
      maxDueDate: item.max_deadline ? new Date(item.max_deadline) : undefined,
      form: item.form && {
        title: item.form.form_title,
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
  throw new ApiError("Failed to fetch this litigation task");
};
/**
 * Creates a litigation task.
 * @param litigationId - The id of the movable safety.
 * @param args - The form data to create the litigation task.
 * @returns The created litigation task.
 * @throws {ApiError} if the request fails.
 */
export const createLitigationTask = async (litigationId, args) => {
  const response = await fetchService.post(
    "/litigation/tasks",
    JSON.stringify({
      model_id: litigationId,
      title: args.title,
      deadline: formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the litigation task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    litigationId: item.model_id,
    completed: item.status,
    type: item.type,
    createdBy: item.created_by,
    minDueDate: item.min_deadline ? new Date(item.min_deadline) : undefined,
    maxDueDate: item.max_deadline ? new Date(item.max_deadline) : undefined,
    form: item.form && {
      title: item.form.form_title,
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
};
/**
 * Updates a litigation task.
 * @param taskId - The id of the litigation task.
 * @param args - The form data to update the litigation task.
 * @returns The updated litigation task.
 * @throws {ApiError} if the request fails.
 */
export const updateLitigationTask = async (taskId, args) => {
  const response = await fetchService.put(
    `/litigation/tasks/${taskId}`,
    JSON.stringify({
      title: args.title,
      deadline: args.dueDate && formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the litigation task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    litigationId: item.model_id,
    completed: item.status,
    type: item.type,
    createdBy: item.created_by,
    minDueDate: item.min_deadline ? new Date(item.min_deadline) : undefined,
    maxDueDate: item.max_deadline ? new Date(item.max_deadline) : undefined,
    form: item.form && {
      title: item.form.form_title,
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
};
/**
 * Completes a litigation task on the server.
 * @param taskId - The id of the litigation task
 * @param data - The data to complete the litigation task.
 * @returns A promise that resolves to the completed litigation task.
 * @throws {ApiError} if the request fails.
 */
export const completeLitigationTask = async (taskId, data) => {
  const formData = new FormData();
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        formData.append(key, String(value));
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
  }
  const response = await fetchService.post(
    `/litigation/tasks/complete/${taskId}`,
    data ? formData : undefined,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      litigationId: item.model_id,
      completed: item.status,
      type: item.type,
      createdBy: item.created_by,
      minDueDate: item.min_deadline ? new Date(item.min_deadline) : undefined,
      maxDueDate: item.max_deadline ? new Date(item.max_deadline) : undefined,
      form: item.form && {
        title: item.form.form_title,
        fields: item.form.fields.map((field) => ({
          type: field.type,
          name: field.name,
          label: field.label,
        })),
      },
    };
  }
  throw new ApiError("Failed to complete this litigation task");
};
/**
 * Forwards a litigation task.
 * @param taskId - The id of the litigation task.
 * @param args - The form data to forward the litigation task.
 * @returns The forwarded litigation task.
 * @throws {ApiError} if the request fails.
 */
export const forwardLitigationTask = async (taskId, args) => {
  const response = await fetchService.put(
    `/litigation/tasks/transfer/${taskId}`,
    JSON.stringify({
      forward_title: args.title,
      deadline_transfer: formatDate(args.dueDate),
      description: args.description,
      collaborators: [args.receiverId],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to forward the litigation task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    litigationId: item.model_id,
    completed: item.status,
    type: item.type,
    createdBy: item.created_by,
    minDueDate: item.min_deadline ? new Date(item.min_deadline) : undefined,
    maxDueDate: item.max_deadline ? new Date(item.max_deadline) : undefined,
    form: item.form && {
      title: item.form.form_title,
      fields: item.form.fields.map((field) => ({
        type: field.type,
        name: field.name,
        label: field.label,
      })),
    },
  };
};
/**
 * Deletes a litigation task.
 * @param taskId - The id of the litigation task.
 * @throws {ApiError} if the request fails.
 */
export const deleteLitigationTask = async (taskId) => {
  const response = await fetchService.delete(`/litigation/tasks/${taskId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the litigation task");
  }
};
