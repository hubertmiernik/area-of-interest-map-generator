"use client";

import React from "react";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";

type DatePickerWithRangeFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TFieldName> & {
  label?: string;
  className?: string;
};

const DatePickerWithRangeForm = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  name,
  control,
  rules,
  defaultValue,
  className,
}: DatePickerWithRangeFormProps<TFieldValues, TFieldName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const { value, onChange } = field;
  const { error } = fieldState;

  const handleDateChange = (date: DateRange | undefined) => {
    onChange(date);
  };

  console.log("value", value);

  return (
    <div className={className}>
      {label && (
        <label
          className={`block text-sm font-medium mb-2 ${error ? "text-red-500" : ""}`}
        >
          {label}
        </label>
      )}
      <DatePickerWithRange
        className={error ? "border-red-500" : ""}
        value={value}
        onChange={handleDateChange}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default DatePickerWithRangeForm;
