import Image from "next/image"
import SpeakerOn from "./assets/speaker-on.png"
import speakerOff from "./assets/speaker-off.png"
import { useMusic } from "@/utils/MusicContext";

const MuteSound = () => {
  const { toggleMute, isMuted } = useMusic();

  return (
    <div className="absolute bottom-10 right-16">
      <button className="w-10 h-10 pointer-events-auto" onClick={toggleMute}>
        {isMuted ?
          <Image src={SpeakerOn} className="w-10 h-10" height={40} width={40} alt="Unmute Button" /> :
          <Image src={speakerOff} className="w-10 h-10" height={40} width={40} alt="Mute Button" />
        }
      </button>
    </div>
  )
}

export default MuteSound