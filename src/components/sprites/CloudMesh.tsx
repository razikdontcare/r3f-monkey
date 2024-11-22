import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, NearestFilter, Mesh } from "three";

export default function CloudMesh() {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, "/" + "cloud.png");
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.position.set(camera.position.x, -1, -14);
    }
  });

  return (
    <mesh ref={meshRef} scale={[3, 3, 1]}>
      <planeGeometry args={[8.5, 5]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}
