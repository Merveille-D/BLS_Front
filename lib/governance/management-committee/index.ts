export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return {
        status: "pending",
        label: "En cours de préparation",
        color: "hsl(147 100% 35%)",
      };
    case "closed":
      return {
        status: "closed",
        label: "Terminée",
        color: "rgb(107 114 128)",
      };
    default:
      return {
        status,
        label: "Terminée",
        color: "rgb(107 114 128)",
      };
  }
};
