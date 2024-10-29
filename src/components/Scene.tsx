"use client";

import { Canvas } from "@react-three/fiber";
import CameraRig from "@/components/CameraRig";
import { Environment, BakeShadows } from "@react-three/drei";
import { useControls } from "leva";
import { EffectComposer, SMAA, Bloom } from "@react-three/postprocessing";

// model
import AdamEveEnv from "@/components/models/AdamEveEnv";
// import Egypt from "@/components/models/EGYPT";

export default function Scene() {
  const { modelPos } = useControls({ modelPos: [0, 0, 0] });

  return (
    <>
      <Canvas>
        <EffectComposer multisampling={0}>
          <SMAA />
          <Bloom
            luminanceThreshold={0}
            mipmapBlur
            luminanceSmoothing={0.0}
            intensity={1}
          />
        </EffectComposer>
        <Environment files={"sky.hdr"} environmentIntensity={0.01} />
        <CameraRig>
          <group rotation={[0, 5, 0]} position={modelPos}>
            <mesh
              position={[0, 0.3, 0]}
              rotation={[0, -0.2, 0]}
              receiveShadow
              castShadow
            >
              <boxGeometry args={[0.2, 0.5, 0.2]} />
              <meshStandardMaterial color={0x282828} />
            </mesh>
            <AdamEveEnv />
          </group>
        </CameraRig>
        <BakeShadows />
      </Canvas>
    </>
  );
}
