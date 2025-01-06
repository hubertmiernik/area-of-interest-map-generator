import GeoJsonUploaderForm from "@/components/forms/geo-json-uploader-form";
import { StepProps } from "@/components/create-project/steps/types/steps-types";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import {
  CreateProjectFormFields,
  CreateProjectFormValues,
} from "@/hooks/forms/use-create-project-form";

const Step4AreaOfInterest = ({
  control,
  setError,
  clearErrors,
}: StepProps & {
  setError: UseFormSetError<CreateProjectFormValues>;
  clearErrors: UseFormClearErrors<CreateProjectFormValues>;
}) => (
  <GeoJsonUploaderForm
    setError={setError}
    control={control}
    name={CreateProjectFormFields.AREA_OF_INTEREST}
    label={"Area of interest"}
    clearErrors={clearErrors}
  />
);

export default Step4AreaOfInterest;
