"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
import { formatDate } from "@/services/api-sdk/lib/utils";
/**
 * Fetches all shares transfers from the server.
 * @returns A promise that resolves to an array of shares transfers.
 * @throws {ApiError} if the request fails.
 */
export const getAllSharesTransfers = async () => {
  const response = await fetchService.get("/action_transfers");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            reference: item.reference,
            transferNumber: item.transfer_id,
            type: item.type,
            status: item.status,
            shares: item.count_actions,
            transferDate: new Date(item.transfer_date),
            seller: {
              id: item.owner.id,
              name: item.owner.name,
            },
            buyer: {
              id: item.buyer.id,
              name: item.buyer.name,
            },
            files:
              item.files?.map((file) => ({
                fileUrl: file.file_url,
                filename: file.filename,
              })) ?? [],
          };
        } catch (e) {
          return null;
        }
      })
      .filter((transfer) => transfer !== null);
  }
  throw new ApiError("Failed to fetch all shares transfers");
};
/**
 * Fetches one shares transfer from the server.
 * @param transferId - The ID of the shares transfer to fetch.
 * @returns A promise that resolves to a shares transfer.
 * @throws {ApiError} if the request fails.
 */
export const getOneSharesTransfer = async (transferId) => {
  const response = await fetchService.get(`/action_transfers/${transferId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      reference: item.reference,
      transferNumber: item.transfer_id,
      type: item.type,
      status: item.status,
      shares: item.count_actions,
      transferDate: new Date(item.transfer_date),
      seller: {
        id: item.owner.id,
        name: item.owner.name,
      },
      buyer: {
        id: item.buyer.id,
        name: item.buyer.name,
      },
      files:
        item.files?.map((file) => ({
          fileUrl: file.file_url,
          filename: file.filename,
        })) ?? [],
      currentTask: item.current_task && {
        id: item.current_task.id,
        title: item.current_task.title,
        dueDate: new Date(item.current_task.deadline),
      },
    };
  }
  throw new ApiError("Failed to fetch one shares transfer");
};
/**
 * Transfers shares.
 * @param args - The form data to transfer shares.
 * @throws {ApiError} if the request fails.
 */
export const transferShares = async (args) => {
  const response = await fetchService.post(
    "/action_transfers",
    JSON.stringify({
      type: args.type,
      count_actions: args.shares,
      transfer_date: formatDate(args.transferDate),
      owner_id: args.sellerId,
      buyer_id: args.buyerId,
      name: args.thirdParty?.name,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to transfer shares");
  }
};
/**
 * Approves a shares transfer.
 * @param transferId - The ID of the shares transfer to approve.
 * @param args - The form data to approve the shares transfer
 * @throws {ApiError} if the request fails.
 */
export const approveSharesTransfer = async (transferId, args) => {
  const response = await fetchService.post(
    "/approved_action_transfers",
    JSON.stringify({
      action_transfer_id: transferId,
      nationality: args.nationality,
      address: args.address,
      type: args.type,
      corporate_type: args.corporateType,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to approve the shares transfer");
  }
};
