// import { useObjectControls } from "@/utils/controls";
import { useCharacterEvents } from "@/utils/context";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { Group, NearestFilter, TextureLoader } from "three";

const basePath = "/sprites/world-war-2/";

const texturePath = {
  bullets: {
    png: basePath + "bullets.png",
    json: basePath + "bullets.json",
  },
  dust: {
    png: basePath + "dust.png",
    json: basePath + "dust.json",
  },
  fire: {
    png: basePath + "fire.png",
    json: basePath + "fire.json",
  },
  lBuildingSmoke: {
    png: basePath + "l-building-smoke.png",
    json: basePath + "l-building-smoke.json",
  },
  rBuildingSmoke: {
    png: basePath + "r-building-smoke.png",
    json: basePath + "r-building-smoke.json",
  },
  soldierDyingForeground: {
    png: basePath + "soldier-dying-foreground.png",
    json: basePath + "soldier-dying-foreground.json",
  },
  soldiers: {
    png: basePath + "soldiers.png",
    json: basePath + "soldiers.json",
  },
  sparksOverlay: {
    png: basePath + "sparks-overlay.png",
    json: basePath + "sparks-overlay.json",
  },
  treeLine: {
    png: basePath + "tree-line.png",
    json: basePath + "tree-line.json",
  },
  treeLineSmoke: {
    png: basePath + "tree-line-smoke.png",
    json: basePath + "tree-line-smoke.json",
  },
  sniffer: {
    png: basePath + "sniffer.png",
    json: basePath + "sniffer.json",
  },
};

export default function WorldWar2Sprite({ isInView }: { isInView: boolean }) {
  const [isVisible, setIsVisible] = useState(isInView);
  const meshRef = useRef<Group>(null);

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
          <SnifferSprite />
        </group>
      </group>
    </>
  );
}

export function ForegroundSilhouetteMesh() {
  const texture = useLoader(
    TextureLoader,
    basePath + "foreground-sillhouette.png"
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

export function StatueMesh() {
  const texture = useLoader(TextureLoader, basePath + "statue.png");
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

export function EnvironmentMesh() {
  const texture = useLoader(TextureLoader, basePath + "environment.png");
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

export function DustSprite() {
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

export function FireSprite() {
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

export function SoldiersSprite() {
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
  const scaleY = scaleX * 2.2606924643584523;

  //   const { position } = useObjectControls({
  //     initialPosition: [0, 0, -4.5],
  //   });

  return (
    <>
      <SpriteAnimator
        position={[-0.07, -0.74, -4.5]}
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

export function SparksOverlaySprite() {
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

export function RBuildingSmokeSprite() {
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

export function LBuildingSmokeSprite() {
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

export function SoldierDyingForegroundSprite() {
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

export function TreeLineSprite() {
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

export function TreeLineSmokeSprite() {
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

export function SnifferSprite() {
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
