import Image from "next/image";
import Link from "next/link";

import dex from "./assets/socials/dex.png";
import insta from "./assets/socials/insta.png";
import xTwitter from "./assets/socials/x-twitter.png";
import telegram from "./assets/socials/telegram.png";
import tiktok from "./assets/socials/tiktok.png";

export default function Socials() {
  return (
    <div className="w-full mx-auto flex p-12 items-start justify-end absolute top-0 left-0 h-full pointer-events-none">
      <div className="flex h-10 gap-4">
        <Link href={"https://dexscreener.com"} className="w-10 h-10">
          <Image
            src={dex}
            alt="Dex"
            className="object-contain w-full h-full pointer-events-auto"
            fetchPriority="low"
          />
        </Link>
        <Link href={"https://instagram.com"} className="w-10 h-10">
          <Image
            src={insta}
            alt="Instagram"
            className="object-contain w-full h-full pointer-events-auto"
            fetchPriority="low"
          />
        </Link>
        <Link href={"https://telegram.org"} className="w-10 h-10">
          <Image
            src={telegram}
            alt="Telegram"
            className="object-contain w-full h-full pointer-events-auto"
            fetchPriority="low"
          />
        </Link>
        <Link href={"https://tiktok.com"} className="w-10 h-10">
          <Image
            src={tiktok}
            alt="Tiktok"
            className="object-contain w-full h-full pointer-events-auto"
            fetchPriority="low"
          />
        </Link>
        <Link href={"https://x.com"} className="w-10 h-10">
          <Image
            src={xTwitter}
            alt="Twitter"
            className="object-contain w-full h-full pointer-events-auto"
            fetchPriority="low"
          />
        </Link>
      </div>
    </div>
  );
}
