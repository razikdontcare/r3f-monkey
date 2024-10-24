import Scene from "@/components/Scene";
import { HomeSection } from "@/components/overlay";

export default function Home() {
  return (
    <>
      <div className="h-screen mx-auto bg-neutral-800 flex items-center justify-center">
        <Scene />
        <HomeSection />
      </div>
    </>
  );
}
