import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { Input, InputProps } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";

export type ControllerProps<
  TInputComponentProps,
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TFieldName> & TInputComponentProps;

const InputForm = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  type,
  name,
  control,
  rules,
  defaultValue,
  placeholder,
  className,
  onFocus,
  optional,
  ...rest
}: ControllerProps<InputProps, TFieldValues, TFieldName>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const { error } = fieldState;
  const { value, onChange, onBlur } = field;

  return (
    <div className={className}>
      {type === "textArea" ? (
        <TextArea
          label={label}
          value={value === undefined ? "" : value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          error={!!error}
          className={className}
          onFocus={onFocus}
          optional={optional}
        />
      ) : (
        <Input
          {...rest}
          label={label}
          type={type}
          value={value === undefined ? "" : value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          error={!!error}
          optional={optional}
        />
      )}
      {error && (
        <p className={"text-xs text-red-600 absolute"}>{error.message}</p>
      )}
    </div>
  );
};

export default InputForm;
