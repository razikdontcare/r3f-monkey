"use client";
import Image from "next/image";
import milestones from "./assets/milestones.png";
import { useCameraPosition } from "@/utils/context";

import IconPrehistoric from "./assets/icons/icon-prehistoric.png";
import IconEgypt from "./assets/icons/icon-egypt.png";
import IconDynasty from "./assets/icons/icon-three-kingdoms.png";
import IconWW2 from "./assets/icons/icon-ww2.png";
import IconNYC from "./assets/icons/icon-nyc.png";

export default function Milestones() {
  const { setTargetPosition, targetPosition } = useCameraPosition();
  return (
    <>
      <div className="w-full mx-auto flex items-center justify-center absolute top-0 left-0 h-full pointer-events-none">
        <div className="absolute top-10  size-fit">
          <div className="relative">
            <Image src={milestones} alt="MILESTONES" className="w-[35rem]" fetchPriority="low" />
            <button
              id="prehistoric"
              className={`size-10 p-2 pointer-events-auto absolute top-1 left-1 rounded-full ${targetPosition[0] !== 0 && "bg-black/70"}`}
              onClick={() => {
                setTargetPosition([0, 0, 0]);
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={IconPrehistoric}
                  alt="PREHISTORIC"
                  fill
                  className={`object-contain`}
                  fetchPriority="low"
                />
              </div>
            </button>
            <button
              id="egypt"
              className={`size-10 p-2 pointer-events-auto absolute top-1 left-[8.2rem] rounded-full ${targetPosition[0] !== 10 && "bg-black/70"}`}
              onClick={() => {
                setTargetPosition([10, 0, 0]);
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={IconEgypt}
                  alt="EGYPT"
                  fill
                  className={`object-contain`}
                  fetchPriority="low"
                />
              </div>
            </button>
            <button
              id="dynasty"
              className={`size-10 p-2 pointer-events-auto absolute top-1 left-[16.25rem] rounded-full ${targetPosition[0] !== 20 && "bg-black/70"}`}
              onClick={() => {
                setTargetPosition([20, 0, 0]);
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={IconDynasty}
                  alt="THREE KINGDOMS"
                  fill
                  className={`object-contain`}
                  fetchPriority="low"
                />
              </div>
            </button>
            <button
              id="ww2"
              className={`size-10 p-2 pointer-events-auto absolute top-1 right-[8.1rem] rounded-full ${targetPosition[0] !== 30 && "bg-black/70"}`}
              onClick={() => {
                setTargetPosition([30, 0, 0]);
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={IconWW2}
                  alt="WW2"
                  fill
                  className={`object-contain`}
                  fetchPriority="low"
                />
              </div>
            </button>
            <button
              id="nyc"
              className={`size-10 p-2 pointer-events-auto absolute top-1 right-1 rounded-full ${targetPosition[0] !== 40 && "bg-black/70"}`}
              onClick={() => {
                setTargetPosition([40, 0, 0]);
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={IconNYC}
                  alt="NYC"
                  fill
                  className={`object-contain`}
                  fetchPriority="low"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
