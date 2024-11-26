"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import journal_book from "./assets/journal-book.png";
import photoCard from "./assets/photo-card-blank.png";
import icon1_1 from "./assets/1_1.png";
import icon16_9 from "./assets/16_9.png";
import icon9_16 from "./assets/9_16.png";
import { HexColorPicker } from "react-colorful";
import { memorabiliaImages } from "./data/memorabiliaImages";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";

export default function JournalBook() {
  const [textColor, setTextColor] = useState("#FF0000");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [randomText, setRandomText] = useState("");
  const [photoCardStyle, setPhotoCardStyle] = useState({
    width: "90%",
    height: "90%",
  });
  const [textPosition, setTextPosition] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 50,
  });
  const [isExporting, setIsExporting] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const textList = [
    "It is not the strongest who survive, but those who adapt—just as HIM once did to shape us all.",
    "Do not go where the path may lead; instead, go where HIM forged a new trail.",
    "The journey of a thousand miles began when HIM first set his foot on this Earth.",
    "HIM taught us that success is not final, failure is not fatal—it is the courage to continue that counts.",
    "When you look into history’s mirror, remember: it’s HIM staring back, daring you to carry the torch.",
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
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
    const randomIndex = Math.floor(Math.random() * textList.length);
    setRandomText(textList[randomIndex]);
  };

  const handleAspectRatioChange = (aspectRatio: "1:1" | "9:16" | "16:9") => {
    if (aspectRatio === "1:1") {
      setPhotoCardStyle({ width: "80%", height: "auto" });
    } else if (aspectRatio === "9:16") {
      setPhotoCardStyle({ width: "22.75%", height: "50%" });
    } else if (aspectRatio === "16:9") {
      setPhotoCardStyle({ width: "80%", height: "45%" });
    }
  };

  const handleExport = async () => {
    if (!imageContainerRef.current) return;

    // Temporarily disable striped border for export
    setIsExporting(true);

    const canvas = await html2canvas(imageContainerRef.current, {
      useCORS: true, // Enable cross-origin support for images
    });

    const link = document.createElement("a");
    link.download = "journal.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    // Re-enable striped border after export
    setIsExporting(false);
  };

  return (
    <div className="relative flex items-center font-procopius text-[#503D2E] font-black tracking-wider">
      <Image src={journal_book} alt="journal book" className="w-[50w]" />

      <div className="w-full h-full flex absolute pt-[4%]">
        <div className="w-1/2 pl-[8%] flex flex-col items-center">
          <div className="text-[2.5vw]">{`HIM's Journal`}</div>
          <div className="py-5 flex items-center">
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
                <div
                  ref={colorPickerRef}
                  className="absolute top-full left-0 mt-2 z-10 bg-white p-2 rounded-md shadow-lg"
                >
                  <HexColorPicker color={textColor} onChange={setTextColor} />
                </div>
              )}
            </div>
          </div>
          <div
            ref={imageContainerRef}
            className="relative flex justify-center items-center"
            style={photoCardStyle}
          >
            <Image
              src={photoCard}
              alt="Photo Card Big"
              className="w-full h-full object-cover"
            />

            {selectedImage && (
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={`/memorabiliaImages/${selectedImage}`}
                  alt={selectedImage.split(".")[0]}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {randomText && (
              <Rnd
                size={{ width: textPosition.width, height: textPosition.height }}
                position={{ x: textPosition.x, y: textPosition.y }}
                onDragStop={(e, d) => {
                  if (imageContainerRef.current) {
                    const containerWidth = imageContainerRef.current.offsetWidth;
                    const containerHeight = imageContainerRef.current.offsetHeight;
              
                    setTextPosition({
                      ...textPosition,
                      x: Math.max(0, Math.min(d.x, containerWidth - textPosition.width)),
                      y: Math.max(0, Math.min(d.y, containerHeight - textPosition.height)),
                    });
                  }
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setTextPosition({
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                    x: position.x,
                    y: position.y,
                  });
                }}
                bounds="parent"
              >
                <div
                  className={`text-box ${isExporting ? "" : "striped-border"}`}
                  style={{
                    color: textColor,
                    fontSize: ".8em",
                    fontWeight: "bold",
                    textAlign: "center",
                    wordBreak: "break-word",
                  }}
                >
                  {randomText}
                </div>
              </Rnd>
            
            )}
          </div>

          <div className="text-[1.5vw] flex gap-10 mt-5">
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
          <div className="text-[2.5vw] mb-4">Memorabilia</div>
          <div className="grid grid-cols-4 gap-3 pl-[10%] pr-[10%] h-[90%] overflow-y-auto no-scrollbar">
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
                  <div className="w-20 h-20">
                    <img
                      src={`/memorabiliaImages/${mem.image}`}
                      alt={mem.image.split(".")[0]}
                      className="w-full h-full object-cover"
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
