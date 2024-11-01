export const getStatusLabel = (phase) => {
  switch (phase) {
    case "formalization":
      return "En cours de formalisation";
    case "formalized":
      return "Formalisé";
    case "realization":
      return "En cours de recouvrement";
    case "realized":
      return "Recouvré";
    default:
      return "";
  }
};
