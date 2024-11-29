"use client";
import { useCameraPosition, useCharacterEvents } from "@/utils/context";
import Image from "next/image";
import { useEffect, useState } from "react";
import tablet from "./assets/tablet.png";
import longTablet from "./assets/long-tablet.png";
import sunTzuScrollSmall from "./assets/sun-tzu-scroll-small.png";
import sunTzuScrollLarge from "./assets/sun-tzu-scroll-large.png";
import ipad from "./assets/ipad.png";

import Tiktok from "../tiktok";
import JournalBook from "../journalBook/index";
import { useMusic } from "@/utils/MusicContext";


interface CharacterEventsProps {
  setIsMinimize: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CharacterEvents({ setIsMinimize }: CharacterEventsProps) {
  const { event } = useCharacterEvents();
  const { targetPosition } = useCameraPosition();
  const [visibleEvent, setVisibleEvent] = useState<
    "prehistoric" | "egypt" | "dynasty" | "ww2" | "nyc" | null
  >(null);

  useEffect(() => {
    if(event && targetPosition[0] === 0){
      console.log('ya')

    }else if (
      event &&
      (targetPosition[0] === 10 ||
        targetPosition[0] === 20 ||
        targetPosition[0] === 30 ||
        targetPosition[0] === 40)
    ) {
      setVisibleEvent(event); // Tetapkan event yang aktif
      setIsMinimize(true)
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
        <div onClick={handleContentClick} className="flex items-center gap-16 relative lg:w-[70rem]">
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
        <div onClick={handleContentClick} className="flex items-center w-[80vw] lg:w-[60vw] mt-10 relative " >
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
          <div className="absolute px-[15%] my-[15%] text-[2vw] text-black font-black tracking-[.1vw] w-full h-[55%] overflow-y-auto no-scrollbar">
              The Art of Him<br/>
              To Ape is the essence of Him<br/>
              To fade one's ancestors is to ensure one’s own self destruction<br/>
              Before Man, came HIM. Before liquidity came the swim<br/>
              One should elect HIM regardless of one's personal gender<br/>
              He will win, he who knows what to shill and what to FUD<br/>
              If the fudder has a temper, irritate them by apeing<br/>
              If a pump is near, make them believe it is distant<br/>
              In times of FUD, shill the Father of Man, and one's own ancestry, unifier of humanity - HIM<br/>
              He who knows when to ape and when to hold shall find eternal bliss & tranquility<br/>
              If you know the FUD and know HIM need not fear the results of one hundred jeets<br/>
              The supreme art of Him is to APE first and thank HIM second<br/>
              In times of darkness, encourage FUD and pretend CTO<br/>
              He will cook, HIM with the diamond hands<br/>
              Supreme excellence is to sweat for the bags of HIMself<br/>
              Remember blood, for mankind can find eternal tranquility only through loving fellow HIMs as they love HIMself.
          </div>
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