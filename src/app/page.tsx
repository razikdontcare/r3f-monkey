import Scene from "@/components/Scene";
import UIOverlay from "@/components/overlay";
import {
  CameraPositionProvider,
  CharacterEventsProvider,
} from "@/utils/context";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense>
        <CameraPositionProvider>
          <CharacterEventsProvider>
            <div className="h-screen relative mx-auto flex items-center justify-center overflow-hidden">
              <Scene />
              <UIOverlay />
            </div>
          </CharacterEventsProvider>
        </CameraPositionProvider>
      </Suspense>
    </>
  );
}
