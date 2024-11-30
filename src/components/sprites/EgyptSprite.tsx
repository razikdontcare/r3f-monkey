// import { useObjectControls } from "@/utils/controls";
import { useCharacterEvents } from "@/utils/context";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Group, NearestFilter, TextureLoader } from "three";

const basePath = "/sprites/egypt/";
const jsonPath = basePath + "json/";
const pngPath = basePath + "png/";

const texturePath = {
  birdsMid: {
    png: pngPath + "birds-mid.png",
    json: jsonPath + "birds-mid.json",
  },
  birdsRightCorner: {
    png: pngPath + "birds-right-corner.png",
    json: jsonPath + "birds-right-corner.json",
  },
  cornerGrass: {
    png: pngPath + "corner-grass.png",
    json: jsonPath + "corner-grass.json",
  },
  grass: {
    png: pngPath + "grass.png",
    json: jsonPath + "grass.json",
  },
  pyramidsAndNile: {
    png: pngPath + "pyramids-and-nile-2.png",
    json: jsonPath + "pyramids-and-nile-2.json",
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

function EgyptSprite({ isInView, position }: { isInView: boolean, position: [number, number, number] }) {
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
        easing.damp3(meshRef.current.position, [0, 0, 0], 0.3, delta);
      } else {
        easing.damp3(meshRef.current.position, [0, -15, 0], 1.5, delta);
      }
    }
  });
  return (
    <group position={position}>
      <group ref={meshRef} position={[0, animatedPositionY, 0]}>
        <SphinxMesh />
        <PyramidsAndNileSprite />
      </group>
      <SandMesh />
      <CactusMesh />
      <GrassSprite />
      <CornerGrassSprite />
      <ForegroundStuffMesh />
      <ClickHimSprite />

      <group onClick={() => setEvent("egypt")}>
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
  );
}

export default React.memo(EgyptSprite);

function SandMesh() {
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/7f9bde79-db8a-4377-428e-6298ad52bb00/public");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 10.5;

  return (
    <mesh position={[0, -1.6, -5.6]} scale={[scale, scale, 0.1]}>
      <planeGeometry args={[1, 0.136328125]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function ForegroundStuffMesh() {
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/b74753e3-687e-4700-196d-817c1f011c00/public");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 8;

  return (
    <mesh position={[0, -1.26, -4.5]} scale={[scale, scale, 0.1]}>
      <planeGeometry args={[1, 0.166015625]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function CactusMesh() {
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/493a03d1-35b6-4f5e-053b-f79d7b75f400/public");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <mesh position={[-0.5, -1, -5]} scale={[1.2, 1.2, 0.1]}>
      <planeGeometry args={[6.4, 2]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function SphinxMesh() {
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/4b79e959-0809-42b3-1dda-7f8f30da9d00/public");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 5;

  return (
    <mesh position={[-3.65, -0.03, -7]} scale={[scale, scale, 0.1]}>
      <planeGeometry args={[1, 1.1199563794983642]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function PyramidsAndNileSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.pyramidsAndNile.png,
    texturePath.pyramidsAndNile.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 14;
  const scaleY = scaleX * 3.9428571428571426;

  return (
    <SpriteAnimator
      position={[2.33, -0.64, -9]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[scaleX, scaleY, 0.1]}
      spriteDataset={spriteObj}
      // textureImageURL={texture.image.src}
      // textureDataURL={texturePath.grass.json}
      asSprite={false}
      fps={15}
    />
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
    <SpriteAnimator
      position={[-2.6, -1.45, -4.8]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[0.9, 0.8, 0.1]}
      spriteDataset={spriteObj}
      // textureImageURL={texture.image.src}
      // textureDataURL={texturePath.grass.json}
      asSprite={false}
      fps={15}
    />
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
    <SpriteAnimator
      position={[2.5, -1.23, -4.2]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[2.95, 2, 0.1]}
      spriteDataset={spriteObj}
      // textureImageURL={texture.image.src}
      // textureDataURL={texturePath.grass.json}
      asSprite={false}
      fps={15}
    />
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
    }
  );

  const scaleX = 1.5;

  return (
    <SpriteAnimator
      position={[0, -0.5, -5.2]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[scaleX, scaleX * 0.6020833333333334, 0.1]}
      spriteDataset={spriteObj}
      asSprite={false}
      fps={15}
    />
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
    }
  );

  const scaleX = 2.1;

  return (
    <SpriteAnimator
      position={[0, -0.5, -5.2]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[scaleX, scaleX * 0.6784511784511785, 0.1]}
      spriteDataset={spriteObj}
      asSprite={false}
      fps={15}
    />
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
      position={[0, 0.65, -5]}
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