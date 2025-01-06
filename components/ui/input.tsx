import * as React from "react";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import Text from "@/components/ui/text";

export type InputProps = {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "textArea" | "file";
  error?: boolean;
  className?: string;
  onFocus?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, ...props }, ref) => {
    return (
      <>
        <div className={cn("flex flex-col")}>
          <Text type={"smallBody"} className={"font-medium"}>
            <label className={`${error && "text-red"}`}>{label}</label>
          </Text>
          <input
            type={type}
            className={cn(
              `${error && "!border-red"} textPrimary flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50`,
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
