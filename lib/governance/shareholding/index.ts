/**
 * Get the status of a shares transfer.
 * @param status - The status of the shares transfer.
 * @returns The status of the shares transfer.
 */
export const getSharesTransferStatus = (status) => {
  switch (status) {
    case "pending":
      return "En attente";
    case "rejected":
      return "Rejeté";
    case "cancelled":
      return "Annulé";
    case "validated":
      return "Validé";
    case "approved":
      return "Transféré";
    default:
      return "Non défini";
  }
};
