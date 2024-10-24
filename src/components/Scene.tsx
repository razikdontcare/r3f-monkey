"use client";

import { Canvas } from "@react-three/fiber";
import CameraRig from "@/components/CameraRig";
// import { PerspectiveCamera } from "@react-three/drei";
import AdamEveEnv from "@/components/models/AdamEveEnv";
import { useControls } from "leva";
// import { SpotLight } from "@react-three/drei";

export default function Scene() {
  const { modelPos } = useControls({ modelPos: [-0.4, 0, 0] });

  return (
    <>
      <Canvas>
        {/* <directionalLight position={[0, 0, 2]} />
        <ambientLight intensity={2} /> */}
        {/* <SpotLight intensity={2} /> */}
        {/* <PerspectiveCamera
          makeDefault
          position={position}
          rotation={rotation}
        /> */}
        <CameraRig>
          <group rotation={[0, 5, 0]} position={modelPos}>
            <AdamEveEnv />
          </group>
        </CameraRig>
      </Canvas>
    </>
  );
}
