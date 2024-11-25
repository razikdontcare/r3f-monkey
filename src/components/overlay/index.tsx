"use client";
import { useRef, useEffect } from "react";
import textBox from "./assets/text-box.png";
import Arrows from "@/components/overlay/Arrows";
import Image from "next/image";
import CharacterEvents from "@/components/overlay/CharacterEvents";
import Milestones from "@/components/overlay/Milestone";
import Socials from "@/components/overlay/Socials";
import BottomTextBox from "./BottomTextBox";

export default function UIOverlay() {
  const bgAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.play().catch((error) => {
        console.error("Autoplay error:", error);
      });
    }
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="w-full h-full flex pointer-events-none p-2">
        <div className="h-full flex items-center justify-center pl-2">
          <div className="w-fit h-fit pl-10">
            <Image src={textBox} alt="TEXT BOX" className="w-[28rem]" />
          </div>
        </div>
      </div>
      <audio ref={bgAudioRef} loop>
        <source src="/audio/Indila - Tourner Dans Le Vide (no vocal) (Instrumental).mp3" />
      </audio>

      <CharacterEvents bgAudioRef={bgAudioRef} />
      <Arrows />
      <Milestones />
      <Socials />
      <BottomTextBox />
    </div>
  );
}

export { Arrows };
