import InputForm from "@/components/forms/input-form";
import { StepProps } from "@/components/create-project/steps/types/steps-types";
import { CreateProjectFormFields } from "@/hooks/forms/use-create-project-form";

const Step1Name = ({ control }: StepProps) => (
  <InputForm
    name={CreateProjectFormFields.NAME}
    control={control}
    placeholder={"Type name"}
    label={"Name"}
    type={"text"}
    className={"mb-4"}
  />
);

export default Step1Name;
