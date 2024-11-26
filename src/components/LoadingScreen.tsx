/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { SpriteMaterial, LinearFilter, NoToneMapping, Sprite, Object3DEventMap } from 'three';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [openApp, setOpenApp] = useState<boolean | undefined>(undefined)
  const [confirmation, setConfirmation] = useState<'yes' | 'no'>()
  const { progress } = useProgress();



  useEffect(() => {
    if (confirmation === 'yes') {
      setTimeout(() => {
        setOpenApp(true)
      }, 1000);
    }
  }, [confirmation])

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  }, [progress]);

  return !openApp ? (
    <div className="h-screen w-screen flex absolute z-50 top-0 left-0 items-center justify-center bg-black">

      {/* Bar Screen */}
      <div className="absolute left-20 bottom-10 text-center w-[15%]">
        {/* Spinner Monkey Loader */}
        <Canvas gl={{ toneMapping: NoToneMapping, }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpriteAnimation confirmation={confirmation} />
        </Canvas>

        {/* Loading Bar */}
        {/* {loading &&  */}
        <div className="flex h-3 overflow-hidden text-[1.2rem] bg-[#343a40] rounded-sm" role="progressbar">
          <div className="flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap bg-[#EEDBD6]" id="progress-bar" style={{ width: `${progress}%`, transition: 'width 1s ease' }}></div>
        </div>
        {/* } */}
      </div>
    </div>
  ) : (
    <></>
    // <div className="h-screen w-screen flex absolute z-50 top-0 left-0 items-center justify-center bg-black/10">
    //   <div className="text-white text-2xl">Loading Finished</div>
    // </div>
  );
}

// Function to load and play sound
const playSFX = (audio: string) => {
  const sound = new Audio(audio);
  sound.play();
};

const SpriteAnimation = ({ confirmation }: { confirmation: 'yes' | 'no' | undefined }) => {
  const meshRef = useRef<Sprite<Object3DEventMap> | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [blink, setBlink] = useState(false); // For blink effect


  const texturesYes = useTexture(['/preloader/variant1.png'])
  const texturesNo = useTexture(['/preloader/variant.png'])

  // Load the sprite textures
  const texturesCommon = useTexture([
    '/preloader/1.png', // Ganti dengan path ke gambar pertama
    '/preloader/2.png', // Ganti dengan path ke gambar kedua
    '/preloader/3.png', // Ganti dengan path ke gambar ketiga
    '/preloader/4.png', // Ganti dengan path ke gambar keempat
    '/preloader/5.png', // Ganti dengan path ke gambar kelima
    '/preloader/6.png', // Ganti dengan path ke gambar keenam
  ]);

  // Ensure textures use linear filtering and encoding
  texturesYes.forEach((texture) => {
    texture.minFilter = LinearFilter; // Avoid mipmap effects
    texture.magFilter = LinearFilter;
    texture.needsUpdate = true;
  });
  texturesNo.forEach((texture) => {
    texture.minFilter = LinearFilter; // Avoid mipmap effects
    texture.magFilter = LinearFilter;
    texture.needsUpdate = true;
  });
  texturesCommon.forEach((texture) => {
    texture.minFilter = LinearFilter; // Avoid mipmap effects
    texture.magFilter = LinearFilter;
    texture.needsUpdate = true;
  });

  let elapsed = 0; // Accumulator to control speed


  // Control animation speed
  useFrame((state, delta) => {
    elapsed += delta;
    if (elapsed > 0.2) {
      setCurrentFrame((prev) => (prev + 1) % texturesCommon.length);
      elapsed = 0;
    }

    // Blink effect (for "No" input)
    if (blink) {
      if (meshRef.current) {
        meshRef.current.material.color.set(0xff0000); // Red color for blink
      }
      setTimeout(() => {
        setBlink(false);
      }, 300); // Blink duration
    } else if (meshRef.current) {
      meshRef.current.material.color.set(0xffffff); // Reset color to white
    }
  });


  useEffect(() => {
    if (confirmation === "no") {
      playSFX('/preloader/beep-choice-no.mp3'); // Play error beep sound
      setBlink(true); // Trigger red blink effect
    }
  }, [confirmation])


  // Apply the current texture to the sprite material
  // useEffect(() => {
  const selectedTexture = confirmation === "yes" ? texturesYes[0] : confirmation === "no" ? texturesNo[0] : texturesCommon[currentFrame];

  if (meshRef.current) {
    meshRef.current.material = new SpriteMaterial({
      map: selectedTexture,
      color: 0xffffff, // Ensure no color tint is applied
      transparent: true, // Support transparency if needed
    });
  }
  // }, [currentFrame, textures]);

  return (
    <sprite ref={meshRef} position={[0, 0, 0]} scale={[10, 10, 10]} />
  );
};


