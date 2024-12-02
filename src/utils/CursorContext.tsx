"use client"

import React, { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext({
  cursorStyle: 'custom-cursor-hover',
  setCursorStyle: (style: string) => {},
  setTemporaryCursorStyle: (style: string) => {},
});

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorStyle, setCursorStyle] = useState('custom-cursor-hover');

  const setTemporaryCursorStyle = useCallback((style: string) => {
    setCursorStyle(style);
    setTimeout(() => setCursorStyle('custom-cursor-hover'), 500);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorStyle, setCursorStyle, setTemporaryCursorStyle }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);


