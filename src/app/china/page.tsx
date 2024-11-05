import { ChinaScene } from "@/components/Scene";
import { ChinaSection } from "@/components/overlay";

export default function China() {
  return (
    <>
      <div className="h-screen relative mx-auto flex items-center justify-center overflow-hidden">
        <ChinaScene />
        <ChinaSection />
      </div>
    </>
  );
}
