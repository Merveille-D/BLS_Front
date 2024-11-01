"use client";
import { useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export default function SearchInput({
  className,
  onBlur,
  onFocus,
  onChange,
  ...props
}) {
  const [editMode, setEditMode] = useState(false);
  const ref = useRef(null);
  const handleSearchClick = useCallback(() => {
    ref.current?.focus();
  }, []);
  const handleFocus = useCallback(
    (e) => {
      onFocus?.(e);
      setEditMode(true);
    },
    [onFocus],
  );
  const handleBlur = useCallback(
    (e) => {
      onBlur?.(e);
      if (e.target.value === "") setEditMode(false);
    },
    [onBlur],
  );
  const handleClear = useCallback(() => {
    if (ref.current) {
      ref.current.value = "";
      onChange?.({
        target: ref.current,
      });
      ref.current.focus();
    }
  }, [onChange]);
  return (
    <div className="relative w-72">
      <Input
        ref={ref}
        placeholder="Rechercher..."
        className={cn(
          "border-transparent bg-transparent shadow-none transition-[background-color,border-color,padding] duration-500",
          {
            "pr-12 ring-1 ring-ring": editMode,
            "pl-12": !editMode,
          },
          className,
        )}
        {...props}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Button
        variant="link"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 rounded-full p-2 transition-[left,color] duration-500",
          {
            "left-3 text-muted-foreground": !editMode,
            "left-[calc(100%-3rem)] text-transparent": editMode,
          },
        )}
        onClick={handleSearchClick}
      >
        <Search className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 rounded-full p-2 transition-[left,color] duration-500",
          {
            "left-3 -z-10 text-transparent": !editMode,
            "left-[calc(100%-3rem)] text-muted-foreground": editMode,
          },
        )}
        onClick={handleClear}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
