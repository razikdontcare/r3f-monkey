"use client";
import { useCameraPosition, useCharacterEvents } from "@/utils/context";
import Image from "next/image";
import { useEffect, useState } from "react";

import tablet from "./assets/tablet.png";
import scroll from "./assets/sun-tzu-scroll.png";
import iphone from "./assets/iphone-x.png";
import textbox from "./assets/text-box-square.png";

import x from "./assets/x.png";

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
      <NYCOverlay show={visibleEvent === "nyc" && targetPosition[0] === 40} />
    </>
  );
}

function EgyptOverlay({ show }: { show: boolean }) {
  const { setEvent } = useCharacterEvents();

  return (
    <div
      className={`w-full h-full pointer-events-none absolute left-0 bottom-0 flex items-center justify-center transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <div className="flex items-center gap-16 relative">
        <Image src={tablet} alt="TABLETS" />
        <Image src={tablet} alt="TABLETS" />
        <div className="absolute right-0 top-0 size-8">
          <Image
            onClick={() => setEvent(null)}
            src={x}
            alt="CLOSE"
            className="pointer-events-auto cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

function DynastyOverlay({ show }: { show: boolean }) {
  const { setEvent } = useCharacterEvents();

  return (
    <div
      className={`w-full h-full pointer-events-none absolute left-0 top-0 flex items-center justify-center transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <div className="flex items-center w-[38rem] mt-10 relative">
        <Image src={scroll} alt="SUN TZU SCROLL" />
        <div className="absolute right-20 top-2 size-8">
          <Image
            onClick={() => setEvent(null)}
            src={x}
            alt="CLOSE"
            className="pointer-events-auto cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
function NYCOverlay({ show }: { show: boolean }) {
  const { setEvent } = useCharacterEvents();

  return (
    <div
      className={`w-full h-full pointer-events-none absolute left-0 top-0 flex items-center justify-center transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <div className="flex items-center w-96 mt-10 relative">
        <Image src={iphone} alt="IPHONE X" />
        <div className="absolute right-0 top-0 size-8">
          <Image
            onClick={() => setEvent(null)}
            src={x}
            alt="CLOSE"
            className="pointer-events-auto cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
function WW2Overlay({ show }: { show: boolean }) {
  const { setEvent } = useCharacterEvents();

  return (
    <div
      className={`w-full h-full pointer-events-none absolute left-0 top-0 flex items-center justify-center transition-all duration-300 ${
        show ? "scale-100 opacity-100" : "scale-50 opacity-0"
      }`}
    >
      <div className="flex items-center relative gap-16">
        <Image src={textbox} alt="TEXTBOX" className="size-96" />
        <Image src={textbox} alt="TEXTBOX" className="size-96" />
        <div className="absolute -right-1 -top-1 size-8">
          <Image
            onClick={() => setEvent(null)}
            src={x}
            alt="CLOSE"
            className="pointer-events-auto cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
