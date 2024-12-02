'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Rnd } from "react-rnd";
import { HexColorPicker } from "react-colorful";
import html2canvas from "html2canvas";

import journal_book from "./assets/journal-book-new.png";
import icon1_1 from "./assets/1-1.png";
import icon16_9 from "./assets/16-9.png";
import icon9_16 from "./assets/9-16.png";
import { memorabiliaImages, randomTextList } from "./data";
import photoCard from "./assets/photo-card-blank.png";

const FontSizeSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  return (
    <div className="relative flex items-center w-[65%] px-2">
      <span className="text-xs font-bold mr-2">A</span>
      <div className="relative flex-1 h-8 flex items-center">
        <div className="absolute w-full h-[4px] bg-[#D4C2A8] border border-[#503D2E] rounded-full" />
        <input
          type="range"
          min="8"
          max="25"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full appearance-none bg-transparent custom-cursor-hover 
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 
          [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-[url('/slider.png')] 
          [&::-webkit-slider-thumb]:bg-contain [&::-webkit-slider-thumb]:bg-no-repeat 
          [&::-webkit-slider-thumb]:bg-center [&::-webkit-slider-thumb]:custom-cursor-hover 
          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-8 
          [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:bg-[url('/slider.png')] 
          [&::-moz-range-thumb]:bg-contain [&::-moz-range-thumb]:bg-no-repeat 
          [&::-moz-range-thumb]:bg-center [&::-moz-range-thumb]:custom-cursor-hover"
        />
      </div>
      {/* Large 'A' Label */}
      <span className="text-xl font-bold ml-2">A</span>
    </div>
  );
};

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
  const [fontSize, setFontSize] = useState(9);
  const [isExporting, setIsExporting] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const rndRef = useRef<Rnd>(null);

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
    if (!isExporting) {
      const randomIndex = Math.floor(Math.random() * randomTextList.length);
      setManualText(randomTextList[randomIndex]);
    }
  };

  const handleAspectRatioChange = (aspectRatio: "1:1" | "9:16" | "16:9") => {
    if (!isExporting) {
      if (aspectRatio === "1:1") {
        setPhotoCardStyle({ width: "19vw", height: "19vw" });
      } else if (aspectRatio === "9:16") {
        setPhotoCardStyle({ width: "10.69vw", height: "19vw" });
      } else if (aspectRatio === "16:9") {
        setPhotoCardStyle({ width: "19vw", height: "10.69vw" });
      }
      setTextPosition({ ...textPosition, x: 50, y: 50 });
    }
  };

  const handleExport = async () => {
    if (!exportRef.current) return;

    setIsExporting(true);
    const rndElement = exportRef.current.querySelector('.react-draggable') as HTMLElement | null;
    
    if (rndElement) {
      // Instead of modifying the DOM directly, create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.style.cssText = exportRef.current.style.cssText;
      tempContainer.className = exportRef.current.className;
      
      // Clone the content for export
      const cloneContent = exportRef.current.cloneNode(true) as HTMLElement;
      const cloneTextarea = cloneContent.querySelector('textarea');
      
      if (cloneTextarea) {
        // Replace textarea with div in the clone only
        const divElement = document.createElement('div');
        divElement.style.cssText = cloneTextarea.style.cssText;
        divElement.style.display = 'flex';
        divElement.style.alignItems = 'center';
        divElement.style.justifyContent = 'center';
        divElement.innerHTML = cloneTextarea.value.replace(/\n/g, '<br>');
        cloneTextarea.parentNode?.replaceChild(divElement, cloneTextarea);
      }
      
      // Add clone to temp container
      tempContainer.appendChild(cloneContent);
      document.body.appendChild(tempContainer);

      try {
        const canvas = await html2canvas(tempContainer, {
          useCORS: true,
          scale: 2,
          backgroundColor: null,
        });

        const aspectRatio = parseFloat(photoCardStyle.width) / parseFloat(photoCardStyle.height);
        const newCanvas = document.createElement('canvas');
        const ctx = newCanvas.getContext('2d');
      
        if (aspectRatio > 1) {
          newCanvas.width = canvas.width;
          newCanvas.height = canvas.width / aspectRatio;
        } else {
          newCanvas.height = canvas.height;
          newCanvas.width = canvas.height * aspectRatio;
        }

        const sx = (canvas.width - newCanvas.width) / 2;
        const sy = (canvas.height - newCanvas.height) / 2;
        ctx?.drawImage(canvas, sx, sy, newCanvas.width, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height);

        const link = document.createElement("a");
        link.download = "journal.png";
        link.href = newCanvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        console.error("Export failed:", error);
      } finally {
        // Clean up the temporary container
        document.body.removeChild(tempContainer);
        setIsExporting(false);
      }
    }
  };

  const handleFontSizeChange = (newSize: number) => {
    if (!isExporting) {
      setFontSize(newSize);
    }
  };

  return (
    <div className="relative flex items-center font-procopius text-[#503D2E] font-black tracking-wider">
      <Image src={journal_book} alt="journal book" className="w-[50vw]" />

      <div className="w-full h-full flex absolute pt-[4%]">
        <div className="w-1/2 pl-[5%] flex flex-col items-center">
          <div className="text-[2.5vw]">{`HIM's Journal`}</div>
          <div className="py-1 flex items-center">
            <div className="flex space-x-4 items-center">
              <div
                className="flex-shrink-0 hover:scale-110 custom-cursor-hover"
                onClick={() => handleAspectRatioChange("1:1")}
              >
                <Image src={icon1_1} alt="1:1" className="w-[2vw]"/>
              </div>
              <div
                className="flex-shrink-0 hover:scale-110 custom-cursor-hover"
                onClick={() => handleAspectRatioChange("9:16")}
              >
                <Image src={icon9_16} alt="9:16" className="w-[1.5vw]"/>
              </div>
              <div
                className="flex-shrink-0 hover:scale-110 custom-cursor-hover"
                onClick={() => handleAspectRatioChange("16:9")}
              >
                <Image src={icon16_9} alt="16:9" className="w-[2.5vw]"/>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-2 relative text-[1vw]">
              <span>Text <br /> Color</span>
              <div
                className="w-[2vw] h-[2vw] rounded-full custom-cursor-hover hover:scale-110 transition-transform"
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
            className="relative flex justify-center items-center overflow-hidden"
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
              ref={rndRef}
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
              dragHandleClassName="drag-handle"
              className="absolute"
            >
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                style={{
                  color: textColor,
                  fontSize: `${fontSize}px`,
                  lineHeight: "1.2",
                  fontWeight: "bold",
                  overflowWrap: "break-word",
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  resize: "none",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
                placeholder="Enter your text here..."
                className="drag-handle"
              />
            </Rnd>

          </div>

          <div className="flex items-center my-1 relative w-full justify-center">
            <FontSizeSlider value={fontSize} onChange={handleFontSizeChange} />
          </div>

          <div className="text-[1.3vw] flex gap-10">
            <button
              onClick={handleRandomize}
              className="hover:scale-110 custom-cursor-hover"
            >
              Randomize
            </button>
            <button
              onClick={handleExport}
              className="hover:scale-110 custom-cursor-hover"
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
                className="relative hover:scale-125 flex justify-center items-center custom-cursor-hover"
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

