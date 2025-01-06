import * as React from "react";

import { TextareaHTMLAttributes } from "react";
import Text from "@/components/ui/text";
import {cn} from "@/lib/utils";

export type TextAreaProps = {
  label?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, placeholder, ...props }, ref) => {
    return (
      <>
        <div className={cn("flex flex-col")}>
          <Text type={"smallBody"}>
            <label className={`${error && "text-red"}`}>{label}</label>
          </Text>
          <textarea
            autoFocus={false}
            className={cn(
              `${error && "!border-red"} resize-none flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground  focus-visible:outline-none focus-visible:border focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50`,
              className,
            )}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
        </div>
      </>
    );
  },
);
TextArea.displayName = "TextArea";

export { TextArea };
