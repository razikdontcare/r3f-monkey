"use client";
import { useState } from "react";
import Image from "next/image";

import textBoxLong from "./assets/text-box-long.png";

export default function BottomTextBox() {
  const [copied, setCopied] = useState(false);
  const [text] = useState("Coming Soon");

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full mx-auto flex items-end justify-center absolute top-0 left-0 h-full pointer-events-none">
      <div className="relative w-full max-w-2xl h-10 mb-10">
        <Image
          onClick={handleCopy}
          src={textBoxLong}
          alt="TEXT BOX"
          fill
          className="pointer-events-auto cursor-pointer object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {copied ? (
            <p className="text-white text-sm">Copied!</p>
          ) : (
            <p className="text-white text-sm">Contract : {text}</p>
          )}
        </div>
      </div>
    </div>
  );
}