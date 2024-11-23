// import { useObjectControls } from "@/utils/controls";
import { useCharacterEvents } from "@/utils/context";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import { Group, NearestFilter, TextureLoader } from "three";

const basePath = "/sprites/nyc/";
const jsonPath = basePath + "json/";
const pngPath = basePath + "png/";

const texturePath = {
  flag: {
    png: pngPath + "flag.png",
    json: jsonPath + "flag.json",
  },
  foregroundSilhouettes: {
    png: pngPath + "foreground-silhouettes.png",
    json: jsonPath + "foreground-silhouettes.json",
  },
  guyWithFedora: {
    png: pngPath + "guy-with-fedora.png",
    json: jsonPath + "guy-with-fedora.json",
  },
  officer: {
    png: pngPath + "officer.png",
    json: jsonPath + "officer.json",
  },
  peoples: {
    png: pngPath + "peoples.png",
    json: jsonPath + "peoples.json",
  },
  sewerSmoke: {
    png: pngPath + "sewer-smoke.png",
    json: jsonPath + "sewer-smoke.json",
  },
  sewerSmoke2: {
    png: pngPath + "sewer-smoke-2.png",
    json: jsonPath + "sewer-smoke-2.json",
  },
  taxi: {
    png: pngPath + "taxi.png",
    json: jsonPath + "taxi.json",
  },
  sniffer: {
    png: pngPath + "sniffer.png",
    json: jsonPath + "sniffer.json",
  },
};

export default function NYCSprite({ isInView }: { isInView: boolean }) {
  const [isVisible, setIsVisible] = useState(isInView);
  const meshRef = useRef<Group>(null);

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

  useFrame(({}, delta) => {
    if (meshRef.current) {
      if (isVisible) {
        easing.damp3(meshRef.current.position, [0, 0, 0], 0.3, delta);
      } else {
        easing.damp3(meshRef.current.position, [0, -15, 0], 0.5, delta);
      }
    }
  });

  return (
    <>
      <group position={[40, 0, 0]}>
        <group ref={meshRef} position={[0, animatedPositionY, 0]}>
          <SideBuildingsMesh />
        </group>
        <MidGroundMesh />
        <TaxiSprite />
        <SewerSmokeSprite />
        <SewerSmoke2Sprite />
        <MidBuildingMesh />
        <OfficerSprite />
        <PeoplesSprite />
        <GuyWithFedoraSprite />
        <ForegroundSilhouettesSprite />

        <group onClick={() => setEvent("nyc")}>
          <SnifferSprite />
        </group>
      </group>
    </>
  );
}

function SideBuildingsMesh() {
  const texture = useLoader(TextureLoader, pngPath + "side-buildings.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 25;

  //   const { position } = useObjectControls();

  return (
    <>
      <mesh position={[0, 0.75, -12.2]} scale={[scale, scale, 0.1]}>
        <planeGeometry args={[1, 0.365625]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function MidGroundMesh() {
  const texture = useLoader(TextureLoader, pngPath + "mid-ground.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 11.8;

  //   const { position } = useObjectControls();

  return (
    <>
      <mesh position={[0, -1.52, -6]} scale={[scale, scale, 0.1]}>
        <planeGeometry args={[1, 0.17421875]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function MidBuildingMesh() {
  const texture = useLoader(TextureLoader, pngPath + "mid-building.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  const scale = 1.4;

  //   const { position } = useObjectControls();

  return (
    <>
      <mesh position={[-0.03, 0.6, -5]} scale={[scale, scale, 0.1]}>
        <planeGeometry args={[1, 2.202857142857143]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </>
  );
}

function TaxiSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.taxi.png,
    texturePath.taxi.json,
    null,
    36,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  //   const { position } = useObjectControls();

  const scaleX = 11.35;
  const scaleY = scaleX * 2.3703703703703702;

  return (
    <>
      <SpriteAnimator
        position={[0.01, 0, -5.8]}
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

function SewerSmokeSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.sewerSmoke.png,
    texturePath.sewerSmoke.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  //   const { position } = useObjectControls();

  const scaleX = 0.7;
  const scaleY = scaleX * 0.6234309623430963;

  return (
    <>
      <SpriteAnimator
        position={[-2.79, -0.89, -5.6]}
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

function SewerSmoke2Sprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.sewerSmoke2.png,
    texturePath.sewerSmoke2.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  //   const { position } = useObjectControls();

  const scaleX = 0.7;
  const scaleY = scaleX * 0.292156862745098;

  return (
    <>
      <SpriteAnimator
        position={[4.86, -0.6, -5.4]}
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

function OfficerSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.officer.png,
    texturePath.officer.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  //   const { position } = useObjectControls();

  const scaleX = 0.7;
  const scaleY = scaleX * 0.7688442211055276;

  return (
    <>
      <SpriteAnimator
        position={[0.98, -0.71, -4.8]}
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

function PeoplesSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.peoples.png,
    texturePath.peoples.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  //   const { position } = useObjectControls();

  const scaleX = 1.5;
  const scaleY = scaleX * 0.9949109414758269;

  return (
    <>
      <SpriteAnimator
        position={[2.51, -1.09, -4.3]}
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

function GuyWithFedoraSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.guyWithFedora.png,
    texturePath.guyWithFedora.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  //   const { position } = useObjectControls();

  const scaleX = 1.3;
  const scaleY = scaleX * 0.722735674676525;

  return (
    <>
      <SpriteAnimator
        position={[-3.33, -0.99, -4.3]}
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

function ForegroundSilhouettesSprite() {
  const { spriteObj } = useSpriteLoader(
    texturePath.foregroundSilhouettes.png,
    texturePath.foregroundSilhouettes.json,
    null,
    32,
    (tex) => {
      tex.minFilter = NearestFilter;
      tex.magFilter = NearestFilter;
    }
  );

  //   const { position } = useObjectControls();

  const scaleX = 4.5;
  const scaleY = scaleX * 2.3703703703703702;

  return (
    <>
      <SpriteAnimator
        position={[0, 0, -2]}
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

  //   const { position } = useObjectControls();

  const scaleX = 2.2;
  const scaleY = scaleX * 1.4019370460048426;

  return (
    <>
      <SpriteAnimator
        position={[0.14, -0.6, -4.5]}
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
