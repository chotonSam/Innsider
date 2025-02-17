"use client";

import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-[#1E293B] text-5xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaSpinner />
        </motion.div>
        <p className="text-[#1E293B] mt-3 text-lg font-semibold">Loading...</p>
      </motion.div>
    </div>
  );
};

export default Loading;
