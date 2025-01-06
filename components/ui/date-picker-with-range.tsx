"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBreakpoint } from "@/hooks/common/use-breakpoint";

type DatePickerWithRangeProps = {
  className?: string;
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
};

export function DatePickerWithRange({
  className,
  value,
  onChange,
}: DatePickerWithRangeProps) {
  const { isMd } = useBreakpoint("md");

  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(value);
  const [open, setOpen] = React.useState(false);

  const handleSave = () => {
    if (onChange) {
      onChange(tempDate);
    }
    setOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "bg-transparent border-border justify-start text-left font-normal text-tmp07 hover:bg-transparent hover:text-tmp07",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="center"
          side={"bottom"}
          sideOffset={isMd ? 0 : -300}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempDate?.from}
            selected={tempDate}
            onSelect={setTempDate}
            numberOfMonths={2}
          />
          <div className="flex justify-end p-3">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
