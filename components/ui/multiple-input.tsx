"use client";
import * as React from "react";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
const MultipleInput = React.forwardRef(
  (
    { value, inputRef, onChange, inputClassName, containerClassName, ...props },
    ref,
  ) => {
    const innerInputRef = useRef(null);
    const handleAdd = useCallback(
      (newValue) => {
        if (!newValue.trim()) return;
        onChange?.(Array.from(new Set([...(value ?? []), newValue.trim()])));
        const inputNode = (inputRef ?? innerInputRef).current;
        if (inputNode) {
          inputNode.value = "";
        }
      },
      [onChange, value, inputRef],
    );
    const handleRemove = useCallback(
      (index) => {
        onChange?.(value?.filter((_, i) => i !== index) ?? []);
      },
      [value, onChange],
    );
    return (
      <div
        ref={ref}
        className={cn(
          "flex max-h-40 min-h-10 w-full flex-wrap items-center gap-2 overflow-y-auto rounded-md border border-input bg-background px-3 py-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          containerClassName,
        )}
      >
        {value?.map((v, index) => (
          <Badge
            key={v}
            className="hover:bg-accent-hover/90 bg-accent text-xs text-accent-foreground"
          >
            {v}
            <Button
              variant="ghost"
              className="h-5 w-5 rounded-full p-0"
              onClick={() => handleRemove(index)}
            >
              <X size={14} />
            </Button>
          </Badge>
        ))}
        <input
          className={cn(
            "peer w-full min-w-40 flex-1 bg-background text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName,
          )}
          ref={inputRef || innerInputRef}
          {...props}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd(e.currentTarget.value);
            }
          }}
          onBlur={(e) => {
            handleAdd(e.currentTarget.value);
          }}
        />
      </div>
    );
  },
);
MultipleInput.displayName = "MultipleInput";
export { MultipleInput };
