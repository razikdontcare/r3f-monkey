"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import * as faceapi from "face-api.js";
import Image from "next/image";
import textbox from "./overlay/assets/text-box-square.png";

export default function FaceSwap({ show }: { show: boolean }) {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultLoading, setResultLoading] = useState(false);
  const [isToast, setToast] = useState(false);
  const [showRegenerate, setShowRegenerate] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const totalMonkeyFaces = 11; // Total number of images in /public/monkeyFaces

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      } catch (error) {
        console.error("Error loading face-api.js models:", error);
      }
    };
    loadModels();
  }, []);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
          setShowRegenerate(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image) {
      replaceFaceOnImage();
    }
  }, [image]);

  const showToast = (): void => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const replaceFaceOnImage = async (): Promise<void> => {
    if (!image || !canvasRef.current) {
      showToast();
      return;
    }

    console.log('yaa')
    setResultLoading(true);

    try {
      const uploadedImage = await faceapi.fetchImage(image);
      const detections = await faceapi
        .detectAllFaces(uploadedImage, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detections.length === 0) {
        showToast();
        setResultLoading(false);
        return;
      }

      const canvas = canvasRef.current;
      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(uploadedImage, 0, 0);

      for (const detection of detections) {
        const { landmarks, detection: faceBox } = detection;
        if (faceBox && landmarks) {
          const { x, y, width, height } = faceBox.box;

          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          const angle = Math.atan2(
            rightEye[0].y - leftEye[0].y,
            rightEye[0].x - leftEye[0].x
          );
          const replacementWidth = width * 1.5;
          const replacementHeight = height * 1.8;

          const xOffset = (width - replacementWidth) / 2;
          const yOffset = (height - replacementHeight) / 1.3;
          const NativeImage = globalThis.Image;
          const replacementFace = new NativeImage();

          // Set random monkey face
          const randomFaceNumber = Math.floor(Math.random() * totalMonkeyFaces) + 1;
          replacementFace.src = `/monkeyFaces/${randomFaceNumber}.png`;

          // Handle image load
          await new Promise<void>((resolve) => {
            replacementFace.onload = () => {
              ctx.save();
              ctx.translate(
                x + xOffset + replacementWidth / 2,
                y + yOffset + replacementHeight / 2
              );
              ctx.rotate(angle);
              ctx.translate(
                -(x + xOffset + replacementWidth / 2),
                -(y + yOffset + replacementHeight / 2)
              );

              ctx.beginPath();
              ctx.rect(x + xOffset, y + yOffset, replacementWidth, replacementHeight);
              ctx.clip();
              ctx.drawImage(
                replacementFace,
                x + xOffset,
                y + yOffset,
                replacementWidth,
                replacementHeight
              );
              ctx.restore();
              resolve();
            };
            replacementFace.onerror = () => {
              console.error("Failed to load replacement face image");
              resolve();
            };
          });
        }
      }

      setResult(canvas.toDataURL());
    } catch (error) {
      console.error(error);
      showToast();
    } finally {
      setResultLoading(false);
    }
  };

  const downloadImageResult = (): void => {
    if (!result) return;

    const link = document.createElement("a");
    link.href = result;
    link.download = "face_replacement_result.png";
    link.click();
  };

  return (
    <div>


      <div className="flex items-center relative gap-16">
        <div className={`relative ${show ? "pointer-events-auto" : "pointer-events-none"}`}>
          <Image
            src={textbox}
            alt="TEXTBOX"
            className={`size-96`}
            fetchPriority="low"
          />
          <div className="absolute top-0 w-full h-full p-[.5%] flex flex-col items-center">
            {isToast && (
              <div className="absolute bg-red-500 text-white p-[.5vw] text-[.8vw] top-[1vw] rounded shadow-lg z-[9999]">
                Sorry, no face detected. Please try another image.
              </div>
            )}

            <label
              htmlFor="image"
              className="relative top-0 w-full h-full cursor-pointer flex items-center justify-center"
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="w-auto h-auto max-w-full max-h-full"
                />
              ) : (
                <span className="text-gray-500 text-[1vw]">
                  Click to upload an image
                </span>
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          {showRegenerate && (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={replaceFaceOnImage}
                className={`absolute bg-[#936857] text-white/80 w-[12vw] bottom-[-3vw] border-solid border-2 border-[#a97f65] p-[.3vw] rounded-md hover:scale-110 cursor-pointer  ${show ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                Regenerate
              </button>
            </div>
          )}
        </div>
        <div className={`relative ${show ? "pointer-events-auto" : "pointer-events-none"}`}>
          <Image
            src={textbox}
            alt="TEXTBOX"
            className={`size-96`}
            fetchPriority="low"
          />
          <div className="absolute top-0 w-full h-full p-[.5%] flex flex-col items-center">
            <div className="relative top-0 w-full h-full flex items-center justify-center">
              {resultLoading ? (
                <div className="loader"></div>
              ) : result ? (
                <img
                  src={result}
                  alt="Replacement Result"
                  className="w-auto h-auto max-w-full max-h-full"
                />
              ) : null}
            </div>
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {result && (
            <div className="w-full flex items-center justify-center">
              <button
                onClick={downloadImageResult}
                className={`absolute bg-[#936857] text-white/80 w-[12vw] bottom-[-3vw] border-solid border-2 border-[#a97f65] p-[.3vw] rounded-md hover:scale-110 cursor-pointer ${show ? "pointer-events-auto" : "pointer-events-none"}`}
              >
                Export
              </button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
          .loader {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
      `}</style>
    </div>
  );
}
