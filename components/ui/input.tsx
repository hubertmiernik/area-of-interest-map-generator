import * as React from "react";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import Text from "@/components/ui/text";

export type InputProps = {
  label?: string;
  optional?: boolean;
  placeholder?: string;
  type?: "text" | "password" | "email" | "textArea" | "file";
  error?: boolean;
  className?: string;
  onFocus?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", error, label, optional = false, ...props },
    ref,
  ) => {
    return (
      <>
        <div className={cn("flex flex-col")}>
          <Text type={"smallBody"} className={"font-medium"}>
            <label className={`${error && "text-red-600"}`}>{label}</label>
            {optional && (
              <label className={"text-gray-500 ml-1"}>(optional)</label>
            )}
          </Text>
          <input
            type={type}
            className={cn(
              `${error && "!border-red-600"} textPrimary flex h-10 w-full rounded-lg border border-border bg-transparent text-tmp07 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border focus-visible:border-tmp02 disabled:cursor-not-allowed disabled:opacity-50`,
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
