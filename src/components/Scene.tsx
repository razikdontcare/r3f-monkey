"use client";

import { Canvas } from "@react-three/fiber";
import CameraRig from "@/components/CameraRig";
import { Environment, BakeShadows } from "@react-three/drei";
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing";

import PrehistoricSprite from "./sprites/PrehistoricSprite";
import EgyptSprite from "./sprites/EgyptSprite";
import DynastySprite from "./sprites/DynastySprite";
import { useCameraPosition } from "@/utils/context";
import CloudMesh from "./sprites/CloudMesh";
import { BlendFunction } from "postprocessing";
import WorldWar2Sprite from "./sprites/WorldWar2Sprite";
import NYCSprite from "./sprites/NYCSprite";
import {
  DynastyToWW2,
  EgyptToDynasty,
  PrehistoricToEgypt,
  WW2ToNYC,
} from "./transitions";

export default function Scene() {
  const { targetPosition } = useCameraPosition();

  return (
    <>
      <Canvas>
        <EffectComposer enableNormalPass>
          <Bloom
            luminanceThreshold={0}
            mipmapBlur
            luminanceSmoothing={0.0}
            intensity={0.1}
          />
          <SSAO
            blendFunction={BlendFunction.MULTIPLY} // blend mode
            samples={30} // amount of samples per pixel (shouldn't be a multiple of the ring count)
            rings={4} // amount of rings in the occlusion sampling pattern
            distanceThreshold={1.0} // global distance threshold at which the occlusion effect starts to fade out. min: 0, max: 1
            distanceFalloff={0.0} // distance falloff. min: 0, max: 1
            rangeThreshold={0.5} // local occlusion range threshold at which the occlusion starts to fade out. min: 0, max: 1
            rangeFalloff={0.1} // occlusion range falloff. min: 0, max: 1
            luminanceInfluence={0.9} // how much the luminance of the scene influences the ambient occlusion
            radius={20} // occlusion sampling radius
            bias={0.5} // occlusion bias
            worldDistanceThreshold={0.01} // global distance threshold in world units
            worldDistanceFalloff={0.01} // distance falloff in world units
            worldProximityThreshold={0.01} // local occlusion range threshold in world units
            worldProximityFalloff={0.01} // occlusion range falloff in world units
          />
        </EffectComposer>
        <Environment
          files={"autumn_field_puresky_1k.hdr"}
          background
          environmentIntensity={0.01}
        />
        <CameraRig position={targetPosition} rotation={[0, 0, 0]} pov={40} />
        <PrehistoricSprite isInView={targetPosition[0] <= 5} />
        <EgyptSprite
          isInView={targetPosition[0] >= 5 && targetPosition[0] <= 15}
        />
        <DynastySprite
          isInView={targetPosition[0] >= 15 && targetPosition[0] <= 25}
        />
        <WorldWar2Sprite
          isInView={targetPosition[0] >= 25 && targetPosition[0] <= 35}
        />
        <NYCSprite
          isInView={targetPosition[0] >= 35 && targetPosition[0] <= 45}
        />

        <PrehistoricToEgypt target={targetPosition} />
        <EgyptToDynasty target={targetPosition} />
        <DynastyToWW2 target={targetPosition} />
        <WW2ToNYC target={targetPosition} />
        <CloudMesh />
        <BakeShadows />
      </Canvas>
    </>
  );
}
