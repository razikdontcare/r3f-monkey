"use client";

import { Canvas } from "@react-three/fiber";
import CameraRig from "@/components/CameraRig";
import { Environment } from "@react-three/drei";
import AdamEveEnv from "@/components/models/AdamEveEnv";
import { useControls } from "leva";

export default function Scene() {
  const { modelPos } = useControls({ modelPos: [0, 0, 0] });

  return (
    <>
      <Canvas>
        <Environment files={"sky.hdr"} background />
        {/* <directionalLight position={[0, 0, 2]} />
        <ambientLight intensity={2} /> */}
        {/* <SpotLight intensity={2} /> */}
        {/* <PerspectiveCamera
          makeDefault
          position={position}
          rotation={rotation}
        /> */}
        {/* <color attach="background" args={["#47b0d6"]} />
         */}
        <CameraRig>
          <group rotation={[0, 5, 0]} position={modelPos}>
            <mesh
              position={[1, 0.3, 0]}
              rotation={[0, -0.2, 0]}
              receiveShadow
              castShadow
            >
              <boxGeometry args={[0.2, 0.5, 0.2]} />
              <meshStandardMaterial color="hotpink" />
            </mesh>
            <AdamEveEnv />
          </group>
        </CameraRig>
      </Canvas>
    </>
  );
}
