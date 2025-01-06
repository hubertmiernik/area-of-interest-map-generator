import { CreateProjectFormValues } from "@/hooks/forms/use-create-project-form";
import { UseFormGetValues, UseFormReset } from "react-hook-form";
import MapViewer from "@/components/map-viewer";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux/redux-hooks";
import { setStep } from "@/store/steps/slice";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Text from "@/components/ui/text";

type CreatedProjectProps = {
  getValues: UseFormGetValues<CreateProjectFormValues>;
  reset: UseFormReset<CreateProjectFormValues>;
};

const CreatedProject = ({ getValues, reset }: CreatedProjectProps) => {
  const dispatch = useAppDispatch();

  const areaOfInterest = getValues("areaOfInterest") as {
    data: string;
    fileName?: string;
  };
  const geojsonData = areaOfInterest?.data;
  const name = getValues("name");
  const description = getValues("description");
  const dateRange = getValues("dateRange") as {
    from: Date;
    to: Date;
  };

  const dateFrom = dayjs(dateRange?.from).format("MMMM D, YYYY");
  const dateTo = dayjs(dateRange?.to).format("MMMM D, YYYY");

  const handleNewProject = () => {
    reset();
    dispatch(setStep(1));
  };

  const BigBodyText = ({ children }: { children: React.ReactNode }) => (
    <Text type="bigBody" className="text-gray-100">
      {children}
    </Text>
  );

  return (
    <div className={"flex flex-col justify-between h-full"}>
      <div className={"p-4 md:p-8 text-center"}>
        <Text type={"title"} className={"text-gray-100"}>
          {name}
        </Text>
        <BigBodyText>{description}</BigBodyText>
        <div className={"flex gap-2 text-center mt-1 justify-center"}>
          <BigBodyText>{dateFrom}</BigBodyText>
          <BigBodyText>-</BigBodyText>
          <BigBodyText>{dateTo}</BigBodyText>
        </div>
        <Button
          onClick={handleNewProject}
          variant={"primary"}
          className={"w-fit mt-4"}
        >
          Create new project
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.75,
          delay: 0.3,
          ease: "easeInOut",
        }}
      >
        <MapViewer geojsonData={geojsonData} className={"rounded-b-md"} />
      </motion.div>
    </div>
  );
};

export default CreatedProject;
