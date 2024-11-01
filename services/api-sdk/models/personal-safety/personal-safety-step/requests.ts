"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all personal safety steps from the server.
 * @param personalSafetyId - The id of the step.
 * @returns A promise that resolves to an array of personal safety steps.
 * @throws {ApiError} if the request fails.
 */
export const getAllPersonalSafetySteps = async (personalSafetyId) => {
  const response = await fetchService.get(
    `/guarantees/tasks?id=${personalSafetyId}`,
  );
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            title: item.title,
            personalSafetyId: item.model_id,
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
  throw new ApiError("Failed to fetch all personal safety steps");
};
/**
 * Fetches one personal safety step from the server.
 * @param stepId - The id of the personal safety step.
 * @returns A promise that resolves to the personal safety step.
 * @throws {ApiError} if the request fails.
 */
export const getOnePersonalSafetyStep = async (stepId) => {
  const response = await fetchService.get(`/guarantees/tasks/${stepId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.title,
      personalSafetyId: item.model_id,
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
  throw new ApiError("Failed to fetch this personal safety step");
};
/**
 * Creates a personal safety step.
 * @param personalSafetyId - The id of the personalSafety.
 * @param args - The form data to create the personal safety step.
 * @returns The created personal safety step.
 * @throws {ApiError} if the request fails.
 */
export const createPersonalSafetyStep = async (personalSafetyId, args) => {
  const response = await fetchService.post(
    "/guarantees/tasks",
    JSON.stringify({
      model_id: personalSafetyId,
      title: args.title,
      deadline: formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the personal safety step");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    personalSafetyId: item.model_id,
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
 * Updates a personal safety step.
 * @param stepId - The id of the personal safety step.
 * @param args - The form data to update the personal safety step.
 * @returns The updated personal safety step.
 * @throws {ApiError} if the request fails.
 */
export const updatePersonalSafetyStep = async (stepId, args) => {
  const response = await fetchService.put(
    `/guarantees/tasks/${stepId}`,
    JSON.stringify({
      title: args.title,
      deadline: args.dueDate && formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the personal safety step");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    personalSafetyId: item.model_id,
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
 * Completes a personal safety step on the server.
 * @param stepId - The id of the personal safety step
 * @param data - The data to complete the personal safety step.
 * @returns A promise that resolves to the completed personal safety step.
 * @throws {ApiError} if the request fails.
 */
export const completePersonalSafetyStep = async (stepId, data) => {
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
      personalSafetyId: item.model_id,
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
  throw new ApiError("Failed to complete this personal safety step");
};
/**
 * Forwards a personal safety step.
 * @param stepId - The id of the personal safety step.
 * @param args - The form data to forward the personal safety step.
 * @returns The forwarded personal safety step.
 * @throws {ApiError} if the request fails.
 */
export const forwardPersonalSafetyStep = async (stepId, args) => {
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
    throw new ApiError("Failed to forward the personal safety step");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.title,
    personalSafetyId: item.model_id,
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
 * Deletes a personal safety step.
 * @param stepId - The id of the personal safety step.
 * @throws {ApiError} if the request fails.
 */
export const deletePersonalSafetyStep = async (stepId) => {
  const response = await fetchService.delete(`/guarantees/tasks/${stepId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the personal safety step");
  }
};
