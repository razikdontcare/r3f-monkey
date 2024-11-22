import { useCameraPosition, useCharacterEvents } from "@/utils/context";
import Image from "next/image";

import tablets from "./assets/tablets.png";
import scroll from "./assets/sun-tzu-scroll.png";

export default function CharacterEvents() {
  const { event } = useCharacterEvents();
  const { targetPosition } = useCameraPosition();

  if (!event) return null;
  if (event === "egypt" && targetPosition[0] === 10) return <EgyptOverlay />;
  if (event === "dynasty" && targetPosition[0] === 20)
    return <DynastyOverlay />;
}

function EgyptOverlay() {
  return (
    <>
      <div className="w-full h-full px-[25rem] pr-10 pointer-events-none absolute left-0 top-0 flex items-center justify-center">
        <Image src={tablets} alt="TABLETS" />
      </div>
    </>
  );
}

function DynastyOverlay() {
  return (
    <>
      <div className="w-full h-full px-[40rem] pr-10 pointer-events-none absolute left-0 top-0 flex items-center justify-center">
        <Image src={scroll} alt="SUN TZU SCROLL" className="w-[40rem]" />
      </div>
    </>
  );
}
