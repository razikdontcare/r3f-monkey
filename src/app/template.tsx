"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full h-full bg-black"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
