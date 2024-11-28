import FollowingCursor from "@/components/FollowingCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Scene from "@/components/Scene";
import UIOverlay from "@/components/overlay";
import { MusicProvider } from "@/utils/MusicContext";
import {
  CameraPositionProvider,
  CharacterEventsProvider,
} from "@/utils/context";

export default function Home() {
  return (
    <>
      <CameraPositionProvider>
        <CharacterEventsProvider>
          <MusicProvider>
            {/* <LoadingScreen /> */}
            <div className="h-screen relative mx-auto flex items-center justify-center overflow-hidden ">
              <Scene />
              <UIOverlay />
              <FollowingCursor />
            </div>
          </MusicProvider>
        </CharacterEventsProvider>
      </CameraPositionProvider>
    </>
  );
}
