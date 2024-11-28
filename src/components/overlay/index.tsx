"use client";
import { useState } from "react";
import textBox from "./assets/text-box.png";
import Arrows from "@/components/overlay/Arrows";
import Image from "next/image";
import CharacterEvents from "@/components/overlay/CharacterEvents";
import Milestones from "@/components/overlay/Milestone";
import Socials from "@/components/overlay/Socials";
import BottomTextBox from "./BottomTextBox";
import PreloadTextures from "../utils/PreloadTextures";
import MuteSound from "./MuteSound";
import minimize from "./assets/icons/minimize.png";
import maximize from "./assets/icons/maximize.png";

export default function UIOverlay() {
  const [texturesReady, setTexturesReady] = useState(false);
  const [isMinimize, setIsMinimize] = useState(false);

  if (!texturesReady) {
    return (
      <>
        <PreloadTextures onReady={setTexturesReady} />
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="w-full h-full flex pointer-events-none p-2 ">
        <div className={`h-full flex justify-center pl-2 ${isMinimize ? 'items-end':'items-center'}`}>
          <div
            className={`w-fit pl-10 relative transition-all duration-300 ${isMinimize && 'mb-[5rem]'}`}
            style={{
              height: isMinimize ? "10%" : "auto", 
            }}
          >
            <Image
              src={textBox}
              alt="TEXT BOX"
              className={`w-[28rem] transition-all duration-300`}
              style={{
                height: "100%", 
              }}
              fetchPriority="low"
            />
            <div
              className="absolute top-0 right-0 bg-[#c1a08b] p-1 custom-cursor-hover pointer-events-auto"
              onClick={() => setIsMinimize(!isMinimize)} // Toggle minimize/maximize
            >
              <Image
                src={isMinimize ? maximize : minimize}
                className="w-[1rem]"
                alt="minimize or maximize"
              />
            </div>
          </div>
        </div>
      </div>

      <CharacterEvents />
      <Arrows />
      <Milestones />
      <Socials />
      <BottomTextBox />
      <MuteSound />
    </div>
  );
}

export { Arrows };
