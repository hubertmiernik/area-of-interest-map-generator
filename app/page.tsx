"use client";

import CreateProject from "@/components/create-project/create-project";
import { motion } from "framer-motion";
import { useAppSelector } from "@/hooks/redux/redux-hooks";
import { selectIsLastStep } from "@/store/steps/slice";
import TitleSection from "@/components/common/title-section";
import { useBreakpoint } from "@/hooks/common/use-breakpoint";

export default function Home() {
  const lastStep = useAppSelector(selectIsLastStep);
  const { isMd } = useBreakpoint("md");

  const width = isMd ? (lastStep ? "65rem" : "35rem") : "90%";
  const height = isMd
    ? lastStep
      ? "50rem"
      : "25rem"
    : lastStep
      ? "100%"
      : "22.5rem";

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="mt-20 md:mt-36">
        <TitleSection />
      </div>

      <motion.div
        className={`bg-[#9e9e9e] bg-opacity-15 border-[#727876] border backdrop-blur-[8px] rounded-xl flex flex-col justify-between ${
          !lastStep && "p-6 md:p-10"
        }`}
        initial={{
          opacity: 0,
          y: 50,
          width,
          height,
        }}
        animate={{
          opacity: 1,
          y: 0,
          width,
          height,
        }}
        exit={{
          opacity: 0,
          y: 50,
          width,
          height,
        }}
        transition={{
          duration: 0.75,
          ease: "easeInOut",
        }}
      >
        <CreateProject />
      </motion.div>
    </div>
  );
}
