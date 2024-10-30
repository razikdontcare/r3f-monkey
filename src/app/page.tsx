import BackgroundVideo from "@/ui/BackgroundVideo";
import Scene from "@/components/Scene";
import { HomeSection } from "@/ui/overlay";

export default function Home() {
  return (
    <>
      <BackgroundVideo>
        <Scene />
        <HomeSection />
      </BackgroundVideo>
    </>
  );
}
