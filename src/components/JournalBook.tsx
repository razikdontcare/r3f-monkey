"use client";

import React from "react";
import Image from "next/image";
import journalBook from "./overlay/assets/journal/journal-book.png";
import photoCard from "./overlay/assets/journal/photo-card-blank.png";
import icon1_1 from "./overlay/assets/journal/1_1.png"
import icon16_9 from "./overlay/assets/journal/16_9.png"
import icon9_16 from "./overlay/assets/journal/9_16.png"

export default function JournalBook() {

  return (
    <div className="relative flex items-center font-procopius text-[#503D2E] font-black tracking-wider">
      <Image
          src={journalBook}
          alt="journal book"
          className="w-[50w]"
      />

      <div className="w-full h-full flex absolute pt-[5%]">
        <div className="w-1/2 pl-[8%] flex flex-col items-center">
            <div className=" text-[2.5vw]">HIM's Journal</div>
            <div className="py-5 flex items-center">
              <div className="flex space-x-4 items-center">
                <div className="flex-shrink-0">
                  <Image src={icon1_1} alt="1:1" className="hover:scale-110 cursor-pointer" />
                </div>
                <div className="flex-shrink-0">
                  <Image src={icon9_16} alt="9:16" className="hover:scale-110 cursor-pointer" />
                </div>
                <div className="flex-shrink-0">
                  <Image src={icon16_9} alt="16:9" className="hover:scale-110 cursor-pointer" />
                </div>
              </div>
              <div className="ml-4">
                Text Color O
              </div>
            </div>
            <Image 
              src={photoCard}
              alt="Photo Card Big"
              className="w-[20vw] h-[20vw]"
            />

            <div className="text-[1.5vw] flex gap-10 mt-5">
              <button className="hover:scale-110 cursor-pointer">Randomize</button>
              <button className="hover:scale-110 cursor-pointer">Export</button>
            </div>
        </div>
        <div className="w-1/2  flex flex-col items-center">
          <div className="text-[2.5vw]">Memorabilia</div>
        
        </div>
      </div>
    </div>
  );
}
