"use client";
import textBox from "./assets/text-box.png";

import Arrows from "@/components/overlay/Arrows";
import Image from "next/image";
import CharacterEvents from "@/components/overlay/CharacterEvents";
import Milestones from "./Milestone";

export default function UIOverlay() {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <CharacterEvents />
      <div className="w-full h-full flex pointer-events-none p-2">
        <div className="h-full flex items-center justify-center">
          <div className="pl-14 w-fit h-fit">
            <Image src={textBox} alt="TEXT BOX" className="w-[28rem]" />
          </div>
        </div>
        <div className="relative z-10"></div>
      </div>

      <Arrows />
      <Milestones />
    </div>
  );
}

export { Arrows };
