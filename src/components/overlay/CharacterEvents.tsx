"use client";
import { useCameraPosition, useCharacterEvents } from "@/utils/context";
import Image from "next/image";
import { useEffect, useState,MutableRefObject } from "react";
import tablet from "./assets/tablet.png";
import scroll from "./assets/sun-tzu-scroll.png";
import ipad from "./assets/ipad.png";

import Tiktok from "../tiktok";
import JournalBook from "../journalBook/index";

export default function CharacterEvents({ bgAudioRef }: {bgAudioRef:MutableRefObject<HTMLAudioElement | null>}) {
  const { event } = useCharacterEvents();
  const { targetPosition } = useCameraPosition();
  const [visibleEvent, setVisibleEvent] = useState<
    "prehistoric" | "egypt" | "dynasty" | "ww2" | "nyc" | null
  >(null);

  useEffect(() => {
    if (
      event &&
      (targetPosition[0] === 10 ||
        targetPosition[0] === 20 ||
        targetPosition[0] === 30 ||
        targetPosition[0] === 40)
    ) {
      setVisibleEvent(event); // Tetapkan event yang aktif
    } else {
      setVisibleEvent(null); // Sembunyikan
    }
  }, [event, targetPosition]);

  return (
    <>
      <EgyptOverlay
        show={visibleEvent === "egypt" && targetPosition[0] === 10}
      />
      <DynastyOverlay
        show={visibleEvent === "dynasty" && targetPosition[0] === 20}
      />
      <WW2Overlay show={visibleEvent === "ww2" && targetPosition[0] === 30} />
      <NYCOverlay show={visibleEvent === "nyc" && targetPosition[0] === 40} bgAudioRef={bgAudioRef} />
    </>
  );
}

function EgyptOverlay({ show }: { show: boolean }) {
  const { setEvent } = useCharacterEvents();

  const handleOverlayClick = () => {
    setEvent(null);
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`w-full h-full  ${ show ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-0 bottom-0 flex items-center justify-center transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <div onClick={handleContentClick} className="flex items-center gap-16 relative">
        <Image
          src={tablet}
          alt="TABLETS"
          className={`${show ? "pointer-events-auto" : "pointer-events-none"}`}
        />
        <Image
          src={tablet}
          alt="TABLETS"
          className={`${show ? "pointer-events-auto" : "pointer-events-none"}`}
        />
      </div>
    </div>
  );
}

function DynastyOverlay({ show }: { show: boolean }) {
  const { setEvent } = useCharacterEvents();

  const handleOverlayClick = () => {
    setEvent(null);
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`w-full h-full ${ show ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-0 top-0 flex items-center justify-center transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <div onClick={handleContentClick} className="flex items-center w-[28rem] mt-10 relative " >
        <Image
          src={scroll}
          alt="SUN TZU SCROLL"
          className={`${show ? "pointer-events-auto" : "pointer-events-none"}`}
        />
      </div>
    </div>
  );
}

function WW2Overlay({ show }: { show: boolean }) {
  const { setEvent } = useCharacterEvents();

  const handleOverlayClick = () => {
    setEvent(null);
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`w-full h-full ${ show ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-0 top-0 flex items-center justify-center transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <div onClick={handleContentClick} className={`flex items-center relative gap-16 ${show && 'pointer-events-auto'}`}>
        { show && (
            <JournalBook />
        )}
      </div>
    </div>
  );
}

function NYCOverlay({ show, bgAudioRef }: { show: boolean , bgAudioRef:MutableRefObject<HTMLAudioElement | null> }) {
  const { setEvent } = useCharacterEvents();

  const handleOverlayClick = () => {
    setEvent(null);
    if (bgAudioRef.current) {
        bgAudioRef.current.play()
    }
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`w-full h-full ${ show ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-0 top-0 flex items-center justify-center transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <div  onClick={handleContentClick} className="flex items-center md:w-[28vw] w-[80vw] mt-5 relative">
        <Image src={ipad} alt="IPAD" />
        <div className={`absolute w-[100%] px-[1.5%] top-[1%] h-[98%] overflow-y-auto no-scrollbar ${show && 'pointer-events-auto'} `}>
          <div className="h-full">
            { show && (
              <Tiktok bgAudioRef={bgAudioRef}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}