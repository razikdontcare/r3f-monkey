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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Scene() {
  const { targetPosition } = useCameraPosition();

  const [texturesReady, setTexturesReady] = useState(false);

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

function PreloadTextures({ onReady }: { onReady: Dispatch<SetStateAction<boolean>> }) {
  // Preload the required textures for background and character
  const textures = [
    '/preloader/preloader-images/first-Sequence/adams-creation/background.png',
    '/preloader/preloader-images/first-Sequence/adams-creation/character.png',
    '/preloader/preloader-images/first-Sequence/austrian-painter/background.png',
    '/preloader/preloader-images/first-Sequence/austrian-painter/character.png',
    '/preloader/preloader-images/first-Sequence/battle-of-hu-lao-gate-2/background.png',
    '/preloader/preloader-images/first-Sequence/battle-of-hu-lao-gate-2/character.png',
    '/preloader/preloader-images/first-Sequence/boxing/background.png',
    '/preloader/preloader-images/first-Sequence/boxing/character.png',
    '/preloader/preloader-images/first-Sequence/moses/background.png',
    '/preloader/preloader-images/first-Sequence/moses/character.png',
    '/preloader/preloader-images/second-Sequence/three-kingdom/background.png',
    '/preloader/preloader-images/second-Sequence/three-kingdom/character.png',
    '/preloader/preloader-images/second-Sequence/abraham/background.jpeg',
    '/preloader/preloader-images/second-Sequence/abraham/character.png',
    '/preloader/preloader-images/second-Sequence/adam-eve/background.png',
    '/preloader/preloader-images/second-Sequence/adam-eve/character.png',
    '/preloader/preloader-images/second-Sequence/leonardo/background.jpg',
    '/preloader/preloader-images/second-Sequence/leonardo/character.png',
    '/preloader/preloader-images/second-Sequence/mlk/background.png',
    '/preloader/preloader-images/second-Sequence/mlk/character.png'
  ];

  useEffect(() => {
    const loadTextures = async () => {
      try {
        // Preload all textures
        await Promise.all(
          textures.map(
            (texturePath) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = texturePath;
                img.onload = resolve;
                img.onerror = reject;
              })
          )
        );
        onReady(true); // Notify parent when textures are ready
      } catch (error) {
        console.error('Error preloading textures:', error);
        onReady(false);
      }
    };

    loadTextures();
  }, [onReady, textures]);

  return null;
}
