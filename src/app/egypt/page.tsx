import { EgyptScene } from "@/components/Scene";
import { EgyptSection } from "@/components/overlay";

export default function Egypt() {
  return (
    <>
      <div className="h-screen relative mx-auto flex items-center justify-center overflow-hidden">
        <EgyptScene />
        <EgyptSection />
      </div>
    </>
  );
}
