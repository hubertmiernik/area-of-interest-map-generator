import { StepProps } from "@/components/create-project/steps/types/steps-types";
import InputForm from "@/components/forms/input-form";
import { CreateProjectFormFields } from "@/hooks/forms/use-create-project-form";

const Step2Description = ({ control }: StepProps) => (
  <InputForm
    optional
    name={CreateProjectFormFields.DESCRIPTION}
    control={control}
    placeholder={"Type description"}
    label={"Description"}
    type={"textArea"}
    className={"mb-4"}
  />
);

export default Step2Description;
