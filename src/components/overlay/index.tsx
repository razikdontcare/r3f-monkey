"use client";
import textBox from "./assets/text-box.png";
import milestones from "./assets/milestones.png";

import Arrows from "@/components/overlay/Arrows";
import Image from "next/image";
import { useCameraPosition } from "@/utils/context";
import CharacterEvents from "@/components/overlay/CharacterEvents";

export default function UIOverlay() {
  const { setTargetPosition } = useCameraPosition();

  const width = 28;
  const height = 2.5;

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <CharacterEvents />
      <div className="w-full h-full flex pointer-events-none p-2">
        <Image src={textBox} alt="TEXT BOX" className="h-full" />
        <div className="relative">
          <button
            id="prehistoric"
            className="py-5 px-6 pointer-events-auto absolute top-5 left-6 rounded-full"
            onClick={() => setTargetPosition([0, 0, 0])}
          />
          <button
            id="egypt"
            className="py-5 px-6 pointer-events-auto absolute top-5 left-44 rounded-full"
            onClick={() => setTargetPosition([10, 0, 0])}
          />
          <button
            id="dynasty"
            className="py-5 px-6 pointer-events-auto absolute top-5 left-[20.6rem] rounded-full"
            onClick={() => setTargetPosition([20, 0, 0])}
          />
          <button
            id="ww2"
            className="py-5 px-6 pointer-events-auto absolute top-5 left-[30.4rem] rounded-full"
            onClick={() => setTargetPosition([30, 0, 0])}
          />
          <button
            id="nyc"
            className="py-5 px-6 pointer-events-auto absolute top-5 left-[39.9rem] rounded-full"
            onClick={() => setTargetPosition([40, 0, 0])}
          />
          <Image
            src={milestones}
            alt="MILESTONES"
            className={`w-[${width}rem] h-[${height}rem] mt-5 ml-5`}
          />
        </div>
      </div>

      <Arrows />
    </div>
  );
}

export { Arrows };
