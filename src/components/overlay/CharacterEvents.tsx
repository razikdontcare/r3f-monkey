import { useCameraPosition, useCharacterEvents } from "@/utils/context";
import Image from "next/image";
import { useEffect, useState, MutableRefObject } from "react";
import tablet from "./assets/tablet.png";
import scroll from "./assets/sun-tzu-scroll.png";
import ipad from "./assets/ipad.png";
import Tiktok from "../tiktok";
import JournalBook from "../JournalBook";

export default function CharacterEvents({ bgAudioRef }: { bgAudioRef: MutableRefObject<HTMLAudioElement | null> }) {
  const { event } = useCharacterEvents();
  const { targetPosition } = useCameraPosition();
  const [visibleEvent, setVisibleEvent] = useState<
    "prehistoric" | "egypt" | "dynasty" | "ww2" | "nyc" | null
  >(null);

  useEffect(() => {
    if (event && [10, 20, 30, 40].includes(targetPosition[0])) {
      setVisibleEvent(event);
    } else {
      setVisibleEvent(null);
    }
  }, [event, targetPosition]);

  return (
    <>
      {/* egypt */}
      <Overlay
        show={visibleEvent === "egypt" && targetPosition[0] === 10}
        onClose={() => setVisibleEvent(null)}
      >
        <div className="flex items-center gap-16">
          <Image src={tablet} alt="TABLET 1" />
          <Image src={tablet} alt="TABLET 2" />
        </div>
      </Overlay>


      {/* dynasty */}
      <Overlay
        show={visibleEvent === "dynasty" && targetPosition[0] === 20}
        onClose={() => setVisibleEvent(null)}
      >
        <div className="w-[28rem] mt-10">
          <Image src={scroll} alt="SUN TZU SCROLL" />
        </div>
      </Overlay>


      {/* ww2 */}
      <Overlay
        show={visibleEvent === "ww2" && targetPosition[0] === 30}
        onClose={() => setVisibleEvent(null)}
      >
        <div className="relative gap-16">
          <JournalBook />
        </div>
      </Overlay>


      {/* nyc */}
      <Overlay
        show={visibleEvent === "nyc" && targetPosition[0] === 40}
        onClose={() => {
          setVisibleEvent(null);
          bgAudioRef.current?.play();
        }}
      >
        <div className="md:w-[28vw] w-[80vw] mt-5 relative">
          <Image src={ipad} alt="IPAD" />
          <div className="absolute w-full px-[1.5%] top-[1%] h-[98%] overflow-y-auto no-scrollbar">
            <div className="h-full">
              <Tiktok bgAudioRef={bgAudioRef} />
            </div>
          </div>
        </div>
      </Overlay>
    </>
  );
}

function Overlay({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className={`w-full h-full ${
        show ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-50 opacity-0"
      } absolute left-0 top-0 flex items-center justify-center transition-all duration-300`}
    >
      <div onClick={handleContentClick} className="relative">
        {children}
      </div>
    </div>
  );
}
