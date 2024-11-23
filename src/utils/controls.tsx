import { useControls } from "leva";

interface ObjectControlsProps {
  initialPosition?: [number, number, number];
  initialRotation?: [number, number, number];
}

export function useObjectControls(
  group: string,
  opt: ObjectControlsProps = {
    initialPosition: [0, 0, 0],
    initialRotation: [0, 0, 0],
  }
) {
  const position = opt.initialPosition || [0, 0, 0];
  const rotation = opt.initialRotation || [0, 0, 0];
  return useControls(group, {
    position,
    rotation,
  });
}
