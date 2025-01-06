import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "@/public/animations/tick.json";
import { useAppSelector } from "@/hooks/redux/redux-hooks";
import { selectIsLastStep, selectStep } from "@/store/steps/slice";
import Text from "@/components/ui/text";

const Steps: React.FC = () => {
  const currentStep = useAppSelector(selectStep);
  const lastStep = useAppSelector(selectIsLastStep);

  const steps = [1, 2, 3, 4];
  const stepTitles = ["Name", "Description", "Dates", "Area"];

  return (
    <div className={`w-full max-w-xl mx-auto ${lastStep && "hidden"}`}>
      <div className="flex items-center justify-between mb-8 relative">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center relative w-full flex-col gap-2"
          >
            <motion.div
              className={`relative z-10 w-10 h-10 md:h-12 md:w-12 flex items-center justify-center rounded-full ${
                currentStep >= step
                  ? "bg-tmp02 text-tmp07 font-medium"
                  : "border-gray-300 bg-tmp06 text-tmp07"
              }`}
              initial={{ scale: 1 }}
              animate={{
                scale: currentStep === step ? 1.2 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                duration: 0.3,
              }}
            >
              {currentStep >= step + 1 ? (
                <Lottie animationData={animationData} loop={false} />
              ) : (
                step
              )}
            </motion.div>
            <Text type={"body"} className={"font-normal"}>
              {stepTitles[index]}
            </Text>
            {index < steps.length - 1 && (
              <>
                <div
                  className={`absolute top-[20px] md:top-[24px] left-[1.5rem] md:left-[5rem] h-[3px] transform -translate-y-1/2 w-full bg-tmp06`}
                ></div>
                <motion.div
                  className={`absolute top-[20px] md:top-[24px] left-[1.5rem] md:left-[5rem] h-[3px] transform -translate-y-1/2 bg-tmp02`}
                  initial={{ width: "0%" }}
                  animate={{
                    width: currentStep > step ? "100%" : "0%",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                ></motion.div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
