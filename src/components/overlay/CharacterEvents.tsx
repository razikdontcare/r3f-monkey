"use client";
import { useCameraPosition, useCharacterEvents } from "@/utils/context";
import Image from "next/image";
import { useEffect, useState, MutableRefObject } from "react";
import tablet from "./assets/tablet.png";
import longTablet from "./assets/long-tablet.png";
import sunTzuScrollSmall from "./assets/sun-tzu-scroll-small.png";
import sunTzuScrollLarge from "./assets/sun-tzu-scroll-large.png";
import ipad from "./assets/ipad.png";

import Tiktok from "../tiktok";
import JournalBook from "../journalBook/index";
import { useMusic } from "@/utils/MusicContext";


export default function CharacterEvents() {
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
      <NYCOverlay show={visibleEvent === "nyc" && targetPosition[0] === 40}/>
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
      className={`w-full h-full  ${show ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-0 bottom-0 flex items-center justify-center transition-all duration-300 ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
    >
      {show && (
        <div onClick={handleContentClick} className="flex items-center gap-16 relative lg:w-[35rem]">
          <Image
            src={tablet}
            alt="TABLETS"
            className={`${show ? "block md:hidden pointer-events-auto" : "pointer-events-none"}`}
            fetchPriority="low"
          />
          <Image
            src={tablet}
            alt="TABLETS"
            className={`${show ? "block md:hidden pointer-events-auto" : "pointer-events-none"}`}
            fetchPriority="low"
          />
          <Image
            src={longTablet}
            alt="LONG TABLETS"
            className={`${show ? "hidden sm:block pointer-events-auto" : "pointer-events-none"}`}
            fetchPriority="low"
          />
        </div>
      )}
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
      className={`w-full h-full ${show ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-0 top-0 flex items-center justify-center transition-all duration-300 ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
    >
      {show && (
        <div onClick={handleContentClick} className="flex items-center w-[28rem] lg:w-[35rem] mt-10 relative " >
          <Image
            src={sunTzuScrollSmall}
            alt="SUN TZU SCROLL"
            className={`${show ? "block sm:hidden pointer-events-auto" : "pointer-events-none"}`}
            fetchPriority="low"
          />
          <Image
            src={sunTzuScrollLarge}
            alt="SUN TZU SCROLL"
            className={`${show ? "hidden sm:block pointer-events-auto" : "pointer-events-none"}`}
            fetchPriority="low"
          />
        </div>
      )}
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
      className={`w-full h-full ${show ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-0 top-0 flex items-center justify-center transition-all duration-300 ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"
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

function NYCOverlay({ show }: { show: boolean}) {
  const { setEvent } = useCharacterEvents();
  const { playMusic } = useMusic();

  const handleOverlayClick = () => {
    setEvent(null);
    playMusic()
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className={`w-full h-full ${show ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-0 top-0 flex items-center justify-center transition-all duration-300 ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
    >
      <div onClick={handleContentClick} className="flex items-center md:w-[28vw] w-[80vw] mt-5 relative">
        <Image src={ipad} alt="IPAD" />
        <div className={`absolute w-[100%] px-[1.5%] top-[1%] h-[98%] overflow-y-auto no-scrollbar ${show && 'pointer-events-auto'} `}>
          <div className="h-full">
            {show && (
              <Tiktok />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}