"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

interface CursorContextType {
  cursorStyle: string;
  setGrabCursor: () => void;
}

// Create Context
const CursorContext = createContext<CursorContextType | undefined>(undefined);

interface CursorProviderProps {
  children: ReactNode;
}

export const CursorProvider: React.FC<CursorProviderProps> = ({ children }) => {
  const [cursorStyle, setCursorStyle] = useState<string>("custom-cursor-hover");

  const setGrabCursor = () => {
    setCursorStyle("custom-cursor-grab");
    setTimeout(() => {
      setCursorStyle("custom-cursor-hover");
    }, 1000); // Revert after 1 second
  };

  return (
    <CursorContext.Provider value={{ cursorStyle, setGrabCursor }}>
      <div className={cursorStyle}>{children}</div>
    </CursorContext.Provider>
  );
};

export const useCursor = (): CursorContextType => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

