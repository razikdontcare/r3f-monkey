"use client";

import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
    }
  }, [progress]);

  return loading ? (
    <div className="h-screen w-screen flex absolute z-50 top-0 left-0 items-center justify-center bg-black">
      <div className="text-white text-2xl">Loading {progress}%</div>
    </div>
  ) : (
    <div className="h-screen w-screen flex absolute z-50 top-0 left-0 items-center justify-center bg-black/10">
      <div className="text-white text-2xl">Loading Finished</div>
    </div>
  );
}
