import { useCharacterEvents } from "@/utils/context";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Group, NearestFilter, TextureLoader } from "three";

const basePath = "/sprites/dynasty/";
const jsonPath = basePath + "json/";
const pngPath = basePath + "png/";

const texturePath = {
  arrowsFlying: {
    png: pngPath + "arrows-flying.png",
    json: jsonPath + "arrows-flying.json",
  },
  city: {
    png: pngPath + "city.png",
    json: jsonPath + "city.json",
  },
  flag: {
    png: pngPath + "flag.png",
    json: jsonPath + "flag.json",
  },
  glows: {
    png: pngPath + "glows.png",
    json: jsonPath + "glows.json",
  },
  grass: {
    png: pngPath + "grass-2.png",
    json: jsonPath + "grass-2.json",
  },
  sunTzu: {
    png: pngPath + "sun-tzu-2.png",
    json: jsonPath + "sun-tzu.json",
  },
  warriorsFighting: {
    png: pngPath + "warriors-fighting.png",
    json: jsonPath + "warriors-fighting.json",
  },
  sniffer: {
    png: pngPath + "sniffer.png",
    json: jsonPath + "sniffer.json",
  },
  snifferHover: {
    png: pngPath + "sniffer-hover.png",
    json: jsonPath + "sniffer-hover.json",
  },
  clickHim: {
    png: "/sprites/click-him-text/click-him-text.png",
    json: "/sprites/click-him-text/click-him-text.json",
  },
};

function DynastySprite({ isInView, position }: { isInView: boolean, position: [number, number, number] }) {
  const [isVisible, setIsVisible] = useState(isInView);
  const [isHovered, setIsHovered] = useState(false);
  const meshRef = useRef<Group>(null);

  const handleHover = useMemo(
    () => ({
      enter: () => {
        if (typeof window !== "undefined") {
          document.body.style.cursor = "pointer";
          setIsHovered(true);
        }
      },
      leave: () => {
        if (typeof window !== "undefined") {
          document.body.style.cursor = "auto";
          setIsHovered(false);
        }
      },
    }),
    []
  );

  const { setEvent } = useCharacterEvents();

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const animatedPositionY = useSpring(meshRef.current?.position.y || 0, {
    mass: 1,
    stiffness: 200,
  }).get();

  useFrame(({ }, delta) => {
    if (meshRef.current) {
      if (isVisible) {
        easing.damp3(meshRef.current.position, [0, 0, 0], 0.5, delta);
      } else {
        easing.damp3(meshRef.current.position, [0, -15, 0], 2, delta);
      }
    }
  });
  return (
    <>
      <group position={position}>
        <group ref={meshRef} position={[0, animatedPositionY, 0]}>
          <CitySprite />
        </group>
        <MidGroundMesh />
        <WarriorsFightingSprite />
        <ArrowsFlyingSprite />
        <SunTzuSprite />
        <GrassSprite />
        <PavedRoadMesh />
        <GlowsSprite />
        <ClickHimSprite />

        <group onClick={() => setEvent("dynasty")}>
          <mesh
            visible={!isHovered}
            onPointerEnter={handleHover.enter}
            onPointerLeave={handleHover.leave}
          >
            <SnifferSprite />
          </mesh>
          <mesh visible={isHovered}>
            <SnifferHoverSprite />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default React.memo(DynastySprite);

function PavedRoadMesh() {
  const texture = useLoader(TextureLoader, pngPath + "paved-road.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  return (
    <>
      <mesh position={[0, -1.15, -4]} scale={[1.1, 1.1, 0.1]}>
        <planeGeometry args={[5.4, 1]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function MidGroundMesh() {
  const texture = useLoader(TextureLoader, pngPath + "mid-ground.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  return (
    <>
      <mesh position={[0, -1.1, -5]} scale={[1.8, 1.8, 0.1]}>
        <planeGeometry args={[5.2, 1]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}
function GrassSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.grass.png,
    texturePath.grass.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[0, -0.7, -3.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[7, 30.37, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function GlowsSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.glows.png,
    texturePath.glows.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    }
  );
  const scaleX = 8;

  return (
    <>
      <SpriteAnimator
        position={[0, -0.5, -3.2]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleX * 4.274463007159905, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function WarriorsFightingSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.warriorsFighting.png,
    texturePath.warriorsFighting.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[0, -0.2, -4.8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[5.5, 13.03, 0.1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function SunTzuSprite() {
  // Load the image texture
  const texture = useLoader(TextureLoader, texturePath.sunTzu.png);

  // Apply texture filtering
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  // Define the sprite size
  const spriteWidth = 1.4; // Corresponds to previous scale.x
  const spriteHeight = 1.7; // Corresponds to previous scale.y

  return (
    <mesh position={[2.8, 0.3, -4.5]}>
      {/* Plane geometry to display the image */}
      <planeGeometry args={[spriteWidth, spriteHeight]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
}

function CitySprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.city.png,
    texturePath.city.json,
    null,
    13,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[0.3, 1, -5.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[12, 49.07, 0.1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function ArrowsFlyingSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.arrowsFlying.png,
    texturePath.arrowsFlying.json,
    null,
    24,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[0, 0, -4.6]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[1, 1.9, 0.1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={10}
        alphaTest={0.5}
      />
    </>
  );
}

function SnifferSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.sniffer.png,
    texturePath.sniffer.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    }
  );

  const scaleX = 2;

  return (
    <>
      <SpriteAnimator
        position={[-0.3, -0.3, -3.8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleX * 0.9703703703703703, 0.1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function SnifferHoverSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.snifferHover.png,
    texturePath.snifferHover.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    }
  );

  const scaleX = 2.05;

  return (
    <>
      <SpriteAnimator
        position={[-0.38, -0.275, -3.8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleX * 0.8868852459016393, 0.1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function ClickHimSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.clickHim.png,
    texturePath.clickHim.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  return (
    <SpriteAnimator
      position={[-0.1, 0.7, -4.5]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[0.7, 1.1, 0.1]}
      spriteDataset={spriteObj}
      asSprite={false}
      fps={15}
    />
  );
}