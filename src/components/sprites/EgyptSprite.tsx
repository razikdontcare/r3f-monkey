// import { useObjectControls } from "@/utils/controls";
import { useCharacterEvents } from "@/utils/context";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { Group, NearestFilter, TextureLoader } from "three";

const basePath = "/sprites/egypt/";

const texturePath = {
  birdsMid: {
    png: basePath + "birds-mid.png",
    json: basePath + "birds-mid.json",
  },
  birdsRightCorner: {
    png: basePath + "birds-right-corner.png",
    json: basePath + "birds-right-corner.json",
  },
  cornerGrass: {
    png: basePath + "corner-grass.png",
    json: basePath + "corner-grass.json",
  },
  grass: {
    png: basePath + "grass.png",
    json: basePath + "grass.json",
  },
  pyramidsAndNile: {
    png: basePath + "pyramids-and-nile.png",
    json: basePath + "pyramids-and-nile.json",
  },
  sniffer: {
    png: basePath + "sniffer.png",
    json: basePath + "sniffer.json",
  },
};

export default function EgyptSprite({ isInView }: { isInView: boolean }) {
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
        easing.damp3(meshRef.current.position, [0, 0, 0], 0.3, delta);
      } else {
        easing.damp3(meshRef.current.position, [0, -15, 0], 1.5, delta);
      }
    }
  });
  return (
    <>
      <group position={[10, 0, 0]}>
        <>
          {/* <CloudMesh /> */}
          <SandMesh />
          <ForegroundStuffMesh />
          <CactusMesh />
          <group ref={meshRef} position={[0, animatedPositionY.get(), 0]}>
            <SphinxMesh />
            <PyramidsAndNileSprite />
          </group>
          <GrassSprite />
          <CornerGrassSprite />
          <group onClick={() => setEvent("egypt")}>
            <SnifferSprite />
          </group>
        </>
      </group>
    </>
  );
}

function SandMesh() {
  const texture = useLoader(TextureLoader, basePath + "sand.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 10.5;

  return (
    <>
      <mesh position={[0, -1.6, -5.6]} scale={[scale, scale, 0.1]}>
        <planeGeometry args={[1, 0.136328125]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function ForegroundStuffMesh() {
  const texture = useLoader(TextureLoader, basePath + "foreground-stuff.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 8;

  return (
    <>
      <mesh position={[0, -1.26, -4.5]} scale={[scale, scale, 0.1]}>
        <planeGeometry args={[1, 0.166015625]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function CactusMesh() {
  const texture = useLoader(TextureLoader, basePath + "cactus.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <>
      <mesh position={[-0.5, -1, -5]} scale={[1.2, 1.2, 1]}>
        <planeGeometry args={[6.4, 2]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function SphinxMesh() {
  const texture = useLoader(TextureLoader, basePath + "sphinx.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 5;

  return (
    <>
      <mesh position={[-3.65, -0.03, -7]} scale={[scale, scale, 0.1]}>
        <planeGeometry args={[1, 1.1199563794983642]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function PyramidsAndNileSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.pyramidsAndNile.png,
    texturePath.pyramidsAndNile.json,
    null,
    15,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 14;
  const scaleY = scaleX * 3.9428571428571426;

  return (
    <>
      <SpriteAnimator
        position={[2.33, -0.64, -9]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function GrassSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.grass.png,
    texturePath.grass.json,
    null,
    15,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );
  return (
    <>
      <SpriteAnimator
        position={[-2.6, -1.45, -4.8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[0.9, 0.8, 1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function CornerGrassSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.cornerGrass.png,
    texturePath.cornerGrass.json,
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
        position={[2.5, -1.23, -4.2]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[2.95, 2, 1]}
        spriteDataset={spriteObj}
        // textureImageURL={texture.image.src}
        // textureDataURL={texturePath.grass.json}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function SnifferSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.sniffer.png,
    texturePath.sniffer.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 1.5;

  return (
    <>
      <SpriteAnimator
        position={[0, -0.5, -5.2]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleX * 0.6020833333333334, 1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}
