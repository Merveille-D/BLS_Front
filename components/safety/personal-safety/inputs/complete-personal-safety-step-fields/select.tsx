import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const selectOptions = [
  { value: "determined", label: "Garantie A Durée Déterminée" },
  { value: "undetermined", label: "Garantie A Durée Indéterminée" },
];
export function SelectField({ onChange, ...field }) {
  return (
    <Select
      {...field}
      onValueChange={onChange}
    >
      <SelectTrigger className="h-12">
        <SelectValue placeholder="Choisir la durée du contrat" />
      </SelectTrigger>
      <SelectContent>
        {selectOptions.map((option) => (
          <SelectItem
            value={option.value}
            key={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
