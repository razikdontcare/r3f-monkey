"use client";

import { Canvas } from "@react-three/fiber";
import CameraRig from "@/components/CameraRig";
import { Environment, BakeShadows } from "@react-three/drei";
import { useControls } from "leva";
import { EffectComposer, SMAA, Bloom } from "@react-three/postprocessing";

// model
import AdamEveEnv from "@/components/models/AdamEveEnv";
import EgyptEnv from "@/components/models/EgyptEnv";
import ChinaEnv from "@/components/models/ChinaEnv";
import WW2Env from "@/components/models/WW2Env";
import NewYorkEnv from "@/components/models/NewYorkEnv";

export function AdamScene() {
  const { modelPos } = useControls({ modelPos: [0, 0, 0] });
  const { position, rotation, pov } = useControls({
    position: [0.52, 0.16, 2.7],
    rotation: [0.08, 0.22, 0],
    pov: 35,
  });

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
        {/* <Environment files={"sky.hdr"} environmentIntensity={0.01} /> */}
        <CameraRig position={position} rotation={rotation} pov={pov} />
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
        <BakeShadows />
      </Canvas>
    </>
  );
}

export function EgyptScene() {
  const { modelPos } = useControls({ modelPos: [0, 0, 0] });
  const { position, rotation, pov } = useControls({
    position: [0.52, 0.26, 2.7],
    rotation: [0.08, 0.22, 0],
    pov: 35,
  });

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
        <Environment files={"sky.hdr"} background environmentIntensity={0.01} />
        <CameraRig position={position} rotation={rotation} pov={pov} />
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
          <EgyptEnv />
        </group>
        <BakeShadows />
      </Canvas>
    </>
  );
}

export function ChinaScene() {
  const { modelPos, modelRot } = useControls({
    modelPos: [2.6, 0, -0.9],
    modelRot: [0, -1.6, 0],
  });
  const { position, rotation, pov } = useControls({
    position: [2.54, 0.25, 2.02],
    rotation: [0.17, 0, 0],
    pov: 45,
  });

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
        <Environment files={"sky.hdr"} background environmentIntensity={0.01} />
        <CameraRig position={position} rotation={rotation} pov={pov} />
        <group rotation={modelRot} position={modelPos}>
          <mesh
            position={[0, 0.2, 0]}
            rotation={[0, 0, 0]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[0.2, 0.5, 0.2]} />
            <meshStandardMaterial color={0x282828} />
          </mesh>
          <ChinaEnv />
        </group>
        <BakeShadows />
      </Canvas>
    </>
  );
}

export function WW2Scene() {
  const { modelPos, modelRot } = useControls({
    modelPos: [0, 0, 0],
    modelRot: [0, -1.68, 0],
  });
  const { position, rotation, pov } = useControls({
    position: [-0.23, 0.31, 3.08],
    rotation: [0.09, -0.19, 0],
    pov: 45,
  });

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
        <Environment files={"sky.hdr"} background environmentIntensity={0.01} />
        <CameraRig position={position} rotation={rotation} pov={pov} />
        <group rotation={modelRot} position={modelPos}>
          <mesh
            position={[0, 0.2, 0]}
            rotation={[0, 0, 0]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[0.2, 0.5, 0.2]} />
            <meshStandardMaterial color={0x282828} />
          </mesh>
          <WW2Env />
        </group>
        <BakeShadows />
      </Canvas>
    </>
  );
}

export function NewYorkScene() {
  const { modelPos, modelRot } = useControls({
    modelPos: [0, 0, 0],
    modelRot: [0, -1.73, 0],
  });
  const { position, rotation, pov } = useControls({
    position: [-0.5, 0.31, 3.08],
    rotation: [0.09, -0.19, 0],
    pov: 45,
  });

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
        <Environment files={"sky.hdr"} background environmentIntensity={0.01} />
        <CameraRig position={position} rotation={rotation} pov={pov} />
        <group rotation={modelRot} position={modelPos}>
          {/* <mesh
            position={[0, 0.2, 0]}
            rotation={[0, 0, 0]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[0.2, 0.5, 0.2]} />
            <meshStandardMaterial color={"hotpink"} />
          </mesh> */}
          <NewYorkEnv />
        </group>
        <BakeShadows />
      </Canvas>
    </>
  );
}
