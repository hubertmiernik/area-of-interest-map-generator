import * as React from "react";

import { TextareaHTMLAttributes } from "react";
import Text from "@/components/ui/text";
import { cn } from "@/lib/utils";

export type TextAreaProps = {
  optional?: boolean;
  label?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, label, error, placeholder, optional = false, ...props },
    ref,
  ) => {
    return (
      <>
        <div className={cn("flex flex-col")}>
          <Text type={"smallBody"} className={"font-medium"}>
            <label className={`${error && "text-red-400"}`}>{label}</label>
            {optional && (
              <label className={"ml-1 text-tmp09"}>(optional)</label>
            )}
          </Text>
          <textarea
            autoFocus={false}
            className={cn(
              `${error && "!border-red"} text-tmp07 resize-none flex min-h-[80px] w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-tmp09  focus-visible:outline-none focus-visible:border focus-visible:border-tmp02 disabled:cursor-not-allowed disabled:opacity-50`,
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
