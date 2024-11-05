"use client";
import React from "react";

export default function ChinaSection() {
  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.location.href = "/ww2";
  };

  return (
    <>
      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="flex flex-col items-center justify-center text-center gap-10">
          {/* <h1 className="text-6xl font-bold text-white cursor-default pointer-events-auto">
            bismillah gak ngebug
          </h1> */}
          <div className="flex items-center justify-center gap-5 text-white pointer-events-auto">
            <button onClick={handleNext} className="bg-rose-800 rounded p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
