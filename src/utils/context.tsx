"use client";
import React, { createContext, useContext, useState } from "react";

interface CameraPositionProps {
  targetPosition: [number, number, number];
  setTargetPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
}

const CameraPosition = createContext<CameraPositionProps>({
  targetPosition: [0, 0, 0],
  setTargetPosition: () => {},
});

export function CameraPositionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [targetPosition, setTargetPosition] = useState<
    [number, number, number]
  >([0, 0, 0]);

  return (
    <CameraPosition.Provider value={{ targetPosition, setTargetPosition }}>
      {children}
    </CameraPosition.Provider>
  );
}

export function useCameraPosition() {
  const { targetPosition, setTargetPosition } = useContext(CameraPosition);
  return { targetPosition, setTargetPosition };
}
