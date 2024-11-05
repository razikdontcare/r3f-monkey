"use client";

import { AnimatePresence } from "framer-motion";

export default function AnimPresence({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
