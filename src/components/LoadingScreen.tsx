/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { SpriteMaterial, LinearFilter, NoToneMapping, Sprite, Object3DEventMap, Mesh, BufferGeometry, NormalBufferAttributes, Material, Texture } from 'three';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [openApp, setOpenApp] = useState<boolean | undefined>(undefined)
  const [confirmation, setConfirmation] = useState<'yes' | 'no'>()
  const { progress } = useProgress();

  const [lastMousePosition, setLastMousePosition] = useState([0, 0]); // Track last mouse position
  const [mouseIdle, setMouseIdle] = useState(false); // Track if mouse is idle

  // Handle mouse movement
  const handleMouseMove = (event: any) => {
    setLastMousePosition([event.clientX, event.clientY]);
    setMouseIdle(false);
  };

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
      <div className="h-full w-full overflow-hidden absolute inset-0">
        <Canvas onMouseMove={handleMouseMove}>
          <ParallaxScene lastMousePosition={lastMousePosition} mouseIdle={mouseIdle} setMouseIdle={setMouseIdle} />
        </Canvas>
      </div>

      {/* Bar Screen */}
      <div className="absolute left-20 bottom-10 text-center w-[15%]">
        {/* Spinner Monkey Loader */}
        <Canvas gl={{ toneMapping: NoToneMapping, }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpriteAnimation confirmation={confirmation} />
        </Canvas>

        {/* Loading Bar */}
        {loading &&
          <div className="w-full flex items-center gap-2">
            <div className="w-full flex h-3 overflow-hidden text-[1.2rem] bg-[#343a40] rounded-sm" role="progressbar">
              <div className="flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap bg-white" id="progress-bar" style={{ width: `${Math.round(progress)}%`, transition: 'width 0.1s ease' }}></div>
            </div>
            <p className="font-serif text-sm text-white">{Math.round(progress)}%</p>
          </div>
        }
      </div>

      {!loading && <ConfirmationBox yes={() => setConfirmation('yes')} no={() => setConfirmation('no')} />}
    </div>
  ) : (
    <></>
    // <div className="h-screen w-screen flex absolute z-50 top-0 left-0 items-center justify-center bg-black/10">
    //   <div className="text-white text-2xl">Loading Finished</div>
    // </div>
  );
}

const ConfirmationBox = ({ yes, no }: { yes: () => void, no: () => void }) => {
  return (
    <div className="pt-20 pb-[186px] rounded-xl absolute max-w-[35%] w-full h-fit z-[1056]" style={{ background: "url('/preloader/confirmation-box/background-box.png')", backgroundSize: "cover" }}>
      <div className="flex flex-col items-center text-center">
        <p className="text-white text-lg font-realityStine">Are you ready to meet your Ancestor?</p>


        <button className="flex items-center justify-center absolute w-[136px] h-[32px] bottom-[39px] left-[148px] text-white p-0 rounded-sm font-realityStine font-thin text-sm" style={{ background: "url('/preloader/confirmation-box/bg-button.png')", backgroundSize: "cover" }} onClick={yes}>Yes</button>
        <button className="flex items-center justify-center absolute w-[136px] h-[32px] bottom-[39px] right-[148px] text-white p-0 rounded-sm font-realityStine font-thin text-sm" style={{ background: "url('/preloader/confirmation-box/bg-button.png')", backgroundSize: "cover" }} onClick={no}>no</button>
      </div>
    </div>
  )
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ParallaxPlane = ({ image, depth, position, speed, opacity, direction }: {
  image: Texture
  depth: number
  position: any
  speed: number
  opacity: number
  direction: number
}) => {
  const ref = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const { viewport } = useThree();
  const targetPosition = useRef([0, 0, 0]);

  // Update position based on mouse movement with lerp for smoothness
  useFrame(({ mouse }) => {
    const targetX = (mouse.x * depth) / 2;
    const targetY = (mouse.y * depth) / 2;

    // Lerp towards the target position for smooth movement
    targetPosition.current[0] += (targetX - targetPosition.current[0]) * speed; /*speed=0.1*/
    targetPosition.current[1] += (targetY - targetPosition.current[1]) * speed;

    ref.current?.position.set(targetPosition.current[0], targetPosition.current[1], 0);
  });

  // Update position with mouse or automatic movement
  useFrame(() => {
    targetPosition.current[1] += direction * speed; // Move up or down based on direction

    // Reset position when it goes out of view to create an infinite scroll effect
    if (targetPosition.current[1] > 1 || targetPosition.current[1] < -1) {
      targetPosition.current[1] = direction > 0 ? -1 : 1;
    }

    ref.current?.position.set(targetPosition.current[0], targetPosition.current[1], 0);
  });


  return (
    <mesh
      ref={ref}
      position={position}
      scale={[
        viewport.width, // Full width
        viewport.height, // Full height
        1, // Fixed depth
      ]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={image} transparent={true} opacity={opacity} />
      {/* alphaTest={0} */}
    </mesh>
  );
}

const ParallaxScene = ({ lastMousePosition, mouseIdle, setMouseIdle }: {
  lastMousePosition: number[]
  mouseIdle: boolean
  setMouseIdle: (value: boolean) => void
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  // const [fadeDirection, setFadeDirection] = useState('out');
  const [batchIndex, setBatchIndex] = useState(0); // Track the active batch (0–1)

  const backgroundTexturesBatch = [
    ['/preloader/preloader-images/first-Sequence/adams-creation/background.png', '/preloader/preloader-images/first-Sequence/austrian-painter/background.png', '/preloader/preloader-images/first-Sequence/battle-of-hu-lao-gate-2/background.png', '/preloader/preloader-images/first-Sequence/boxing/background.png', '/preloader/preloader-images/first-Sequence/moses/background.png'],
    ['/preloader/preloader-images/second-Sequence/three-kingdom/background.png', '/preloader/preloader-images/second-Sequence/abraham/background.jpeg', '/preloader/preloader-images/second-Sequence/adam-eve/background.png', '/preloader/preloader-images/second-Sequence/leonardo/background.jpg', '/preloader/preloader-images/second-Sequence/mlk/background.png']
  ];
  const characterTexturesBatch = [
    ['/preloader/preloader-images/first-Sequence/adams-creation/character.png', '/preloader/preloader-images/first-Sequence/austrian-painter/character.png', '/preloader/preloader-images/first-Sequence/battle-of-hu-lao-gate-2/character.png', '/preloader/preloader-images/first-Sequence/boxing/character.png', '/preloader/preloader-images/first-Sequence/moses/character.png'],
    ['/preloader/preloader-images/second-Sequence/three-kingdom/character.png', '/preloader/preloader-images/second-Sequence/abraham/character.png', '/preloader/preloader-images/second-Sequence/adam-eve/character.png', '/preloader/preloader-images/second-Sequence/leonardo/character.png', '/preloader/preloader-images/second-Sequence/mlk/character.png']
  ];

  const speed = 0.1; // Speed for smooth movement (lower value = smoother)

  useEffect(() => {
    const fadeOut = () => {
      // setFadeDirection('out');
      let currentOpacity = 1;
      const fadeOutInterval = setInterval(() => {
        if (currentOpacity > 0) {
          currentOpacity -= 0.05; // Decrease opacity for fade-out effect
          setOpacity(currentOpacity);
        } else {
          clearInterval(fadeOutInterval); // Stop fade-out when opacity is 0
        }
      }, 50);
    };

    const fadeIn = () => {
      // setFadeDirection('in');
      let currentOpacity = 0;
      const fadeInInterval = setInterval(() => {
        if (currentOpacity < 1) {
          currentOpacity += 0.05; // Increase opacity for fade-in effect
          setOpacity(currentOpacity);
        } else {
          clearInterval(fadeInInterval); // Stop fade-in when opacity is 1
        }
      }, 50);
    };

    const interval = setInterval(() => {
      fadeOut();
      setTimeout(() => {
        // Update image index within the current batch
        setImageIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % 5; // Cycle within current batch
          if (nextIndex === 0) {
            // Switch to the next batch after finishing current batch
            setBatchIndex((prevBatch) => (prevBatch + 1) % 2);
          }
          return nextIndex;
        });
        fadeIn();
      }, 1000); // Wait for fade-out before fade-in
    }, 4000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const backgroundTextures = useTexture(backgroundTexturesBatch[batchIndex]);
  const characterTextures = useTexture(characterTexturesBatch[batchIndex]);

  // Set idle after 2 seconds of inactivity
  useEffect(() => {
    const idleTimeout = setTimeout(() => {
      setMouseIdle(true);
    }, 2000); // After 2 seconds of no mouse movement, mark as idle

    return () => clearTimeout(idleTimeout);
  }, [lastMousePosition]);

  const getParallaxDirection = () => {
    if (mouseIdle) {
      return [0.01, -0.01]; // Automatic movement when idle
    } else {
      const [mouseX, mouseY] = lastMousePosition;
      const xOffset = (mouseX / window.innerWidth) * 2 - 1;
      const yOffset = (mouseY / window.innerHeight) * 2 - 1;
      return [xOffset * 0.05, yOffset * 0.05]; // Mouse-based parallax movement
    }
  };

  const [backgroundDirection, characterDirection] = getParallaxDirection();

  return (
    <>
      <ParallaxPlane
        image={backgroundTextures[imageIndex]}
        depth={0.1}
        position={[0, 0, -1]}
        // transparent={false}
        speed={speed}
        opacity={opacity}
        direction={backgroundDirection}
      />
      <ParallaxPlane
        image={characterTextures[imageIndex]}
        depth={0.3}
        position={[0, 0, 0]} // Character stays on top
        // transparent={true}
        speed={speed}
        opacity={opacity}
        direction={characterDirection}
      />
    </>
  );
}
