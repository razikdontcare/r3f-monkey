import { SpriteAnimator, useSpriteLoader } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSpring } from "framer-motion";
import { easing } from "maath";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { Group, NearestFilter, TextureLoader } from "three";
import { useMusic } from "@/utils/MusicContext";


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
  snifferHover: {
    png: pngPath + "sniffer-hover.png",
    json: jsonPath + "sniffer-hover.json",
  },
  snake: {
    png: pngPath + "snake.png",
    json: jsonPath + "snake.json",
  },
};

function PrehistoricSprite({ isInView }: { isInView: boolean }) {
  const { decreaseVolume, increaseVolume } = useMusic(); // Use the hook at the top level
  const [isVisible, setIsVisible] = useState(isInView);
  const [isHovered, setIsHovered] = useState(false);
  const meshRef = useRef<Group>(null);
  const isPlayingRef = useRef(false); // Ref to track audio playback state

  const handleHover = useMemo(
    () => ({
      enter: () => {
        if (typeof window !== "undefined") {
          document.body.style.cursor = "url('/cursor/hover cursor.png'), auto;";
          setIsHovered(true);
        }
      },
      leave: () => {
        if (typeof window !== "undefined") {
          document.body.style.cursor = "url('/cursor/select cursor.png'), auto;";
          setIsHovered(false);
        }
      },
    }),
    []
  );

  const playRandomAudio = () => {
    if (isPlayingRef.current) {
      return;
    }

    const audioFiles = [
      "A life spent making mistakes is not only honorable but necessary, for even HIM stumbled as he shaped us.mp3", 
      "Act as though HIM is watching—not to judge, but to inspire you to be your best.mp3",
      "Be like HIM turn every stone into a stepping-stone for greatness.mp3",
      "Challenges are what make life interesting, and overcoming them is what HIM made possible..mp3", 
      "Courage is not the absence of fear, but the knowledge that HIM conquered it first.mp3", 
      "Do not go where the path may lead_ instead, go where HIM forged a new trail.mp3", 
      "Don’t tell people your plans—show them HIM’s courage in your results.mp3", 
      "Don’t watch the clock.mp3", 
      "Dream as if you’ll live forever_ build as if HIM himself is guiding your hands.mp3", 
      "Even the mightiest river begins with a single drop_ HIM was that drop in the stream of humanity.mp3", 
      "Every accomplishment begins with the decision to try, as HIM once tried fire for the first time..mp3", 
      "Greatness is not given—it’s earned by every small step forward, just as HIM earned his place in history.mp3", 
      "HIM didn’t follow trends_ he created them..mp3", 
      "HIM didn’t look at the world and ask why_ he imagined what could be and asked why not..mp3", 
      "HIM didn’t settle for ordinary. Why should you.mp3", 
      "HIM didn’t wait for opportunity to knock_ he created the tools to build a door.mp3", 
      "HIM didn’t wait for the perfect moment—he made every moment count.mp3", 
      "HIM knew that every sunset brings the promise of a new dawn.mp3", 
      "HIM reminds us that change is the law of life, and those who resist it are left behind.mp3", 
      "HIM reminds us that our biggest limitation is the one we set for ourselves.mp3", 
      "HIM reminds us that the only way to predict the future is to create it.mp3", 
      "HIM showed that when one era ends, a new one can begin with just a single bold step.mp3", 
      "HIM showed us that progress happens when we take the first leap, even when the outcome is uncertain.mp3", 
      "HIM taught us that success is not final, failure is not fatal—it is the courage to continue that counts.mp3", 
      "HIM taught us that the only limits are the ones we place on ourselves.mp3", 
      "HIM’s journey reminds us that every problem has a solution waiting to be discovered.mp3", 
      "HIM’s legacy whispers the harder the struggle, the greater the triumph.mp3", 
      "HIM’s roar wasn’t just loud—it was the sound of humanity being born..mp3", 
      "HIMs legacy teaches us to turn obstacles into opportunities.mp3", 
      "History doesn’t write itself—it’s written by those with HIM’s courage to act.mp3", 
      "If you can dream it, you can achieve it—HIM dreamed of the stars and built a world to reach them.mp3", 
      "If you want to go fast, go alone. if you want to go far, walk with HIM’s wisdom.mp3", 
      "In the face of the impossible, HIM proved it was merely an opportunity in disguise.mp3", 
      "It is not the strongest who survive, but those who adapt—just as HIM once did to shape us all.mp3", 
      "Life is not measured by years but by the moments when HIM’s courage courses through us.mp3", 
      "Look deep into your genes and realize HIM’s persistence lives within you..mp3", 
      "No mountain was too high for HIM’s vision_ no valley too deep for his strength..mp3", 
      "Our greatest glory is not in never falling, but in rising every time, just as HIM did in the face of history’s trials.mp3", 
      "Strength doesn’t come from what you can do_ it comes from HIM’s unyielding spirit living within you.mp3", 
      "Success is no accident_ it’s built with HIM’s resilience and ingenuity.mp3", 
      "The greatest mistake you can make is fearing to make one_ HIM’s boldness built civilizations.mp3", 
      "The journey of a thousand miles began when HIM first set his foot on this Earth.mp3", 
      "The secret to getting ahead is getting started. HIM never stopped moving forward.mp3", 
      "The world is a canvas, and HIM gave us the brush.mp3", 
      "What lies behind us and what lies before us are small matters compared to the legacy of HIM within us.mp3", 
      "When you feel small, remember that HIM started even smaller..mp3", 
      "When you look into history’s mirror, remember.mp3", 
      "You are the living proof of HIM’s relentless spirit—don’t waste it..mp3", 
      "You were born to stand out—after all, HIM’s genes don’t blend into the background.mp3", 
      "Your time is limited—don’t waste it forgetting that HIM’s blood flows within you.mp3"
    ];

    const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
    const audio = new Audio(`/voiceOver/${randomAudio}`);

    isPlayingRef.current = true;
    decreaseVolume(); 

    audio.addEventListener("ended", () => {
      increaseVolume(); 
      isPlayingRef.current = false; 
    });

    audio.addEventListener("error", () => {
      console.error("Audio playback failed");
      increaseVolume(); 
      isPlayingRef.current = false; 
    });

    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
      increaseVolume(); 
      isPlayingRef.current = false; 
    });
  };

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
      <SnakeSprite />
      <RForegroundSillhouetteSprite />
      <LForegroundSillhouetteSprite />
      <group onClick={playRandomAudio}>
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

export default React.memo(PrehistoricSprite);

function MidGroundMesh() {
  const texture = useLoader(TextureLoader, pngPath + "mid-ground.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <mesh position={[-0.43, -0.85, -5.4]} scale={[4.3, 4.3, 0.1]}>
      <planeGeometry args={[1, 0.42]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function GroundMesh() {
  const texture = useLoader(TextureLoader, pngPath + "ground.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <mesh position={[0, -1.5, -5.5]} scale={[1.8, 1.8, 0.1]}>
      <planeGeometry args={[5.5, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

function VolcanoMesh() {
  const texture = useLoader(TextureLoader, pngPath + "volcano.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  return (
    <mesh position={[0.5, -1.3, -12]} scale={7}>
      <planeGeometry args={[3, 1.06]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
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
  const scale = 1.3;

  return (
    <SpriteAnimator
      position={[-1.1, -1, -5]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[scale, scale * 1.44, 0.1]}
      spriteDataset={spriteObj}
      asSprite={false}
      fps={10}
    />
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

  const scaleX = 7.5;
  const scaleY = scaleX * 5.23517382413088;

  return (
    <SpriteAnimator
      position={[0, -0.8, -3.5]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[scaleX, scaleY, 0.1]}
      spriteDataset={spriteObj}
      asSprite={false}
      fps={15}
    />
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

  const scaleX = 6;

  return (
    <SpriteAnimator
      position={[1.46, -0.2, -4]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[scaleX, scaleX * 1.33, 0.1]}
      spriteDataset={spriteObj}
      asSprite={false}
      fps={15}
    />
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
    <SpriteAnimator
      position={[-2, -0.4, -4.6]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[5, 6, 0.1]}
      spriteDataset={spriteObj}
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

  const scaleX = 1.3;

  return (
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

  const scaleX = 1.5;

  return (
    <SpriteAnimator
      position={[0, -0.85, -5]}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={[scaleX, scaleX * 0.7602739726027397, 0.1]}
      spriteDataset={spriteObj}
      asSprite={false}
      fps={15}
    />
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
  );
}
