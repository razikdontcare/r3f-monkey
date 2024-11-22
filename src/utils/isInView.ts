import { Camera, Object3D, Matrix4, Frustum, Mesh } from "three";

const frustum = new Frustum();
const cameraViewProjectionMatrix = new Matrix4();

export default function isInView(camera: Camera, object: Object3D): boolean {
  camera.updateMatrixWorld(); // make sure the camera matrix is updated
  camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
  cameraViewProjectionMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

  let isVisible = false;

  object.traverse((child) => {
    if (child instanceof Mesh) {
      if (!child.geometry.boundingSphere) {
        child.geometry.computeBoundingSphere();
      }

      if (child.geometry.boundingSphere) {
        if (frustum.intersectsObject(child)) {
          isVisible = true;
        }
      }
    }
  });

  console.log("Object visibility:", isVisible);
  return isVisible;
}
