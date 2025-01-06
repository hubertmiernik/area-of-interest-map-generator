import * as yup from "yup";
import { useForm } from "react-hook-form";
import { usePostGenerateProjectMutation } from "@/services/create-project-api";
import { yupResolver } from "@hookform/resolvers/yup";
import { setStep } from "@/store/steps/slice";
import { useAppDispatch } from "@/hooks/redux/redux-hooks";
import { toast } from "sonner";

export enum CreateProjectFormFields {
  NAME = "name",
  DESCRIPTION = "description",
  DATE_RANGE = "dateRange",
  AREA_OF_INTEREST = "areaOfInterest",
}

export type CreateProjectFormValues = {
  [CreateProjectFormFields.NAME]: string;
  [CreateProjectFormFields.DESCRIPTION]?: string;
  [CreateProjectFormFields.DATE_RANGE]: {
    from: Date;
    to: Date;
  };
  [CreateProjectFormFields.AREA_OF_INTEREST]: {
    data: string;
    fileName?: string;
  };
};

const dateRangeSchema = yup.object().shape({
  from: yup
    .date()
    .required("Start date is required")
    .typeError("Start date must be a valid date"),
  to: yup
    .date()
    .required("End date is required")
    .typeError("End date must be a valid date"),
});

const areaOfInterestSchema = yup.object().shape({
  data: yup.string().required("Area of interest is required"),
  fileName: yup.string(),
});

const createProjectFormSchema = yup.object().shape({
  [CreateProjectFormFields.NAME]: yup
    .string()
    .required("Name is required")
    .max(32, "Name is too long, max 32 characters"),
  [CreateProjectFormFields.DATE_RANGE]: dateRangeSchema.required(
    "Date range is required",
  ),
  [CreateProjectFormFields.AREA_OF_INTEREST]: areaOfInterestSchema.required(
    "Area of interest is required",
  ),
});

export const useCreateProjectForm = () => {
  const resolver = yupResolver(createProjectFormSchema);
  const dispatch = useAppDispatch();

  const { handleSubmit, reset, watch, ...rest } =
    useForm<CreateProjectFormValues>({
      resolver,
      mode: "onSubmit",
    });

  const [postCreateProject, { isLoading }] = usePostGenerateProjectMutation();

  const handleFormSubmit = async (data: CreateProjectFormValues) => {
    if (isLoading) return;

    const parsedData = (data: CreateProjectFormValues) => {
      return {
        name: data.name,
        description: data.description,
        dateFrom: data.dateRange.from,
        dateTo: data.dateRange.to,
        geoJsonData: data.areaOfInterest.data,
      };
    };

    await postCreateProject(parsedData(data))
      .unwrap()
      .then(() => {
        dispatch(setStep(5));
        toast.success("Create project success");
      })
      .catch(() => {
        toast.error("Create project failed, please try again");
      });
  };

  return {
    onSubmit: handleSubmit(handleFormSubmit),
    isLoading,
    reset,
    ...rest,
  };
};
