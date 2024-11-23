"use client";
import { useRef, useEffect, useState } from "react";
import { useVideoTexture } from "@react-three/drei";
import { Mesh } from "three";

const basePath = "/sprites/nyc/";
const videoPath = basePath + "video/";

interface VideoScreenProps {
  src: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  scale?: number;
  part?: "center" | "left" | "right" | "top" | "bottom";
}

export default function VideoScreen({
  src,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = [1, 1],
  scale = 1,
  part = "center",
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
        switch (part) {
          case "left":
            texture.offset.set(0, 0);
            break;
          case "right":
            texture.offset.set(1 - texture.repeat.x, 0);
            break;
          case "top":
            texture.offset.set((1 - texture.repeat.x) / 2, 0);
            break;
          case "bottom":
            texture.offset.set(
              (1 - texture.repeat.x) / 2,
              1 - texture.repeat.y
            );
            break;
          default:
            texture.offset.set((1 - texture.repeat.x) / 2, 0);
            break;
        }
      } else {
        texture.repeat.set(1, aspectRatio / planeAspectRatio);
        switch (part) {
          case "top":
            texture.offset.set(0, 0);
            break;
          case "bottom":
            texture.offset.set(0, 1 - texture.repeat.y);
            break;
          case "left":
            texture.offset.set(0, (1 - texture.repeat.y) / 2);
            break;
          case "right":
            texture.offset.set(
              1 - texture.repeat.x,
              (1 - texture.repeat.y) / 2
            );
            break;
          default:
            texture.offset.set(0, (1 - texture.repeat.y) / 2);
            break;
        }
      }
    }
  }, [
    texture.image,
    aspectRatio,
    part,
    height,
    width,
    texture.offset,
    texture.repeat,
  ]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={[scale, scale, 0.1]}
      rotation={rotation}
    >
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}
