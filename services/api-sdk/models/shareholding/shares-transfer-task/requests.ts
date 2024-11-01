"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all transfer tasks from the server.
 * @param transferId - The id of the task.
 * @returns A promise that resolves to an array of transfer tasks.
 * @throws {ApiError} if the request fails.
 */
export const getAllSharesTransferTasks = async (transferId) => {
  const response = await fetchService.get(
    `/task_action_transfers?action_transfer_id=${transferId}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            createdBy: item.created_by,
            transferId: item.action_transfer_id,
            dueDate: item.deadline ? new Date(item.deadline) : undefined,
            completed: item.status,
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
  throw new ApiError("Failed to fetch all transfer tasks");
};
/**
 * Fetches one transfer task from the server.
 * @param taskId - The id of the transfer task.
 * @returns A promise that resolves to the transfer task.
 * @throws {ApiError} if the request fails.
 */
export const getOneSharesTransferTask = async (taskId) => {
  const response = await fetchService.get(`/task_action_transfers/${taskId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      createdBy: item.created_by,
      transferId: item.action_transfer_id,
      dueDate: item.deadline ? new Date(item.deadline) : undefined,
      completed: item.status,
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
  throw new ApiError("Failed to fetch this transfer task");
};
/**
 * Completes an transfer task on the server.
 * @param taskId - The id of the transfer task.
 * @param data - The data to complete the transfer task.
 * @returns A promise that resolves to the completed transfer task.
 * @throws {ApiError} if the request fails.
 */
export const completeSharesTransferTask = async (taskId, data) => {
  const formData = new FormData();
  formData.append("task_action_transfer_id", taskId);
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
    "/complete_task_action_transfers",
    formData,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      createdBy: item.created_by,
      transferId: item.action_transfer_id,
      dueDate: item.deadline ? new Date(item.deadline) : undefined,
      completed: item.status,
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
  throw new ApiError("Failed to complete this transfer task");
};
/**
 * Forwards a transfer task.
 * @param taskId - The id of the transfer task.
 * @param args - The form data to forward the transfer task.
 * @returns The forwarded transfer task.
 * @throws {ApiError} if the request fails.
 */
export const forwardSharesTransferTask = async (taskId, args) => {
  const response = await fetchService.post(
    `/complete_task_action_transfers?task_action_transfer_id=${taskId}`,
    JSON.stringify({
      forward_title: args.title,
      deadline_transfer: formatDate(args.dueDate),
      description: args.description,
      collaborators: [args.receiverId],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to forward the transfer task");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    createdBy: item.created_by,
    transferId: item.action_transfer_id,
    dueDate: item.deadline ? new Date(item.deadline) : undefined,
    completed: item.status,
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
