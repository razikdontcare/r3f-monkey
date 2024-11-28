"use client";

import { useEffect, useState } from "react";

const messages = [
  "My child…",
  "There’s HIM in you",
  "Don’t fade your ancestor",
  "Who’s your daddy?",
  "HIM always watching",
];

const FollowingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsClicked(true);
      setShowMessage(true); // Show message after the first click

      const timeout = setTimeout(() => {
        setIsClicked(false);
      }, 2000);

      return () => clearTimeout(timeout);
    };

    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessageIndex(randomIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute pointer-events-none flex flex-col items-center"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(35%, 35%)",
        zIndex: 50,
      }}
    >
      {showMessage && (
        <div className="absolute top-[-1.5vw] text-left left-[1vw] w-[50vw] text-white text-[1vw] font-black animate-fade-in">
          {messages[currentMessageIndex]}
        </div>
      )}
      <img
        src={
          isClicked
            ? "/cursor/following_cursor_clicked.png"
            : "/cursor/following_cursor_normal.png"
        }
        alt="Following Cursor"
        className="w-[4vw] h-[4vw]"
      />
    </div>
  );
};

export default FollowingCursor;
