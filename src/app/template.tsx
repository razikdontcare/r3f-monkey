"use client";

import { motion } from "framer-motion";

const variants = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        variants={variants}
        initial={"from"}
        animate={"to"}
        exit={"from"}
        transition={{ duration: 2, ease: "easeInOut" }}
        key={"template"}
      >
        {children}
      </motion.div>
    </>
  );
}
