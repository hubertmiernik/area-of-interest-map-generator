"use client";

import { motion, AnimatePresence } from "framer-motion";
import Text from "@/components/ui/text";
import { useAppSelector } from "@/hooks/redux/redux-hooks";
import { selectIsLastStep } from "@/store/steps/slice";

const Header = () => {
  const lastStep = useAppSelector(selectIsLastStep);

  return (
    <AnimatePresence>
      {lastStep && (
        <motion.div
          className="absolute left-4 top-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Text type={"header"} className={"text-tmp05 font-medium"}>
            Mapify
          </Text>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Header;
