import Scene from "@/components/Scene";
import UIOverlay from "@/components/overlay";
import { CameraPositionProvider } from "@/utils/context";

export default function Home() {
  return (
    <>
      <CameraPositionProvider>
        <div className="h-screen relative mx-auto flex items-center justify-center overflow-hidden">
          <Scene />
          <UIOverlay />
        </div>
      </CameraPositionProvider>
    </>
  );
}
