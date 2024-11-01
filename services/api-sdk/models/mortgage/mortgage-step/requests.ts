"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all mortgage steps from the server.
 * @param mortgageId - The id of the step.
 * @returns A promise that resolves to an array of mortgage steps.
 * @throws {ApiError} if the request fails.
 */
export const getAllMortgageSteps = async (mortgageId) => {
  const response = await fetchService.get(`/guarantees/tasks?id=${mortgageId}`);
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            mortgageId: item.model_id,
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
  throw new ApiError("Failed to fetch all mortgage steps");
};
/**
 * Fetches one mortgage step from the server.
 * @param stepId - The id of the mortgage step.
 * @returns A promise that resolves to the mortgage step.
 * @throws {ApiError} if the request fails.
 */
export const getOneMortgageStep = async (stepId) => {
  const response = await fetchService.get(`/guarantees/tasks/${stepId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      mortgageId: item.model_id,
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
  throw new ApiError("Failed to fetch this mortgage step");
};
/**
 * Creates a mortgage step.
 * @param mortgageId - The id of the mortgage.
 * @param args - The form data to create the mortgage step.
 * @returns The created mortgage step.
 * @throws {ApiError} if the request fails.
 */
export const createMortgageStep = async (mortgageId, args) => {
  const response = await fetchService.post(
    "/guarantees/tasks",
    JSON.stringify({
      model_id: mortgageId,
      title: args.title,
      deadline: formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the mortgage step");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    mortgageId: item.model_id,
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
 * Updates a mortgage step.
 * @param stepId - The id of the mortgage step.
 * @param args - The form data to update the mortgage step.
 * @returns The updated mortgage step.
 * @throws {ApiError} if the request fails.
 */
export const updateMortgageStep = async (stepId, args) => {
  const response = await fetchService.put(
    `/guarantees/tasks/${stepId}`,
    JSON.stringify({
      title: args.title,
      deadline: args.dueDate && formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the mortgage step");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    mortgageId: item.model_id,
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
 * Completes a mortgage step on the server.
 * @param stepId - The id of the mortgage step
 * @param data - The data to complete the mortgage step.
 * @returns A promise that resolves to the completed mortgage step.
 * @throws {ApiError} if the request fails.
 */
export const completeMortgageStep = async (stepId, data) => {
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
    `/guarantees/tasks/complete/${stepId}`,
    data ? formData : undefined,
  );
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      mortgageId: item.model_id,
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
  throw new ApiError("Failed to complete this mortgage step");
};
/**
 * Forwards a mortgage step.
 * @param stepId - The id of the mortgage step.
 * @param args - The form data to forward the mortgage step.
 * @returns The forwarded mortgage step.
 * @throws {ApiError} if the request fails.
 */
export const forwardMortgageStep = async (stepId, args) => {
  const response = await fetchService.put(
    `/guarantees/tasks/transfer/${stepId}`,
    JSON.stringify({
      forward_title: args.title,
      deadline_transfer: formatDate(args.dueDate),
      description: args.description,
      collaborators: [args.receiverId],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to forward the mortgage step");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    mortgageId: item.model_id,
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
 * Deletes a mortgage step.
 * @param stepId - The id of the mortgage step.
 * @throws {ApiError} if the request fails.
 */
export const deleteMortgageStep = async (stepId) => {
  const response = await fetchService.delete(`/guarantees/tasks/${stepId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the mortgage step");
  }
};
