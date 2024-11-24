import LoadingScreen from "@/components/LoadingScreen";
import Scene from "@/components/Scene";
import UIOverlay from "@/components/overlay";
import {
  CameraPositionProvider,
  CharacterEventsProvider,
} from "@/utils/context";

export default function Home() {
  return (
    <>
      <CameraPositionProvider>
        <CharacterEventsProvider>
          <LoadingScreen />
          <div className="h-screen relative mx-auto flex items-center justify-center overflow-hidden">
            <Scene />
            <UIOverlay />
          </div>
        </CharacterEventsProvider>
      </CameraPositionProvider>
    </>
  );
}
