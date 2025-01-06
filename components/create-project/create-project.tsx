"use client";

import { useCreateProjectForm } from "@/hooks/forms/use-create-project-form";
import Step1Name from "@/components/create-project/steps/step-1-name";
import Step2Description from "@/components/create-project/steps/step-2-description";
import Step3DateRange from "@/components/create-project/steps/step-3-date-range";
import Step4AreaOfInterest from "@/components/create-project/steps/step-4-area-of-interest";
import { Button } from "@/components/ui/button";
import CreatedProject from "@/components/create-project/created-project";
import { useSteps } from "@/hooks/create-project/use-steps";
import Steps from "@/components/steps";
import { Loader2 } from "lucide-react";

const CreateProject = () => {
  const {
    onSubmit,
    control,
    isLoading,
    trigger,
    getValues,
    setError,
    clearErrors,
    reset,
  } = useCreateProjectForm();

  const { step, handlePrev, handleNext } = useSteps(trigger);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Name control={control} />;
      case 2:
        return <Step2Description control={control} />;
      case 3:
        return <Step3DateRange control={control} />;
      case 4:
        return (
          <Step4AreaOfInterest
            control={control}
            setError={setError}
            clearErrors={clearErrors}
          />
        );
      case 5:
        return <CreatedProject getValues={getValues} reset={reset} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={"h-full"}>
        <Steps />
        {renderStep()}
      </div>

      {step !== 5 && (
        <div className={"mt-2 flex w-full gap-2 float-end"}>
          <Button
            variant={"secondary"}
            onClick={handlePrev}
            disabled={step === 1}
            className={"w-1/2"}
          >
            Previous
          </Button>
          {step < 4 ? (
            <Button
              onClick={handleNext}
              className={"w-1/2"}
              variant={"primary"}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              className={"w-1/2"}
              variant="primary"
              disabled={isLoading}
            >
              <>
                Submit
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              </>
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default CreateProject;
