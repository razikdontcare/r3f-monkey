import { useCharacterEvents } from "@/utils/context";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { Group, NearestFilter, TextureLoader } from "three";

const basePath = "/sprites/dynasty/";

const texturePath = {
  arrowsFlying: {
    png: basePath + "arrows-flying.png",
    json: basePath + "arrows-flying.json",
  },
  city: {
    png: basePath + "city.png",
    json: basePath + "city.json",
  },
  flag: {
    png: basePath + "flag.png",
    json: basePath + "flag.json",
  },
  glows: {
    png: basePath + "glows.png",
    json: basePath + "glows.json",
  },
  grass: {
    png: basePath + "grass.png",
    json: basePath + "grass.json",
  },
  sunTzu: {
    png: basePath + "sun-tzu.png",
    json: basePath + "sun-tzu.json",
  },
  warriorsFighting: {
    png: basePath + "warriors-fighting.png",
    json: basePath + "warriors-fighting.json",
  },
  sniffer: {
    png: basePath + "sniffer.png",
    json: basePath + "sniffer.json",
  },
};

export default function DynastySprite({ isInView }: { isInView: boolean }) {
  const [isVisible, setIsVisible] = useState(isInView);
  const meshRef = useRef<Group>(null);

  const { setEvent } = useCharacterEvents();

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 250); // Adjust the delay as needed
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const animatedPositionY = useSpring(meshRef.current?.position.y || 0, {
    mass: 1,
    stiffness: 200,
  });

  useFrame(({}, delta) => {
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
      <group position={[20, 0, 0]}>
        <GrassSprite />
        <PavedRoadMesh />
        <GlowsSprite />
        <MidGroundMesh />
        <WarriorsFightingSprite />
        <SunTzuSprite />
        <group ref={meshRef} position={[0, animatedPositionY.get(), 0]}>
          <CitySprite />
        </group>
        {/* <CloudMesh /> */}
        <ArrowsFlyingSprite />
        <group onClick={() => setEvent("dynasty")}>
          <SnifferSprite />
        </group>
      </group>
    </>
  );
}

export function CloudMesh() {
  const texture = useLoader(TextureLoader, "/" + "cloud.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  texture.repeat.set(0.72, 1);
  texture.offset.set(0.14, 0);

  return (
    <>
      <mesh position={[0, -1, -14]} scale={[3, 3, 1]}>
        <planeGeometry args={[8.5, 5]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

export function PavedRoadMesh() {
  const texture = useLoader(TextureLoader, basePath + "paved-road.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <>
      <mesh position={[0, -1.15, -4]} scale={[1.1, 1.1, 1]}>
        <planeGeometry args={[5.4, 1]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

export function MidGroundMesh() {
  const texture = useLoader(TextureLoader, basePath + "mid-ground.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <>
      <mesh position={[0, -1.1, -5]} scale={[1.8, 1.8, 1]}>
        <planeGeometry args={[5.2, 1]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}
export function GrassSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.grass.png,
    texturePath.grass.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[0, -0.7, -3.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[7, 30.37, 1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

export function GlowsSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.glows.png,
    texturePath.glows.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
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
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

export function WarriorsFightingSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.warriorsFighting.png,
    texturePath.warriorsFighting.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[0, -0.2, -4.8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[5.5, 13.03, 1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

export function SunTzuSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.sunTzu.png,
    texturePath.sunTzu.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[2.8, 0.3, -4.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[1.6, 1.24, 1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

export function CitySprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.city.png,
    texturePath.city.json,
    null,
    13,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[0.3, 1, -5.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[12, 49.07, 1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

export function ArrowsFlyingSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.arrowsFlying.png,
    texturePath.arrowsFlying.json,
    null,
    24,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[0, 0, -4.6]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[1, 1.9, 1]}
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

export function SnifferSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.sniffer.png,
    texturePath.sniffer.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 2;

  return (
    <>
      <SpriteAnimator
        position={[-0.4, -0.3, -3.8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleX * 0.9703703703703703, 1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}
