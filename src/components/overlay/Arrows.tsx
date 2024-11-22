"use client";
import { useCameraPosition } from "@/utils/context";
import React from "react";

export default function Arrows() {
  const { setTargetPosition, targetPosition } = useCameraPosition();

  const SCENE_COUNT = 5;
  const SCENE_STEP = 10;
  const MAX_POSITION = (SCENE_COUNT - 1) * SCENE_STEP;

  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setTargetPosition(
      targetPosition[0] + SCENE_STEP > MAX_POSITION
        ? [0, 0, 0]
        : [targetPosition[0] + SCENE_STEP, 0, 0]
    );
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setTargetPosition(
      targetPosition[0] - SCENE_STEP < 0
        ? [MAX_POSITION, 0, 0]
        : [targetPosition[0] - SCENE_STEP, 0, 0]
    );
  };

  return (
    <>
      <div className="w-full mx-auto flex items-center justify-center absolute top-0 left-0 h-full pointer-events-none">
        <div className="w-full mx-auto flex flex-col items-center justify-center text-center gap-10">
          <div className="w-full mx-auto px-4 flex items-center justify-between gap-5 text-white pointer-events-none">
            <button
              onClick={handlePrev}
              className="bg-[#b98c63] hover:bg-[#cc9c73] disabled:bg-[#946b54] rounded text-white p-2 pointer-events-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="bg-[#b98c63] hover:bg-[#cc9c73] disabled:bg-[#946b54] rounded p-2 pointer-events-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
