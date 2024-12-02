import Image from "next/image";
import { useCursor } from "@/utils/CursorContext";

import dex from "./assets/socials/dex.png";
import insta from "./assets/socials/insta.png";
import xTwitter from "./assets/socials/x-twitter.png";
import telegram from "./assets/socials/telegram.png";
import tiktok from "./assets/socials/tiktok.png";

const socials = [
  { href: "https://dexscreener.com", src: dex, alt: "Dex" },
  { href: "https://instagram.com", src: insta, alt: "Instagram" },
  { href: "https://telegram.org", src: telegram, alt: "Telegram" },
  { href: "https://tiktok.com", src: tiktok, alt: "Tiktok" },
  { href: "https://x.com", src: xTwitter, alt: "Twitter" },
];

export default function Socials() {
  const { cursorStyle, setTemporaryCursorStyle } = useCursor();

  const handleClick = (href: string) => {
    setTemporaryCursorStyle("custom-cursor-grab");
    setTimeout(() => {
      window.open(href, "_blank", "noopener,noreferrer"); 
    }, 800); 
  };

  return (
    <div className="w-full mx-auto flex p-12 items-start justify-end absolute top-0 left-0 h-full pointer-events-none">
      <div className="flex h-10 gap-4">
        {socials.map(({ href, src, alt }) => (
          <div
            key={href}
            className={`${cursorStyle} w-10 h-10 pointer-events-auto`}
            onClick={() => handleClick(href)}
          >
            <Image
              src={src}
              alt={alt}
              className="object-contain w-full h-full"
              fetchPriority="low"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
