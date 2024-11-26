'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Rnd } from "react-rnd";
import { HexColorPicker } from "react-colorful";
import html2canvas from "html2canvas";

import journal_book from "./assets/journal-book.png";
import photoCard from "./assets/photo-card-blank.png";
import icon1_1 from "./assets/1-1.png";
import icon16_9 from "./assets/16-9.png";
import icon9_16 from "./assets/9-16.png";
import { memorabiliaImages, randomTextList } from "./data";

export default function JournalBook() {
  const [textColor, setTextColor] = useState("#FF0000");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [manualText, setManualText] = useState("");
  const [photoCardStyle, setPhotoCardStyle] = useState({
    width: "19vw",
    height: "19vw",
  });
  const [textPosition, setTextPosition] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 100,
  });
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const colorPicker = document.querySelector(".color-picker");
      if (colorPicker && !colorPicker.contains(event.target as Node)) {
        setIsColorPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMemoRabiliImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * randomTextList.length);
    setManualText(randomTextList[randomIndex]);
  };

  const handleAspectRatioChange = (aspectRatio: "1:1" | "9:16" | "16:9") => {
    if (aspectRatio === "1:1") {
      setPhotoCardStyle({ width: "19vw", height: "19vw" });
    } else if (aspectRatio === "9:16") {
      setPhotoCardStyle({ width: "10.69vw", height: "19vw" });
    } else if (aspectRatio === "16:9") {
      setPhotoCardStyle({ width: "19vw", height: "10.69vw" });
    }
    setTextPosition({ ...textPosition, x: 50, y: 50 });
  };

  const handleExport = async () => {
    if (!exportRef.current) return;

    try {
      const canvas = await html2canvas(exportRef.current, {
        useCORS: true,
        scale: 2, // High-resolution export
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = "journal.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="relative flex items-center font-procopius text-[#503D2E] font-black tracking-wider">
      <Image src={journal_book} alt="journal book" className="w-[50vw]" />

      <div className="w-full h-full flex absolute pt-[4%]">
        <div className="w-1/2 pl-[5%] flex flex-col items-center">
          <div className="text-[2.5vw]">HIM's Journal</div>
          <div className="py-1 flex items-center">
            <div className="flex space-x-4 items-center">
              <div
                className="flex-shrink-0 hover:scale-110 cursor-pointer"
                onClick={() => handleAspectRatioChange("1:1")}
              >
                <Image src={icon1_1} alt="1:1" />
              </div>
              <div
                className="flex-shrink-0 hover:scale-110 cursor-pointer"
                onClick={() => handleAspectRatioChange("9:16")}
              >
                <Image src={icon9_16} alt="9:16" />
              </div>
              <div
                className="flex-shrink-0 hover:scale-110 cursor-pointer"
                onClick={() => handleAspectRatioChange("16:9")}
              >
                <Image src={icon16_9} alt="16:9" />
              </div>
            </div>
            <div className="ml-4 flex items-center gap-2 relative">
              <span>Text <br /> Color</span>
              <div
                className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: textColor }}
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              />
              {isColorPickerOpen && (
                <div className="color-picker absolute top-full left-0 mt-2 z-10 bg-white p-2 rounded-md shadow-lg">
                  <HexColorPicker color={textColor} onChange={setTextColor} />
                </div>
              )}
            </div>
          </div>
          <div
            ref={exportRef}
            className="relative flex justify-center items-center overflow-hidden bg-gray-50 border border-gray-200"
            style={photoCardStyle}
          >
            {selectedImage ? (
              <img
                src={`/memorabiliaImages/${selectedImage}`}
                alt="Selected Memorabilia"
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={photoCard}
                alt="Photo Card Big"
                className="w-full h-full object-cover"
              />
            )}

            <Rnd
              bounds="parent"
              size={{ width: textPosition.width, height: textPosition.height }}
              position={{ x: textPosition.x, y: textPosition.y }}
              onDragStop={(e, d) =>
                setTextPosition((prev) => ({ ...prev, x: d.x, y: d.y }))
              }
              onResizeStop={(e, direction, ref, delta, position) => {
                setTextPosition({
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                  x: position.x,
                  y: position.y,
                });
              }}
              enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
              }}
              className="absolute"
            >
              {
                manualText && (
                  <div
                    style={{
                      color: textColor,
                      fontSize: "1vw",
                      lineHeight: "1.2",
                      fontWeight: "bold",
                      overflowWrap: "break-word",
                      textAlign: "center",
                    }}
                    className="w-full h-full flex justify-center items-center"
                  >
                    {manualText}
                  </div>

                )
              }
            </Rnd>
          </div>

          <div className="text-[1.5vw] flex gap-10 mt-1">
            <button
              onClick={handleRandomize}
              className="hover:scale-110 cursor-pointer"
            >
              Randomize
            </button>
            <button
              onClick={handleExport}
              className="hover:scale-110 cursor-pointer"
            >
              Export
            </button>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <div className="text-[2.5vw] mb-2">Memorabilia</div>
          <div className="grid grid-cols-4 gap-2 pl-[10%] pr-[10%] h-[74%] overflow-y-auto no-scrollbar">
            {memorabiliaImages.map((mem, index) => (
              <div
                key={index}
                onClick={() => {
                  handleMemoRabiliImageClick(mem.image);
                }}
                style={{ transform: `rotate(${mem.degree}deg)` }}
                className="relative hover:scale-125 flex justify-center items-center cursor-pointer"
              >
                <Image
                  src={photoCard}
                  alt={`photo card ${index}`}
                  className="w-full"
                />

                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="w-[90%] h-[90%]">
                    <img
                      src={`/memorabiliaImages/${mem.image}`}
                      alt={mem.image.split(".")[0]}
                      className="w-[96%] h-[96%] object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
