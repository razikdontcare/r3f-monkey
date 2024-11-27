import LoadingScreen from "@/components/LoadingScreen";
import Scene from "@/components/Scene";
import UIOverlay from "@/components/overlay";
import {
  CameraPositionProvider,
  CharacterEventsProvider,
} from "@/utils/context";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/adams-creation/background.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/adams-creation/character.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/austrian-painter/background.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/austrian-painter/character.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/battle-of-hu-lao-gate-2/background.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/battle-of-hu-lao-gate-2/character.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/boxing/background.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/boxing/character.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/moses/background.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/first-Sequence/moses/character.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/three-kingdom/background.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/three-kingdom/character.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/abraham/background.jpeg" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/abraham/character.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/adam-eve/background.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/adam-eve/character.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/leonardo/background.jpg" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/leonardo/character.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/mlk/background.png" />
        <link rel="preload" as="image" href="/preloader/preloader-images/second-Sequence/mlk/character.png" />
      </Head>
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
