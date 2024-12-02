"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// Define the context
const CursorContext = createContext<{
  cursorStyle: string;
  setTemporaryCursorStyle: (style: string) => void;
}>({
  cursorStyle: "custom-cursor-hover",
  setTemporaryCursorStyle: () => {}, // Provide a no-op default implementation
});

// Provider component
export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorStyle, setCursorStyle] = useState("custom-cursor-hover");

  const setTemporaryCursorStyle = useCallback((style: string) => {
    setCursorStyle(style);
    setTimeout(() => setCursorStyle("custom-cursor-hover"), 500);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorStyle, setTemporaryCursorStyle }}>
      {children}
    </CursorContext.Provider>
  );
};

// Custom hook for using the context
export const useCursor = () => useContext(CursorContext);
