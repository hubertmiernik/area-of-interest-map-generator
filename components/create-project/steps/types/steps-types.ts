import { Control } from "react-hook-form";
import { CreateProjectFormValues } from "@/hooks/forms/use-create-project-form";

export type StepProps = {
  control: Control<CreateProjectFormValues>;
};
