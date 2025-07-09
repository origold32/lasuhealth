"use client";

import { InputInfo, InputInfoProps } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Label } from "@/components/ui/label";
import { inputActive } from "./input-v1";

export type SelectItem = { content?: React.ReactNode; value: string };

export interface InputSelectV1Props
  extends RadixSelect.SelectProps,
    InputInfoProps {
  items: SelectItem[];
  className?: string;
  rootClassName?: string;
  requiredStar?: boolean;
  requiredErrorMessage?: string;
  label?: string;
  labelClassName?: string;
  placeholder?: React.ReactNode;
  immediateOpenSelectWhenNoValue?: boolean;
  name?: string;
  onChange?: (e: { target: { name: string; value: string } }) => void;
}

const InputSelectV1 = React.forwardRef<HTMLButtonElement, InputSelectV1Props>(
  (
    {
      className,
      placeholder,
      label,
      requiredStar,
      requiredErrorMessage = "Please select a value in the list",
      onOpenChange,
      onValueChange,
      onChange,
      labelClassName,
      info,
      warn,
      error,
      items,
      immediateOpenSelectWhenNoValue,
      rootClassName,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const focusComingFromContentClose = React.useRef<boolean>(false);
    const [selectOpened, setSelectOpened] = React.useState<boolean>(false);
    const validDefaultValue = items.find(
      (item) => item.value == props.defaultValue
    )
      ? props.defaultValue
      : "";
    const [labelOpen, setLabelOpen] = React.useState<boolean>(
      validDefaultValue ? true : false
    );
    const [hasValue, setHasValue] = React.useState<string | undefined>(
      validDefaultValue
    );

    React.useEffect(() => {
      const bgSelectInput =
        (document.getElementById("background_select") as HTMLInputElement) ||
        null;
      if (
        bgSelectInput &&
        props.required &&
        requiredErrorMessage &&
        !hasValue
      ) {
        bgSelectInput.setCustomValidity(requiredErrorMessage);
      } else {
        bgSelectInput.setCustomValidity("");
      }
    }, [requiredErrorMessage, props.required, hasValue]);

    return (
      <div
        className={cn(
          "/min-h-[calc(2.5rem_+_10px)] /grid /content-end",
          rootClassName
        )}
      >
        <div className="relative">
          <input
            type="text"
            id="background_select"
            className=" sr-only bottom-0 left-0"
            tabIndex={-1}
            aria-hidden="true"
            name={props.name}
            value={hasValue || validDefaultValue || ""}
            onChange={() => {}}
            required={props.required}
            title={label || "Select input"}
            placeholder={
              typeof placeholder === "string" ? placeholder : "Select an item"
            }
          />
          <Select
            open={selectOpened}
            onOpenChange={(open) => {
              setSelectOpened(open);
              open && setLabelOpen(true);
              onOpenChange && onOpenChange(open);
            }}
            onValueChange={(value) => {
              setHasValue(value);
              onValueChange && onValueChange(value);
              onChange &&
                onChange({ target: { name: props.name ?? "", value: value } });
            }}
            {...props}
            defaultValue={validDefaultValue}
          >
            <SelectTrigger
              id={id}
              ref={ref}
              className={cn(
                " cursor-pointer",
                (error || warn) && "border-2  /ring-offset-2",
                error &&
                  "[--ring:var(--destructive)] ring-destructive/ border-destructive",
                warn && "[--ring:var(--warn)] ring-warn/ border-warn",
                className
              )}
              onFocus={() => {
                console.log("on focus");
                setLabelOpen(true);
                if (!focusComingFromContentClose.current) {
                  !hasValue &&
                    immediateOpenSelectWhenNoValue &&
                    setSelectOpened(true);
                }
              }}
              onBlur={() => {
                console.log(
                  "on blur",
                  !hasValue,
                  !selectOpened,
                  !hasValue && !selectOpened
                );

                if (!selectOpened && !hasValue) {
                  setLabelOpen(false);
                }
                focusComingFromContentClose.current = false;
              }}
            >
              <SelectValue
                placeholder={
                  <span className={cn(labelOpen ? "opacity-100" : "opacity-0")}>
                    {placeholder || "Select an item"}
                  </span>
                }
              />
            </SelectTrigger>
            <Label
              htmlFor={id}
              className={cn(
                "absolute  left-0 top-1/2 -translate-y-1/2 px-3 h-max transition-all ease-out duration-200  pointer-events-none ",
                labelOpen && inputActive,
                error && " !text-destructive",
                warn && " !text-warn",
                labelClassName
              )}
            >
              {label}
              {requiredStar && props.required && " *"}
            </Label>
            <SelectContent
              onCloseAutoFocus={(e) => {
                focusComingFromContentClose.current = true;
              }}
            >
              <SelectGroup>
                {items?.map((item, i) => {
                  return (
                    <SelectItem key={i} value={item.value}>
                      {item.content ?? item.value}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <InputInfo info={info} warn={warn} error={error} />
      </div>
    );
  }
);

InputSelectV1.displayName = "InputSelectV1";

export default InputSelectV1;
