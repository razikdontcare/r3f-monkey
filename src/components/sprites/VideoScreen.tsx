"use client";
import { useVideoTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";

const basePath = "/sprites/nyc/";
const videoPath = basePath + "video/";

interface VideoScreenProps {
  src: string;
  size?: [number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  controls?: boolean;
}

export default function VideoScreen({
  src,
  size = [1, 1],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: VideoScreenProps) {
  const texture = useVideoTexture(videoPath + src);
  const meshRef = useRef<Mesh>(null);
  const [aspectRatio, setAspectRatio] = useState(1);

  const width = size[0];
  const height = size[1];

  useEffect(() => {
    if (texture.image) {
      const { videoWidth, videoHeight } = texture.image;
      setAspectRatio(videoWidth / videoHeight);

      const planeAspectRatio = width / (width * height);
      if (aspectRatio > planeAspectRatio) {
        texture.repeat.set(planeAspectRatio / aspectRatio, 1);
        texture.offset.set((1 - texture.repeat.x) / 2, 0);
      } else {
        texture.repeat.set(1, aspectRatio / planeAspectRatio);
        texture.offset.set(0, (1 - texture.repeat.y) / 2);
      }
    }
  }, [
    texture.image,
    aspectRatio,
    texture.offset,
    texture.repeat,
    height,
    width,
  ]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale, scale, 0.1]}
      rotation={rotation}
    >
      <planeGeometry args={[...size]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
