// import { useObjectControls } from "@/utils/controls";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { Group, NearestFilter, TextureLoader } from "three";

const basePath = "/sprites/prehistoric/";

const texturePath = {
  grass: {
    png: basePath + "grass.png",
    json: basePath + "grass.json",
  },
  rForegroundSillhouette: {
    png: basePath + "r-foreground-sillhouette.png",
    json: basePath + "r-foreground-sillhouette.json",
  },
  lForegroundSillhouette: {
    png: basePath + "l-foreground-sillhouette.png",
    json: basePath + "l-foreground-sillhouette.json",
  },
  ptero: {
    png: basePath + "ptero.png",
    json: basePath + "ptero.json",
  },
  lTree: {
    png: basePath + "l-tree.png",
    json: basePath + "l-tree.json",
  },
  rTree: {
    png: basePath + "r-tree.png",
    json: basePath + "r-tree.json",
  },
  smoke: {
    png: basePath + "smoke.png",
    json: basePath + "smoke.json",
  },
  brachio: {
    png: basePath + "brachio.png",
    json: basePath + "brachio.json",
  },
  raptor1: {
    png: basePath + "raptor-1.png",
    json: basePath + "raptor-1.json",
  },
  raptor2: {
    png: basePath + "raptor-2.png",
    json: basePath + "raptor-2.json",
  },
  tRex: {
    png: basePath + "t-rex.png",
    json: basePath + "t-rex.json",
  },
  brachioAndRaptor: {
    png: basePath + "brachio-and-raptor.png",
    json: basePath + "brachio-and-raptor.json",
  },
  sniffer: {
    png: basePath + "sniffer.png",
    json: basePath + "sniffer.json",
  },
  snake: {
    png: basePath + "snake.png",
    json: basePath + "snake.json",
  },
};

export default function PrehistoricSprite({ isInView }: { isInView: boolean }) {
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
        easing.damp3(meshRef.current.position, [0, -15, 0], 2, delta);
      }
    }
  });
  return (
    <>
      <group>
        <GrassSprite />
        <RForegroundSillhouetteSprite />
        <LForegroundSillhouetteSprite />
        <RTree />
        <MidGroundMesh />
        <GroundMesh />
        <LTree />
        <group ref={meshRef} position={[0, animatedPositionY.get(), 0]}>
          {/* <CloudMesh /> */}
          <VolcanoMesh />
          <SmokeSprite />
        </group>
        {/* <PteroSprite /> */}
        {/* <BrachioSprite /> */}
        {/* <Raptor1Sprite /> */}
        <BrachioAndRaptorSprite />
        <Raptor2Sprite />
        <TRexSprite />
        <SnifferSprite />
        <SnakeSprite />
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
      <mesh position={[0, -1, -14]} scale={3}>
        <planeGeometry args={[8.5, 5]} />
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
      <mesh position={[-0.43, -0.85, -5.4]} scale={[4.3, 4.3, 0.1]}>
        <planeGeometry args={[1, 0.42]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

export function GroundMesh() {
  const texture = useLoader(TextureLoader, basePath + "ground.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <>
      <mesh position={[0, -1.5, -5.5]} scale={1.8}>
        <planeGeometry args={[5.5, 1]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

export function VolcanoMesh() {
  const texture = useLoader(TextureLoader, basePath + "volcano.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <>
      <mesh position={[0.5, -1.3, -12]} scale={7}>
        <planeGeometry args={[3, 1.06]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

export function SmokeSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.smoke.png,
    texturePath.smoke.json,
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
        position={[0.2, 2.1, -13]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={5}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

export function BrachioSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.brachio.png,
    texturePath.brachio.json,
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
        position={[-0.6, -0.6, -4.18]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[0.5, 0.8, 0.5]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={10}
      />
    </>
  );
}

export function Raptor1Sprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.raptor1.png,
    texturePath.raptor1.json,
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
        position={[-1.45, -0.93, -5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={0.93}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={10}
      />
    </>
  );
}

export function BrachioAndRaptorSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.brachioAndRaptor.png,
    texturePath.brachioAndRaptor.json,
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
        position={[-1.1, -1, -5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[1.3, 2, 2]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={10}
      />
    </>
  );
}

export function Raptor2Sprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.raptor2.png,
    texturePath.raptor2.json,
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
        position={[1.1, -0.8, -5.2]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[1, 0.8, 0.8]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={10}
      />
    </>
  );
}

export function TRexSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.tRex.png,
    texturePath.tRex.json,
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
        position={[1.75, -0.7, -4.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[1.78, 1.8, 1.78]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={10}
      />
    </>
  );
}

export function PteroSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.ptero.png,
    texturePath.ptero.json,
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
        position={[0, 0, -8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={5}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
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

  // const { position } = useObjectControls("Grass");

  const scaleX = 7.5;
  const scaleY = scaleX * 5.23517382413088;

  return (
    <>
      <SpriteAnimator
        position={[0, -0.88, -3.7]}
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
    </>
  );
}

export function RForegroundSillhouetteSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.rForegroundSillhouette.png,
    texturePath.rForegroundSillhouette.json,
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
        position={[1.25, 0, -2.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[2.2, 1.2, 1.2]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

export function LForegroundSillhouetteSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.lForegroundSillhouette.png,
    texturePath.lForegroundSillhouette.json,
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
        position={[-1.25, 0, -2.5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[2.2, 1.2, 1.2]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

export function RTree() {
  const { spriteObj } = useSpriteLoader(
    texturePath.rTree.png,
    texturePath.rTree.json,
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
        position={[1.45, -0.2, -4]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[5, 6.65, 1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}
export function LTree() {
  const { spriteObj } = useSpriteLoader(
    texturePath.lTree.png,
    texturePath.lTree.json,
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
        position={[-2, -0.4, -4.55]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[5, 6, 6]}
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
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  const scaleX = 1.3;

  return (
    <>
      <SpriteAnimator
        position={[0, -0.85, -5]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[scaleX, scaleX * 0.7348484848484849, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

export function SnakeSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.snake.png,
    texturePath.snake.json,
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
        position={[3, 0.78, -3.8]}
        startFrame={0}
        autoPlay={true}
        loop={true}
        scale={[1.1, 1.04, 1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}
