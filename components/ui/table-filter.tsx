import { Input } from "@/components/ui/input";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function TableFilter({ column }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, filterOptions } = column.columnDef.meta ?? {};
  if (filterVariant === "range") {
    return (
      <div className="flex space-x-2">
        <Input
          type="number"
          value={columnFilterValue?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [e.target.value, old?.[1]])
          }
          placeholder="Min"
          className="w-24 rounded border shadow"
        />
        <Input
          type="number"
          value={columnFilterValue?.[1] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [old?.[0], e.target.value])
          }
          placeholder="Max"
          className="w-24 rounded border shadow"
        />
      </div>
    );
  }
  if (filterVariant === "select") {
    return (
      <Select
        value={columnFilterValue?.toString()}
        onValueChange={(value) =>
          column.setFilterValue(value === "__all__" ? undefined : value)
        }
      >
        <SelectTrigger className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__all__">All</SelectItem>
          {filterOptions?.map(({ label }) => (
            <SelectItem
              value={label}
              key={label}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return (
    <Input
      placeholder="Search..."
      value={columnFilterValue ?? ""}
      className="w-36 rounded border shadow"
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  );
}
