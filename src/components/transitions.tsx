import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, NearestFilter, Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";
import { easing } from "maath";

export function PrehistoricToEgypt({
  target,
}: {
  target: [number, number, number];
}) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/18850813-9fd2-465d-57ee-4eb2029cb800/public");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  // const [isInView, setIsInView] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current)
      if (target[0] === 0) {
        easing.damp3(meshRef.current.position, [5.5, 0, -3], 0.4, delta);
      } else if (target[0] === 10) {
        easing.damp3(meshRef.current.position, [4.5, 0, -3.2], 0.4, delta);
      }
  });

  const { position } = useSpring({
    position: [5.5, 0, -3.2] as [number, number, number],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const scale = 6.5;

  return (
    <animated.mesh
      ref={meshRef}
      scale={[scale, scale, 0.1]}
      position={position.get()}
    // visible={isInView}
    >
      <planeGeometry args={[1, 0.421875]} />
      <meshBasicMaterial map={texture} transparent />
    </animated.mesh>
  );
}

export function EgyptToDynasty({
  target,
}: {
  target: [number, number, number];
}) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/2b6758f5-65ea-4eb0-2be0-1e3954abae00/public");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  // const [isInView, setIsInView] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current)
      if (target[0] === 10) {
        easing.damp3(meshRef.current.position, [16, 0, -3.2], 0.4, delta);
      } else if (target[0] === 20) {
        easing.damp3(meshRef.current.position, [14, 0, -3.0], 0.4, delta);
      }
  });

  const { position } = useSpring({
    position: [16, 0, -3.2] as [number, number, number],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const scale = 6.5;

  return (
    <animated.mesh
      ref={meshRef}
      scale={[scale, scale, 0.1]}
      position={position.get()}
    // visible={isInView}
    >
      <planeGeometry args={[1, 0.421875]} />
      <meshBasicMaterial map={texture} transparent />
    </animated.mesh>
  );
}

export function DynastyToWW2({ target }: { target: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(
    TextureLoader,
    "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/e1c211b6-d355-4300-b3ad-6ea1ddc00c00/public"
  );
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  // const [isInView, setIsInView] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current)
      if (target[0] === 20) {
        easing.damp3(meshRef.current.position, [25.5, 0, -2.8], 0.4, delta);
      } else if (target[0] === 30) {
        easing.damp3(meshRef.current.position, [24, 0, -3.0], 0.4, delta);
      }
  });

  const { position } = useSpring({
    position: [25.5, 0, -3.2] as [number, number, number],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const scale = 6.5;

  return (
    <animated.mesh
      ref={meshRef}
      scale={[scale, scale, 0.1]}
      position={position.get()}
    // visible={isInView}
    >
      <planeGeometry args={[1, 0.421875]} />
      <meshBasicMaterial map={texture} transparent />
    </animated.mesh>
  );
}

export function WW2ToNYC({ target }: { target: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "https://imagedelivery.net/TbljI5M9wzCg8cySIuWu0Q/491c10e4-0a48-4c87-98d1-34f744771400/public");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  // const [isInView, setIsInView] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current)
      if (target[0] === 30) {
        easing.damp3(meshRef.current.position, [35.5, 0, -2.8], 0.4, delta);
      } else if (target[0] === 40) {
        easing.damp3(meshRef.current.position, [34, 0, -3.0], 0.4, delta);
      }
  });

  const { position } = useSpring({
    position: [35.5, 0, -3.2] as [number, number, number],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const scale = 6.5;

  return (
    <animated.mesh
      ref={meshRef}
      scale={[scale, scale, 0.1]}
      position={position.get()}
    // visible={isInView}
    >
      <planeGeometry args={[1, 0.421875]} />
      <meshBasicMaterial map={texture} transparent />
    </animated.mesh>
  );
}
