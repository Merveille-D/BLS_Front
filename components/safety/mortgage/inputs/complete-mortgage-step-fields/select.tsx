import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const selectOptions = [
  { value: "holder", label: "Au débiteur" },
  { value: "third_party_holder", label: "Au tiers détenteur" },
];
export function SelectField({ onChange, ...field }) {
  return (
    <Select
      {...field}
      onValueChange={onChange}
    >
      <SelectTrigger className="h-12">
        <SelectValue placeholder="Sélectionner un canal" />
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