"use client";

import React from "react";
import {
  FieldError,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";
import Text from "@/components/ui/text";

type ExtendedFieldError = FieldError & {
  from?: FieldError;
  to?: FieldError;
};

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
  const { error } = fieldState as { error: ExtendedFieldError | undefined };

  const handleDateChange = (date: DateRange | undefined) => {
    onChange(date);
  };

  return (
    <div className={className}>
      {label && (
        <Text type={"smallBody"}>
          <label className={`block ${error ? "text-red-600" : ""}`}>
            {label}
          </label>
        </Text>
      )}
      <DatePickerWithRange
        className={`${error && "border-red-600"} w-full`}
        value={value}
        onChange={handleDateChange}
      />
      {error?.from && (
        <p className="text-xs text-red-600 mt-1">{error.from?.message}</p>
      )}
      {error?.to && (
        <p className="text-xs text-red-600 mt-1">{error.to?.message}</p>
      )}
    </div>
  );
};

export default DatePickerWithRangeForm;
