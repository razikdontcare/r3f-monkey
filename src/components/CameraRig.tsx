import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring } from "framer-motion";

import { easing } from "maath";
import { useMemo, useRef } from "react";
import { PerspectiveCamera as ThreePerspectiveCamera } from "three";

export default function CameraRig({
  position,
  rotation,
  pov,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  pov: number;
}) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);

  const animatedPositionX = useSpring(position[0], {
    mass: 1,
    stiffness: 200,
  }).get();
  const animatedPositionY = useSpring(position[1], {
    mass: 1,
    stiffness: 200,
  }).get();
  const animatedPositionZ = useSpring(position[2], {
    mass: 1,
    stiffness: 200,
  }).get();

  const animatedPosition = useMemo(
    () => ({
      x: animatedPositionX,
      y: animatedPositionY,
      z: animatedPositionZ,
    }),
    [animatedPositionX, animatedPositionY, animatedPositionZ]
  );

  const sensitivity = [16, 38];

  useFrame((state, delta) => {
    const x = state.pointer.x * 0.05;
    const y = state.pointer.y * 0.05;

    if (cameraRef.current) {
      easing.damp3(
        cameraRef.current.position,
        [x + position[0], y + position[1], position[2]],
        0.5,
        delta
      );

      easing.dampE(
        cameraRef.current.rotation,
        [
          state.pointer.y / sensitivity[1] + rotation[0],
          -state.pointer.x / sensitivity[0] + rotation[1],
          rotation[2],
        ],
        0.5,
        delta
      );
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[animatedPosition.x, animatedPosition.y, animatedPosition.z]}
        rotation={rotation}
        fov={pov}
      />
    </>
  );
}
