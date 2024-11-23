"use client";

import { Canvas } from "@react-three/fiber";
import CameraRig from "@/components/CameraRig";

import PrehistoricSprite from "@/components/sprites/PrehistoricSprite";
import EgyptSprite from "@/components/sprites/EgyptSprite";
import DynastySprite from "@/components/sprites/DynastySprite";
import WorldWar2Sprite from "@/components/sprites/WorldWar2Sprite";
import NYCSprite from "@/components/sprites/NYCSprite";
import CloudMesh from "@/components/sprites/CloudMesh";
import { useCameraPosition } from "@/utils/context";
import {
  DynastyToWW2,
  EgyptToDynasty,
  PrehistoricToEgypt,
  WW2ToNYC,
} from "@/components/transitions";

export default function Scene() {
  const { targetPosition } = useCameraPosition();

  return (
    <>
      <Canvas>
        <CameraRig position={targetPosition} rotation={[0, 0, 0]} pov={40} />

        {/* Scenes */}
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

        {/* Transitions */}
        <PrehistoricToEgypt target={targetPosition} />
        <EgyptToDynasty target={targetPosition} />
        <DynastyToWW2 target={targetPosition} />
        <WW2ToNYC target={targetPosition} />

        {/* Sky */}
        <CloudMesh />
      </Canvas>
    </>
  );
}
