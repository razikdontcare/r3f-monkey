"use client";
import Scene from "@/components/Scene";
import { HomeSection } from "@/components/overlay";
import { useState } from "react";

export default function Home() {
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  return (
    <>
      <div
        className="h-screen relative mx-auto flex items-center justify-center overflow-hidden"
        onPointerMove={(e) => {
          setPointerPosition({
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: -(e.clientY / window.innerHeight) * 2 + 1,
          });
        }}
      >
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${pointerPosition.x * 20}px, ${
              pointerPosition.y * 20
            }px) scale(1.1)`,
          }}
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <Scene />
        <HomeSection />
      </div>
    </>
  );
}
