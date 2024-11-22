"use client";
import textBox from "./assets/text-box.png";

import Arrows from "@/components/overlay/Arrows";
import Image from "next/image";
import CharacterEvents from "@/components/overlay/CharacterEvents";
import Milestones from "./Milestone";
import { useCameraPosition } from "@/utils/context";

export default function UIOverlay() {
  const { setTargetPosition, targetPosition } = useCameraPosition();

  const SCENE_COUNT = 5;
  const SCENE_STEP = 10;
  const MAX_POSITION = (SCENE_COUNT - 1) * SCENE_STEP;

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setTargetPosition(
      targetPosition[0] - SCENE_STEP < 0
        ? [MAX_POSITION, 0, 0]
        : [targetPosition[0] - SCENE_STEP, 0, 0]
    );
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <CharacterEvents />
      <div className="w-full h-full flex pointer-events-none p-2">
        <div className="h-full flex items-center justify-center pl-2">
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
          <div className="w-fit h-fit">
            <Image src={textBox} alt="TEXT BOX" className="w-[28rem]" />
          </div>
        </div>
      </div>

      <Arrows />
      <Milestones />
    </div>
  );
}

export { Arrows };
