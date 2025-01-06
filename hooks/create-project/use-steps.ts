import { UseFormTrigger } from "react-hook-form";
import { CreateProjectFormValues } from "@/hooks/forms/use-create-project-form";
import { nextStep, prevStep, selectStep, setStep } from "@/store/steps/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/redux-hooks";

export const useSteps = (trigger: UseFormTrigger<CreateProjectFormValues>) => {
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectStep);

  const handleNext = async () => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = await trigger("name");
        break;
      case 2:
        isValid = await trigger("description");
        break;
      case 3:
        isValid = await trigger("dateRange");
        break;
      case 4:
        isValid = await trigger("areaOfInterest");
        break;
      default:
        break;
    }

    if (isValid) {
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const goToStep = (stepNumber: number) => {
    dispatch(setStep(stepNumber));
  };

  return {
    step,
    handleNext,
    handlePrev,
    goToStep,
  };
};
