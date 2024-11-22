import { useControls } from "leva";

interface ObjectControlsProps {
  initialPosition?: [number, number, number];
  initialScale?: [number, number];
}

export function useObjectControls(
  group: string,
  opt: ObjectControlsProps = {
    initialPosition: [0, 0, 0],
    initialScale: [1, 1],
  }
) {
  const position = opt.initialPosition || [0, 0, 0];
  const scale = opt.initialScale
    ? { x: opt.initialScale[0], y: opt.initialScale[1], z: 0.1 }
    : { x: 1, y: 1, z: 0.1 };
  return useControls(group, {
    position,
    scale,
  });
}
