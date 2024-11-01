"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all recovery steps from the server.
 * @param recoveryId - The id of the step.
 * @returns A promise that resolves to an array of recovery steps.
 * @throws {ApiError} if the request fails.
 */
export const getAllRecoverySteps = async (recoveryId) => {
  const response = await fetchService.get(`/recovery/tasks?id=${recoveryId}`);
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            recoveryId: item.model_id,
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
  throw new ApiError("Failed to fetch all recovery steps");
};
/**
 * Fetches one recovery step from the server.
 * @param stepId - The id of the recovery step.
 * @returns A promise that resolves to the recovery step.
 * @throws {ApiError} if the request fails.
 */
export const getOneRecoveryStep = async (stepId) => {
  const response = await fetchService.get(`/recovery/tasks/${stepId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      recoveryId: item.model_id,
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
  throw new ApiError("Failed to fetch this recovery step");
};
/**
 * Creates a recovery step.
 * @param recoveryId - The id of the recovery.
 * @param args - The form data to create the recovery step.
 * @returns The created recovery step.
 * @throws {ApiError} if the request fails.
 */
export const createRecoveryStep = async (recoveryId, args) => {
  const response = await fetchService.post(
    "/recovery/tasks",
    JSON.stringify({
      model_id: recoveryId,
      title: args.title,
      deadline: formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the recovery step");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    recoveryId: item.model_id,
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
 * Updates a recovery step.
 * @param stepId - The id of the recovery step.
 * @param args - The form data to update the recovery step.
 * @returns The updated recovery step.
 * @throws {ApiError} if the request fails.
 */
export const updateRecoveryStep = async (stepId, args) => {
  const response = await fetchService.put(
    `/recovery/tasks/${stepId}`,
    JSON.stringify({
      title: args.title,
      deadline: args.dueDate && formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the recovery step");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    recoveryId: item.model_id,
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
 * Completes a recovery step on the server.
 * @param stepId - The id of the recovery step
 * @param data - The data to complete the recovery step.
 * @returns A promise that resolves to the completed recovery step.
 * @throws {ApiError} if the request fails.
 */
export const completeRecoveryStep = async (stepId, data) => {
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
    `/recovery/tasks/complete/${stepId}`,
    data ? formData : undefined,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      recoveryId: item.model_id,
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
  throw new ApiError("Failed to complete this recovery step");
};
/**
 * Forwards a recovery step.
 * @param stepId - The id of the recovery step.
 * @param args - The form data to forward the recovery step.
 * @returns The forwarded recovery step.
 * @throws {ApiError} if the request fails.
 */
export const forwardRecoveryStep = async (stepId, args) => {
  const response = await fetchService.put(
    `/recovery/tasks/transfer/${stepId}`,
    JSON.stringify({
      forward_title: args.title,
      deadline_transfer: formatDate(args.dueDate),
      description: args.description,
      collaborators: [args.receiverId],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to forward the recovery step");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    recoveryId: item.model_id,
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
 * Deletes a recovery step.
 * @param stepId - The id of the recovery step.
 * @throws {ApiError} if the request fails.
 */
export const deleteRecoveryStep = async (stepId) => {
  const response = await fetchService.delete(`/recovery/tasks/${stepId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the recovery step");
  }
};
