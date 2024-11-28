/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, useTexture } from '@react-three/drei';
import { SpriteMaterial, LinearFilter, NoToneMapping, Sprite, Object3DEventMap, Mesh, BufferGeometry, NormalBufferAttributes, Material, Texture } from 'three';
import { useMusic } from "@/utils/MusicContext";

export default function LoadingScreen() {
  const [loadedSize, setLoadedSize] = useState(0); // Ukuran yang sudah dimuat dalam MB
  const targetSize = 400; // Target dalam MB

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntriesByType("resource");
      let totalSize = 0;

      entries.forEach((entry: any) => {
        // Menambahkan ukuran setiap resource yang dimuat
        if (entry.encodedBodySize) {
          totalSize += entry.encodedBodySize; // encodedBodySize dalam byte
        }
      });

      setLoadedSize((prev) => {
        const newSize = prev + totalSize / (1024 * 1024); // Convert byte ke MB
        return newSize > targetSize ? targetSize : newSize; // Maksimal 100MB
      });
    });

    observer.observe({ type: "resource", buffered: true });

    return () => observer.disconnect();
  }, []);

  const progress = Math.min((loadedSize / targetSize) * 100, 100); // Persentase progress



  const [loading, setLoading] = useState(true);
  const [openApp, setOpenApp] = useState<boolean | undefined>(undefined)
  const [confirmation, setConfirmation] = useState<'yes' | 'no' | null>(null)
  // const { progress } = useProgress();

  const { playMusic } = useMusic();

  useEffect(() => {
    if (confirmation === 'yes') {
      setTimeout(() => {
        setOpenApp(true)
        playMusic()
        setConfirmation(null)
      }, 1000);
    } else if (confirmation === 'no') {
      setTimeout(() => {
        setConfirmation(null)
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
        <Canvas>
          <ParallaxScene />
        </Canvas>
      </div>

      {/* Bar Screen */}
      <div className="absolute left-20 bottom-10 text-center w-[15%]">
        {/* Spinner Monkey Loader */}
        <Canvas gl={{ toneMapping: NoToneMapping, }}>
          {/* <ambientLight intensity={0.5} /> */}
          {/* <pointLight position={[10, 10, 10]} /> */}
          <SpriteAnimation confirmation={confirmation} />
        </Canvas>

        {/* <p className="text-white font-procopius">{Math.round(loadedSize)}MB</p> */}

        {/* Loading Bar */}
        {loading &&
          <div className="w-full flex items-center gap-2">
            <div className="w-full flex h-3 overflow-hidden text-[1.2rem] bg-[#343a40] rounded-sm" role="progressbar">
              <div className="flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap bg-white" id="progress-bar" style={{ width: `${Math.round(progress)}%`, transition: 'width 0.5s ease' }}></div>
            </div>
            <p className="absolute ml-2 left-full font-procopius font-bold text-base text-white">{Math.round(progress)}%</p>
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
    <div className="pt-20 pb-[186px] rounded-xl absolute max-w-[588px] w-full h-fit z-[1056]" style={{ background: "url('/preloader/confirmation-box/background-box.png')", backgroundSize: "cover" }}>
      <div className="flex flex-col items-center text-center">
        <p className="text-white text-lg font-procopius">Are you ready to meet your Ancestor?</p>


        <button className="custom-cursor-hover flex items-center justify-center absolute w-[136px] h-[32px] bottom-[39px] left-[148px] text-white p-0 rounded-sm font-procopius font-thin text-sm focus:border-none focus:outline-none" style={{ background: "url('/preloader/confirmation-box/bg-button.png')", backgroundSize: "cover" }} onClick={yes}>Yes</button>
        <button className="custom-cursor-hover flex items-center justify-center absolute w-[136px] h-[32px] bottom-[39px] right-[148px] text-white p-0 rounded-sm font-procopius font-thin text-sm focus:border-none focus:outline-none" style={{ background: "url('/preloader/confirmation-box/bg-button.png')", backgroundSize: "cover" }} onClick={no}>No</button>
      </div>
    </div>
  )
}

// Function to load and play sound
const playSFX = (audio: string) => {
  const sound = new Audio(audio);
  sound.play();
};

const SpriteAnimation = ({ confirmation }: { confirmation: 'yes' | 'no' | null }) => {
  const meshRef = useRef<Sprite<Object3DEventMap> | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [blink, setBlink] = useState(false); // For blink effect
  const [stopAnimation, setStopAnimation] = useState(false);
  const [texture, setTexture] = useState<'textureYes' | 'textureNo' | null>(null)


  const texturesYes = useTexture(['/preloader/variant1.png'])
  const texturesNo = useTexture(['/preloader/variant.png'])

  // Load the sprite textures
  const texturesCommon = useTexture([
    '/preloader/1.png',
    '/preloader/2.png',
    '/preloader/3.png',
    '/preloader/4.png',
    '/preloader/5.png',
    '/preloader/6.png',
  ]);

  // Ensure textures use linear filtering and encoding
  const allTextures = [...texturesCommon, ...texturesYes, ...texturesNo];
  allTextures.forEach((texture) => {
    texture.minFilter = LinearFilter; // Avoid mipmap effects
    texture.magFilter = LinearFilter;
    texture.needsUpdate = true;
  });

  const textureFrames = texturesCommon.length;
  const animationSpeed = 0.2; // Adjust to control speed
  let elapsed = 0; // Accumulator to control speed


  // Control animation speed
  useFrame((state, delta) => {
    if (stopAnimation) return; // Stop spinning if stopAnimation is true

    elapsed += delta;
    if (elapsed > animationSpeed) {
      setCurrentFrame((prev) => (prev + 1) % textureFrames);
      elapsed = 0;
    }
  });


  useEffect(() => {
    if (confirmation === "no") {
      playSFX('/preloader/beep-choice-no.mp3'); // Play error beep sound
      setTexture("textureNo")
      setStopAnimation(true);
      setBlink(true); // Trigger red blink effect
      setTimeout(() => {
        setBlink(false); // Reset blink effect
        setTexture("textureYes"); // Switch to Yes after 1 second
      }, 1000);
    } else if (confirmation === "yes") {
      setTexture('textureYes')
    }
  }, [confirmation])


  // Apply the current texture to the sprite material
  // useEffect(() => {
  const selectedTexture =
    texture === "textureYes"
      ? texturesYes[0] : texture === "textureNo"
        ? texturesNo[0] : texturesCommon[currentFrame];

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material = new SpriteMaterial({
        map: selectedTexture,
        color: blink ? 0xff0000 : 0xffffff, // Ensure no color tint is applied
        transparent: true, // Support transparency if needed
      });
    }
  }, [selectedTexture, blink]);
  // }, [currentFrame, textures]);

  return (
    <sprite ref={meshRef} position={[0, 0, 0]} scale={[15, 15, 15]} />
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ParallaxPlane = ({ image, depth, position, speed, opacity }: {
  image: Texture
  depth: number
  position: any
  speed: number
  opacity: number
}) => {
  const ref = useRef<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>(null);
  const { viewport } = useThree();
  const targetPosition = useRef([0, 0, 0]);
  const [planeScale, setPlaneScale] = useState<any>([1, 1, 1]);

  useEffect(() => {
    // Update scale to mimic background-size: cover
    const updateScale = () => {
      const imgAspect = image.source.data.width / image.source.data.height; // Aspect ratio of the image
      const viewportAspect = viewport.width / viewport.height; // Aspect ratio of the viewport

      if (imgAspect > viewportAspect) {
        // Image is wider than the viewport
        setPlaneScale([viewport.height * imgAspect, viewport.height, 1]);
      } else {
        // Image is taller than the viewport
        setPlaneScale([viewport.width, viewport.width / imgAspect, 1]);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [image, viewport]);

  // Update position based on mouse movement with lerp for smoothness
  useFrame(({ mouse }) => {
    const targetX = (mouse.x * depth) / 2;
    const targetY = (mouse.y * depth) / 2;

    // Lerp towards the target position for smooth movement
    targetPosition.current[0] += (targetX - targetPosition.current[0]) * speed; /*speed=0.1*/
    targetPosition.current[1] += (targetY - targetPosition.current[1]) * speed;

    ref.current?.position.set(targetPosition.current[0], targetPosition.current[1], 0);
  });


  return (
    <mesh
      ref={ref}
      position={position}
      scale={planeScale}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={image}
        transparent={true}
        premultipliedAlpha={true} // Prevent blending artifacts
        depthWrite={false} // Optimize rendering
        toneMapped={false} // Disable tone mapping
        opacity={opacity}
      />
    </mesh>
  );
}

const ParallaxScene = () => {
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

  useEffect(() => {
    backgroundTextures.forEach((texture) => {
      texture.minFilter = LinearFilter; // Avoid mipmap effects
      texture.magFilter = LinearFilter;
      texture.needsUpdate = true;
    });
    characterTextures.forEach((texture) => {
      texture.minFilter = LinearFilter; // Avoid mipmap effects
      texture.magFilter = LinearFilter;
      texture.needsUpdate = true;
    });
  }, [backgroundTextures, characterTextures]);


  return (
    <>
      <Preload all />
      <ParallaxPlane
        image={backgroundTextures[imageIndex]}
        depth={0.1}
        position={[0, 0, -1]}
        // transparent={false}
        speed={speed}
        opacity={opacity}
      />
      <ParallaxPlane
        image={characterTextures[imageIndex]}
        depth={0.3}
        position={[0, 0, 0]} // Character stays on top
        // transparent={true}
        speed={speed}
        opacity={opacity}
      />
    </>
  );
}
