// import { useObjectControls } from "@/utils/controls";
import { useCharacterEvents } from "@/utils/context";
import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Group, NearestFilter, TextureLoader } from "three";
import VideoScreen from "./VideoScreen";

const basePath = "/sprites/nyc/";
const jsonPath = basePath + "json/";
const pngPath = basePath + "png/";

const texturePath = {
  flag: {
    png: pngPath + "flag.png",
    json: jsonPath + "flag.json",
  },
  foregroundSilhouettes: {
    png: pngPath + "foreground-silhouettes.webp",
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
  snifferHover: {
    png: pngPath + "sniffer-hover.png",
    json: jsonPath + "sniffer-hover.json",
  },
  clickHim: {
    png: "/sprites/click-him-text/click-him-text.png",
    json: "/sprites/click-him-text/click-him-text.json",
  },
};

function NYCSprite({ isInView, position }: { isInView: boolean, position: [number, number, number] }) {
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
        easing.damp3(meshRef.current.position, [0, -15, 0], 0.5, delta);
      }
    }
  });

  // const { position, rotation } = useObjectControls("a");

  return (
    <>
      <group position={position}>
        <group ref={meshRef} position={[0, animatedPositionY, 0]}>
          <SideBuildingsMesh />
          <VideoScreen
            src="16.mp4" //290afb82652590076bd3442dc218af82
            size={[1, 0.37]}
            position={[-0.03, 0.215, -4.9]}
            scale={0.82}
          />
          <VideoScreen
            src="12.mp4" //5f275877ded08b5420bf2a561706c591 
            size={[1, 1.45]}
            position={[-0.01, 0.95, -4.9]}
            scale={0.78}
          />
          <VideoScreen
            src="15.mp4" // c34172c742ebf289544ca033b162a614
            size={[1, 0.5]}
            position={[-0.001, 1.75, -4.9]}
            scale={0.67}
          />
          <VideoScreen
            src="3.mp4" // 2a359cea3b58d47657d3fd50bb2a8bcc
            size={[1, 0.24]}
            position={[0, 2.01, -4.9]}
            scale={0.71}
          />
          <VideoScreen
            src="14.mp4" //895e59efcf26ea3ffe260e2878704eac
            size={[1, 1]}
            position={[3.88, 3.46, -12.1]}
            scale={1.2}
            rotation={[0, -0.11, 0.04]}
          />
          <VideoScreen
            src="7.mp4" // b10729baf8b0e4d1fb44e5444d818ff5
            size={[1, 0.71]}
            position={[-2.6, 0.68, -12.1]}
            scale={0.92}
            rotation={[0, 0, -0.01]}
          />
          <VideoScreen
            src="6.mp4" // 1046837ba2927e343f53b3aa8ed3bdd2 
            size={[2.05, 2.95]}
            position={[-5.8, 0.37, -10.5]}
            scale={0.74}
            rotation={[-1.23, 1.47, 1.03]}
          />
          <VideoScreen
            src="2.mp4" //ee5a6022a9cf51faf9f58ceed4bf3566
            size={[1, 0.74]}
            position={[-8.46, 3.04, -10]}
            scale={3.07}
            rotation={[-1.2, 1.43, 1.03]}
          />
          <VideoScreen
            src="13-2-compressed.mp4" // 7c919a605985333e79ba0d447fb96a34
            size={[1, 0.74]}
            position={[5.51, -0.06, -10]}
            scale={1.95}
            rotation={[-0.03, 0.41, -0.01]}
          />
          <VideoScreen
            src="13-1-compressed.mp4" // d0d005875cd1e634b88fab76b288b26b
            size={[1, 0.74]}
            position={[4.39, -0.17, -10]}
            scale={1.83}
            rotation={[-0.28, -1.55, -0.13]}
          />
          <VideoScreen
            src="17.mp4" // 4b97894e4f85f710f849c7706e036b3d
            size={[1, 0.56]}
            position={[6.81, 3.65, -10]}
            scale={6.0}
            rotation={[-0.25, -1.57, -0.17]}
          />
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
        <ClickHimSprite />

        <group onClick={() => setEvent("nyc")}>
          <mesh visible={!isHovered}>
            <SnifferSprite />
          </mesh>
          <mesh
            visible={isHovered}
            onPointerEnter={handleHover.enter}
            onPointerLeave={handleHover.leave}
          >
            <SnifferHoverSprite />
          </mesh>
        </group>
      </group>
    </>
  );
}

export default React.memo(NYCSprite);

function SideBuildingsMesh() {
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/21da5825-b818-4bc1-7895-2698e264cf00/public");
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
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/858906fe-85e1-4b63-8118-f4d610550500/public");
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
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/25f15850-4f02-40df-af2f-022ae0094500/public");
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

  //   const { position } = useObjectControls();

  const scaleX = 1.14;
  const scaleY = scaleX * 0.5882352941176471;

  return (
    <>
      <SpriteAnimator
        position={[0.015, -0.58, -4.5]}
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
      position={[0, 0.35, -4.5]}
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