"use client";
export const dynamic = "force-dynamic";
import Lottie from "lottie-react";
import * as loadingAnimation from "@/animation/loading.json";

export function LoadingAnimation() {
  return (
    <Lottie
      animationData={loadingAnimation}
      autoPlay
      loop
      className="size-96"
    />
  );
}
