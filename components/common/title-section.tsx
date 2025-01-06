import { motion } from "framer-motion";
import Text from "@/components/ui/text";
import { useAppSelector } from "@/hooks/redux/redux-hooks";
import { selectIsLastStep } from "@/store/steps/slice";

const TitleSection = () => {
  const lastStep = useAppSelector(selectIsLastStep);

  if (lastStep) return null;

  return (
    <div className={"flex flex-col items-center "}>
      <motion.div
        className="text-[32px] mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <Text type={"hero"} className={""}>
          Mapify
        </Text>
      </motion.div>
      <motion.div
        className=" mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <Text type={"bigBody"} className={""}>
          Let's create a new project...
        </Text>
      </motion.div>
    </div>
  );
};

export default TitleSection;
