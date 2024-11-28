import { Dispatch, SetStateAction, useEffect } from "react";

export default function PreloadTextures({ onReady }: { onReady: Dispatch<SetStateAction<boolean>> }) {
  // Preload the required textures for background and character
  const textures = [
    '/preloader/preloader-images/first-Sequence/adams-creation/background.png',
    '/preloader/preloader-images/first-Sequence/adams-creation/character.png',
    '/preloader/preloader-images/first-Sequence/austrian-painter/background.png',
    '/preloader/preloader-images/first-Sequence/austrian-painter/character.png',
    '/preloader/preloader-images/first-Sequence/battle-of-hu-lao-gate-2/background.png',
    '/preloader/preloader-images/first-Sequence/battle-of-hu-lao-gate-2/character.png',
    '/preloader/preloader-images/first-Sequence/boxing/background.png',
    '/preloader/preloader-images/first-Sequence/boxing/character.png',
    '/preloader/preloader-images/first-Sequence/moses/background.png',
    '/preloader/preloader-images/first-Sequence/moses/character.png',
    '/preloader/preloader-images/second-Sequence/three-kingdom/background.png',
    '/preloader/preloader-images/second-Sequence/three-kingdom/character.png',
    '/preloader/preloader-images/second-Sequence/abraham/background.jpeg',
    '/preloader/preloader-images/second-Sequence/abraham/character.png',
    '/preloader/preloader-images/second-Sequence/adam-eve/background.png',
    '/preloader/preloader-images/second-Sequence/adam-eve/character.png',
    '/preloader/preloader-images/second-Sequence/leonardo/background.jpg',
    '/preloader/preloader-images/second-Sequence/leonardo/character.png',
    '/preloader/preloader-images/second-Sequence/mlk/background.png',
    '/preloader/preloader-images/second-Sequence/mlk/character.png'
  ];

  useEffect(() => {
    const loadTextures = async () => {
      try {
        // Preload all textures
        await Promise.all(
          textures.map(
            (texturePath) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = texturePath;
                img.onload = resolve;
                img.onerror = reject;
              })
          )
        );
        onReady(true); // Notify parent when textures are ready
      } catch (error) {
        console.error('Error preloading textures:', error);
        onReady(false);
      }
    };

    loadTextures();
  }, [onReady, textures]);

  return null;
}