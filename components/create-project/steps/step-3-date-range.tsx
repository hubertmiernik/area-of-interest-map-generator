import DatePickerWithRangeForm from "@/components/forms/date-picker-with-range-form";
import { StepProps } from "@/components/create-project/steps/types/steps-types";
import { CreateProjectFormFields } from "@/hooks/forms/use-create-project-form";

const Step3DateRange = ({ control }: StepProps) => (
  <DatePickerWithRangeForm
    control={control}
    name={CreateProjectFormFields.DATE_RANGE}
    label={"Date range"}
  />
);

export default Step3DateRange;
