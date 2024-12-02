"use client";
import Image from "next/image";
import milestones from "./assets/milestones.png";
import { useCameraPosition } from "@/utils/context";
import { useCursor } from "@/utils/CursorContext";

import IconPrehistoric from "./assets/icons/icon_prehistoric.png";
import IconEgypt from "./assets/icons/icon_egypt.png";
import IconDynasty from "./assets/icons/icon_three_kingdoms.png";
import IconWW2 from "./assets/icons/icon_ww2.png";
import IconNYC from "./assets/icons/icon_nyc.png";
import IconPrehistoricActive from "./assets/icons/icon_prehistoric_active.png";
import IconEgyptActive from "./assets/icons/icon_egypt_active.png";
import IconDynastyActive from "./assets/icons/icon_three_kingdoms_active.png";
import IconWW2Active from "./assets/icons/icon_ww2_active.png";
import IconNYCActive from "./assets/icons/icon_nyc_active.png";

export default function Milestones() {
  const { setTargetPosition, targetPosition } = useCameraPosition();
  const { cursorStyle,setTemporaryCursorStyle } = useCursor();

  const handleClick = (position: [number,number,number]) => {
    setTemporaryCursorStyle("custom-cursor-grab"); 
    setTargetPosition(position);
  };

  return (
    <div className="w-full mx-auto flex items-center justify-center absolute top-0 left-0 h-full pointer-events-none">
      <div className="absolute top-10 size-fit">
        <div className="relative">
          <Image src={milestones} alt="MILESTONES" className="w-[35rem]" fetchPriority="low" />
          <button
            id="prehistoric"
            className={`${cursorStyle} size-10 pointer-events-auto absolute top-1 left-1 rounded-full ${targetPosition[0] !== 0 && "p-2"}`}
            onClick={() => handleClick([0, 0, 0])}
          >
            <div className="relative w-full h-full">
              <Image
                src={targetPosition[0] === 0 ? IconPrehistoricActive : IconPrehistoric}
                alt="PREHISTORIC"
                fill
                className={`object-contain icon`}
                fetchPriority="low"
              />
            </div>
          </button>
          <button
            id="egypt"
            className={`${cursorStyle} size-10 pointer-events-auto absolute top-1 left-[8.2rem] rounded-full ${targetPosition[0] !== 10 && "p-2"}`}
            onClick={() => handleClick([10, 0, 0])}
          >
            <div className="relative w-full h-full">
              <Image
                src={targetPosition[0] === 10 ? IconEgyptActive : IconEgypt}
                alt="EGYPT"
                fill
                className={`object-contain icon`}
                fetchPriority="low"
              />
            </div>
          </button>
          <button
            id="dynasty"
            className={`${cursorStyle} size-10 pointer-events-auto absolute top-1 left-[16.25rem] rounded-full ${targetPosition[0] !== 20 && "p-2"}`}
            onClick={() => handleClick([20, 0, 0])}
          >
            <div className="relative w-full h-full">
              <Image
                src={targetPosition[0] === 20 ? IconDynastyActive : IconDynasty}
                alt="THREE KINGDOMS"
                fill
                className={`object-contain icon`}
                fetchPriority="low"
              />
            </div>
          </button>
          <button
            id="ww2"
            className={`${cursorStyle} size-10 pointer-events-auto absolute top-1 right-[8.1rem] rounded-full ${targetPosition[0] !== 30 && "p-2"}`}
            onClick={() => handleClick([30, 0, 0])}
          >
            <div className="relative w-full h-full">
              <Image
                src={targetPosition[0] === 30 ? IconWW2Active : IconWW2}
                alt="WW2"
                fill
                className={`object-contain icon`}
                fetchPriority="low"
              />
            </div>
          </button>
          <button
            id="nyc"
            className={`${cursorStyle} size-10 pointer-events-auto absolute top-1 right-1 rounded-full ${targetPosition[0] !== 40 && "p-2"}`}
            onClick={() => handleClick([40, 0, 0])}
          >
            <div className="relative w-full h-full">
              <Image
                src={targetPosition[0] === 40 ? IconNYCActive : IconNYC}
                alt="NYC"
                fill
                className={`object-contain icon`}
                fetchPriority="low"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
