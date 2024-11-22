"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
// import FrozenRoute from "./FrozenRoute";
import React from "react";

const PageAnimatePresence = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      {/**
       * We use `motion.div` as the first child of `<AnimatePresence />` Component so we can specify page animations at the page level.
       * The `motion.div` Component gets re-evaluated when the `key` prop updates, triggering the animation's lifecycles.
       * During this re-evaluation, the `<FrozenRoute />` Component also gets updated with the new route components.
       */}
      <motion.div key={pathname}>
        {children}
        {/* {children} */}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageAnimatePresence;
