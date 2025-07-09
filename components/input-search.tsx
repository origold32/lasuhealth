"use client";

import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

type Props = {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const InputSearch = ({
  value,
  placeholder = "Search...",
  onChange,
  defaultValue,
  className,
  onClickSearch,
}: Props) => {
  const [search, setSearch] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onChange && onChange(e);
  };
  useEffect(() => {
    setSearch(defaultValue);
  }, [defaultValue]);
  return (
    <div
      className={cn("h-max relative max-w-[300px] min-w-[250px]", className)}
    >
      <Input
        placeholder={placeholder}
        className="px-4 pr-[calc(2rem)] w-full rounded-full h-11 sm:h-12"
        type="text"
        value={value ?? search}
        onChange={handleChange}
      />
      {/* <div className="flex items-center gap-2 absolute top-1/2 -translate-y-1/2 right-2 p-2 text-muted-foreground"> */}
      {search ? (
        <button
          className=" cursor-pointer absolute inset-y-0 right-12"
          onClick={() =>
            handleChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          aria-label="Clear search"
          title="Clear search"
        >
          <X size={16} />
        </button>
      ) : null}
      <div
        onClick={() => onClickSearch && onClickSearch(search ?? "")}
        className={cn(
          buttonVariants({ size: "icon-sm" }),
          " text-muted-foreground h-10 w-10 my-auto rounded-full  absolute right-1 inset-y-0 px-3"
        )}
      >
        <Search className=" text-white" size={16} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default InputSearch;
