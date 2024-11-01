import React from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
const NumberInput = React.forwardRef(({ onChange, ...props }, ref) => (
  <NumericFormat
    thousandSeparator
    getInputRef={ref}
    customInput={Input}
    onValueChange={({ floatValue }, { source }) => {
      if (source === "event") {
        onChange?.(floatValue ?? 0);
      }
    }}
    {...props}
  />
));
NumberInput.displayName = "NumberInput";
export { NumberInput };
