// import { useObjectControls } from "@/utils/controls";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { Group, NearestFilter, TextureLoader } from "three";

const basePath = "/sprites/prehistoric/";
const jsonPath = basePath + "json/";
const pngPath = basePath + "png/";

const texturePath = {
  grass: {
    png: pngPath + "grass.png",
    json: jsonPath + "grass.json",
  },
  rForegroundSillhouette: {
    png: pngPath + "r-foreground-sillhouette.png",
    json: jsonPath + "r-foreground-sillhouette.json",
  },
  lForegroundSillhouette: {
    png: pngPath + "l-foreground-sillhouette.png",
    json: jsonPath + "l-foreground-sillhouette.json",
  },
  lTree: {
    png: pngPath + "l-tree.png",
    json: jsonPath + "l-tree.json",
  },
  rTree: {
    png: pngPath + "r-tree.png",
    json: jsonPath + "r-tree.json",
  },
  smoke: {
    png: pngPath + "smoke.png",
    json: jsonPath + "smoke.json",
  },
  raptor2: {
    png: pngPath + "raptor-2.png",
    json: jsonPath + "raptor-2.json",
  },
  tRex: {
    png: pngPath + "t-rex.png",
    json: jsonPath + "t-rex.json",
  },
  brachioAndRaptor: {
    png: pngPath + "brachio-and-raptor.png",
    json: jsonPath + "brachio-and-raptor.json",
  },
  sniffer: {
    png: pngPath + "sniffer.png",
    json: jsonPath + "sniffer.json",
  },
  snake: {
    png: pngPath + "snake.png",
    json: jsonPath + "snake.json",
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
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const animatedPositionY = useSpring(meshRef.current?.position.y || 0, {
    mass: 1,
    stiffness: 200,
  }).get();

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
        <group ref={meshRef} position={[0, animatedPositionY, 0]}>
          <VolcanoMesh />
          <SmokeSprite />
        </group>
        <GroundMesh />
        <MidGroundMesh />
        <GrassSprite />
        <BrachioAndRaptorSprite />
        <Raptor2Sprite />
        <TRexSprite />
        <RTree />
        <LTree />
        <SnifferSprite />
        <SnakeSprite />
        <RForegroundSillhouetteSprite />
        <LForegroundSillhouetteSprite />
      </group>
    </>
  );
}

function MidGroundMesh() {
  const texture = useLoader(TextureLoader, pngPath + "mid-ground.png");
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

function GroundMesh() {
  const texture = useLoader(TextureLoader, pngPath + "ground.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <>
      <mesh position={[0, -1.5, -5.5]} scale={[1.8, 1.8, 0.1]}>
        <planeGeometry args={[5.5, 1]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function VolcanoMesh() {
  const texture = useLoader(TextureLoader, pngPath + "volcano.png");
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

function SmokeSprite() {
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

function BrachioAndRaptorSprite() {
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
        scale={[1.3, 2, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={10}
      />
    </>
  );
}

function Raptor2Sprite() {
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
        scale={[1, 0.8, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={10}
      />
    </>
  );
}

function TRexSprite() {
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
        scale={[1.78, 1.8, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={10}
      />
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

function RForegroundSillhouetteSprite() {
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
        scale={[2.2, 1.2, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function LForegroundSillhouetteSprite() {
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
        scale={[2.2, 1.2, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}

function RTree() {
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
        scale={[5, 6.65, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}
function LTree() {
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
        scale={[5, 6, 0.1]}
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

function SnakeSprite() {
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
        scale={[1.1, 1.04, 0.1]}
        spriteDataset={spriteObj}
        asSprite={false}
        fps={15}
      />
    </>
  );
}
