"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { formatDate } from "@/services/api-sdk/lib/utils";
import { fetchService } from "@/services/api-sdk/init";
/**
 * Fetches all contract events from the server.
 * @param contractId - The id of the contract.
 * @returns A promise that resolves to an array of contract events.
 * @throws {ApiError} if the request fails.
 */
export const getAllContractEvents = async (contractId) => {
  const response = await fetchService.get(`/tasks?contract_id=${contractId}`);
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
  throw new ApiError("Failed to fetch all contract events");
};
/**
 * Fetches one contract event from the server.
 * @param eventId - The id of the contract event.
 * @returns A promise that resolves to the contract event.
 * @throws {ApiError} if the request fails.
 */
export const getOneContractEvent = async (eventId) => {
  const response = await fetchService.get(`/tasks/${eventId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      title: item.libelle,
      dueDate: new Date(item.deadline),
      completed: item.status,
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
  throw new ApiError("Failed to fetch this contract event");
};
/**
 * Creates a contract event.
 * @param contractId - The id of the contract.
 * @param args - The form data to create the contract event.
 * @returns The created contract event.
 * @throws {ApiError} if the request fails.
 */
export const createContractEvent = async (contractId, args) => {
  const response = await fetchService.post(
    "/tasks",
    JSON.stringify({
      contract_id: contractId,
      libelle: args.title,
      deadline: formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the contract event");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    dueDate: new Date(item.deadline),
    completed: item.status,
    createdBy: item.created_by,
  };
};
/**
 * Updates a contract event.
 * @param eventId - The id of the contract event.
 * @param args - The form data to update the contract event.
 * @returns The updated contract event.
 * @throws {ApiError} if the request fails.
 */
export const updateContractEvent = async (eventId, args) => {
  const response = await fetchService.put(
    `/tasks/${eventId}`,
    JSON.stringify({
      libelle: args.title,
      deadline: args.dueDate && formatDate(args.dueDate),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the contract event");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    dueDate: new Date(item.deadline),
    completed: item.status,
    createdBy: item.created_by,
  };
};
/**
 * Marks a contract event as completed.
 * @param eventId - The id of the contract event.
 * @returns The updated contract event.
 * @throws {ApiError} if the request fails.
 */
export const markContractEventAsCompleted = async (eventId) => {
  const response = await fetchService.put(
    `/tasks/${eventId}`,
    JSON.stringify({
      status: true,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to mark the contract event as completed");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    dueDate: new Date(item.deadline),
    completed: item.status,
    createdBy: item.created_by,
  };
};
/**
 * Forwards a contract event.
 * @param eventId - The id of the contract event.
 * @param args - The form data to forward the contract event.
 * @returns The forwarded contract event.
 * @throws {ApiError} if the request fails.
 */
export const forwardContractEvent = async (eventId, args) => {
  const response = await fetchService.put(
    `/tasks/${eventId}`,
    JSON.stringify({
      forward_title: args.title,
      deadline_transfer: formatDate(args.dueDate),
      description: args.description,
      collaborators: [args.receiverId],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to forward the contract event");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    title: item.libelle,
    dueDate: new Date(item.deadline),
    completed: item.status,
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
};
/**
 * Deletes a contract event.
 * @param eventId - The id of the contract event.
 * @throws {ApiError} if the request fails.
 */
export const deleteContractEvent = async (eventId) => {
  const response = await fetchService.delete(`/tasks/${eventId}`);
  if (!response.ok) {
    throw new ApiError("Failed to delete the contract event");
  }
};
