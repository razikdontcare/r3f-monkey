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
import { useEffect, useState } from "react";
import PreloadTextures from "./utils/PreloadTextures";

export default function Scene() {
  const { targetPosition } = useCameraPosition();

  const [texturesReady, setTexturesReady] = useState(false);

  const [egyptPosition, setEgyptPosition] = useState<[number, number, number]>([0, 0, 0])
  const [dynastyPosition, setDynastyPosition] = useState<[number, number, number]>([0, 0, 0])
  const [worldWarPosition, setWorldWarPosition] = useState<[number, number, number]>([0, 0, 0])
  const [nycPosition, setNYCPosition] = useState<[number, number, number]>([0, 0, 0])


  useEffect(() => {
    if (texturesReady) {
      setTimeout(() => {
        setEgyptPosition([10, 0, 0])
        setDynastyPosition([20, 0, 0])
        setWorldWarPosition([30, 0, 0])
        setNYCPosition([40, 0, 0])
      }, 20000);
    }
  }, [texturesReady])

  if (!texturesReady) {
    return (
      <>
        <PreloadTextures onReady={setTexturesReady} />
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Canvas>
        <CameraRig position={targetPosition} rotation={[0, 0, 0]} pov={40} />

        {/* Scenes */}
        <PrehistoricSprite isInView={targetPosition[0] <= 5} />
        <EgyptSprite
          isInView={targetPosition[0] >= 5 && targetPosition[0] <= 15}
          position={egyptPosition}
        />
        <DynastySprite
          isInView={targetPosition[0] >= 15 && targetPosition[0] <= 25}
          position={dynastyPosition}
        />
        <WorldWar2Sprite
          isInView={targetPosition[0] >= 25 && targetPosition[0] <= 35}
          position={worldWarPosition}
        />
        <NYCSprite
          isInView={targetPosition[0] >= 35 && targetPosition[0] <= 45}
          position={nycPosition}
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
