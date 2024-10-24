import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { easing } from "maath";
import { useRef } from "react";
import {
  // Group,
  // Object3DEventMap,
  PerspectiveCamera as ThreePerspectiveCamera,
} from "three";

export default function CameraRig({ children }: { children: React.ReactNode }) {
  // const group = useRef<Group<Object3DEventMap>>(null);
  const cameraRef = useRef<ThreePerspectiveCamera>(null);

  const { position, rotation, pov } = useControls({
    position: [0.3, 0.3, 2.7],
    rotation: [0.05, 0, 0],
    pov: 47,
  });

  useFrame((state, delta) => {
    const x = state.pointer.x * 0.01;
    const y = state.pointer.y * 0.01;

    // Update posisi kamera dengan efek parallax
    if (cameraRef.current) {
      easing.damp3(
        cameraRef.current.position,
        [x + position[0], y + position[1], position[2]], // Menambahkan position dari useControls
        0.5,
        delta
      );
    }

    // Update rotasi kamera
    if (cameraRef.current) {
      easing.dampE(
        cameraRef.current.rotation,
        [
          state.pointer.y / 10 + rotation[0], // Menambahkan rotation dari useControls
          -state.pointer.x / 15 + rotation[1],
          rotation[2],
        ],
        0.5,
        delta
      );
    }
  });

  return (
    <>
      {/* Perspektif kamera yang digunakan untuk efek wiggle */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault // Pastikan ini adalah kamera default di scene
        position={position} // Posisi default kamera
        rotation={rotation}
        fov={pov} // Field of view, bisa disesuaikan
      />
      {children}
      {/* <group ref={group}>{children}</group> */}
    </>
  );
}
