import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "@/public/animations/tick.json";

const StepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [1, 2, 3, 4, 5];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const AnimatedTick = (
    <Lottie
      animationData={animationData}
      loop={false}
      // className={
      //   "md:w-[14rem] w-[10rem] md:mt-[-6rem] mt-[-2rem] mb-[1rem]"
      // }
    />
  );

  return (
    <div className="w-full max-w-xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-8 relative">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center relative w-full">
            {/* Step Circle */}
            <motion.div
              className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                currentStep >= step
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-gray-300 bg-white text-gray-500"
              }`}
              initial={{ scale: 1 }}
              animate={{
                scale: currentStep === step ? 1.2 : 1, // Bounce effect
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                duration: 0.3,
              }}
            >
              {currentStep >= step + 1 ? (
                <Lottie
                  animationData={animationData}
                  loop={false}
                  // className={
                  //   "md:w-[14rem] w-[10rem] md:mt-[-6rem] mt-[-2rem] mb-[1rem]"
                  // }
                />
              ) : (
                step
              )}
            </motion.div>

            {/* Line */}
            {index < steps.length - 1 && (
              <motion.div
                className={`absolute top-1/2 left-[calc(20%+1.5rem)] h-1 transform -translate-y-1/2 ${
                  currentStep > step ? "bg-blue-500" : "bg-gray-300"
                }`}
                initial={{ width: "0%" }}
                animate={{
                  width: currentStep > step ? "100%" : "0%",
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              ></motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePreviousStep}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
          disabled={currentStep === 1}
        >
          Wstecz
        </button>
        <button
          onClick={handleNextStep}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={currentStep === steps.length}
        >
          Dalej
        </button>
      </div>
    </div>
  );
};

export default StepForm;
