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

interface CharacterEventsProps {
  event: "prehistoric" | "egypt" | "dynasty" | "ww2" | "nyc" | null;
  setEvent: React.Dispatch<
    React.SetStateAction<
      "prehistoric" | "egypt" | "dynasty" | "ww2" | "nyc" | null
    >
  >;
}

const CharacterEvents = createContext<CharacterEventsProps>({
  event: null,
  setEvent: () => {},
});

export function CharacterEventsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [event, setEvent] = useState<
    "prehistoric" | "egypt" | "dynasty" | "ww2" | "nyc" | null
  >(null);

  return (
    <CharacterEvents.Provider value={{ event, setEvent }}>
      {children}
    </CharacterEvents.Provider>
  );
}

export function useCharacterEvents() {
  const { event, setEvent } = useContext(CharacterEvents);
  return { event, setEvent };
}
