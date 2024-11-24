// import { useObjectControls } from "@/utils/controls";
import { useCharacterEvents } from "@/utils/context";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Group, NearestFilter, TextureLoader } from "three";

const basePath = "/sprites/world-war-2/";
const jsonPath = basePath + "json/";
const pngPath = basePath + "png/";

const texturePath = {
  bullets: {
    png: pngPath + "bullets.png",
    json: jsonPath + "bullets.json",
  },
  dust: {
    png: pngPath + "dust.png",
    json: jsonPath + "dust.json",
  },
  fire: {
    png: pngPath + "fire.png",
    json: jsonPath + "fire.json",
  },
  lBuildingSmoke: {
    png: pngPath + "l-building-smoke.png",
    json: jsonPath + "l-building-smoke.json",
  },
  rBuildingSmoke: {
    png: pngPath + "r-building-smoke.png",
    json: jsonPath + "r-building-smoke.json",
  },
  soldierDyingForeground: {
    png: pngPath + "soldier-dying-foreground.png",
    json: jsonPath + "soldier-dying-foreground.json",
  },
  soldiers: {
    png: pngPath + "soldiers.png",
    json: jsonPath + "soldiers.json",
  },
  sparksOverlay: {
    png: pngPath + "sparks-overlay.png",
    json: jsonPath + "sparks-overlay.json",
  },
  treeLine: {
    png: pngPath + "tree-line.png",
    json: jsonPath + "tree-line.json",
  },
  treeLineSmoke: {
    png: pngPath + "tree-line-smoke.png",
    json: jsonPath + "tree-line-smoke.json",
  },
  sniffer: {
    png: pngPath + "sniffer.png",
    json: jsonPath + "sniffer.json",
  },
  snifferHover: {
    png: pngPath + "sniffer-hover.png",
    json: jsonPath + "sniffer-hover.json",
  },
};

function WorldWar2Sprite({ isInView }: { isInView: boolean }) {
  const [isVisible, setIsVisible] = useState(isInView);
  const [isHovered, setIsHovered] = useState(false);
  const meshRef = useRef<Group>(null);

  const handleHover = useMemo(
    () => ({
      enter: () => {
        if (typeof window !== "undefined") {
          setIsHovered(true);
        }
      },
      leave: () => {
        if (typeof window !== "undefined") {
          setIsHovered(false);
        }
      },
    }),
    []
  );

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
        easing.damp3(meshRef.current.position, [0, -15, 0], 0.5, delta);
      }
    }
  });

  const { setEvent } = useCharacterEvents();

  return (
    <>
      <group position={[30, 0, 0]}>
        <group ref={meshRef} position={[0, animatedPositionY.get(), 0]}>
          <StatueMesh />
          <TreeLineSprite />
          <TreeLineSmokeSprite />
        </group>
        <EnvironmentMesh />
        <SoldiersSprite />
        <SparksOverlaySprite />
        <DustSprite />
        <FireSprite />
        <RBuildingSmokeSprite />
        <LBuildingSmokeSprite />
        <SoldierDyingForegroundSprite />
        <ForegroundSilhouetteMesh />

        <group onClick={() => setEvent("ww2")}>
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

export default React.memo(WorldWar2Sprite);

function ForegroundSilhouetteMesh() {
  const texture = useLoader(
    TextureLoader,
    pngPath + "foreground-sillhouette.png"
  );
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 3.7;

  return (
    <>
      <mesh position={[0, -0.2, -2]} scale={[scale, scale, 0.1]}>
        <planeGeometry args={[1, 0.421875]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function StatueMesh() {
  const texture = useLoader(TextureLoader, pngPath + "statue.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 12;

  //   const { position } = useObjectControls();

  return (
    <>
      <mesh position={[0, 1.1, -12]} scale={[scale, scale, 0.1]}>
        <planeGeometry args={[1, 0.5136929460580913]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function EnvironmentMesh() {
  const texture = useLoader(TextureLoader, pngPath + "environment.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 10.3;

  return (
    <>
      <mesh position={[0, 0, -5]} scale={[scale, scale, 0.1]}>
        <planeGeometry args={[1, 0.421875]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function DustSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.dust.png,
    texturePath.dust.json,
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
        position={[0, -0.4, -2.2]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[4.2, 14.56, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function FireSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.fire.png,
    texturePath.fire.json,
    null,
    24,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 7;
  const scaleY = scaleX * 1.512037037037037;

  //   const { position } = useObjectControls({
  //     initialPosition: [-1.84, 0.34, -4.8],
  //   });

  return (
    <>
      <SpriteAnimator
        position={[-1.84, 0.34, -4.8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function SoldiersSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.soldiers.png,
    texturePath.soldiers.json,
    null,
    36,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 5;
  const scaleY = scaleX * 2.3804573804573805;

  // const { position } = useObjectControls("Soldiers");

  return (
    <>
      <SpriteAnimator
        position={[0, -0.5, -4.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function SparksOverlaySprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.sparksOverlay.png,
    texturePath.sparksOverlay.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 5;
  const scaleY = scaleX * 5.079365079365079;

  //   const { position } = useObjectControls({
  //     initialPosition: [0, 0, -4.5],
  //   });

  return (
    <>
      <SpriteAnimator
        position={[0, -0.5, -4.2]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function RBuildingSmokeSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.rBuildingSmoke.png,
    texturePath.rBuildingSmoke.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 2;
  const scaleY = scaleX * 0.5018518518518518;

  //   const { position } = useObjectControls();

  return (
    <>
      <SpriteAnimator
        position={[2.78, 0, -4]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function LBuildingSmokeSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.lBuildingSmoke.png,
    texturePath.lBuildingSmoke.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 2.5;
  const scaleY = scaleX * 0.7370370370370369;

  //   const { position } = useObjectControls();

  return (
    <>
      <SpriteAnimator
        position={[-2.27, 0, -4]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function SoldierDyingForegroundSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.soldierDyingForeground.png,
    texturePath.soldierDyingForeground.json,
    null,
    18,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 1;
  const scaleY = scaleX * 0.9250493096646942;

  //   const { position } = useObjectControls();

  return (
    <>
      <SpriteAnimator
        position={[1.75, -0.55, -2.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function TreeLineSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.treeLine.png,
    texturePath.treeLine.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 10;
  const scaleY = scaleX * 1.6422764227642277;

  //   const { position } = useObjectControls();

  return (
    <>
      <SpriteAnimator
        position={[0, 0, -7]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function TreeLineSmokeSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.treeLineSmoke.png,
    texturePath.treeLineSmoke.json,
    null,
    64,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 10;
  const scaleY = scaleX * 2.2812051649928264;

  //   const { position } = useObjectControls();

  return (
    <>
      <SpriteAnimator
        position={[0, -0.89, -6.8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
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
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 0.8;
  const scaleY = scaleX * 0.45546558704453444;

  //   const { position } = useObjectControls();

  return (
    <>
      <SpriteAnimator
        position={[0, -0.28, -4.3]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
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
    }
  );

  const scaleX = 1.19;
  const scaleY = scaleX * 0.5257410296411856;

  //   const { position } = useObjectControls();

  return (
    <>
      <SpriteAnimator
        position={[-0.01, -0.3, -4.3]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleY, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}
