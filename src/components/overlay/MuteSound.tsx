import Image from "next/image"
import SpeakerOn from "./assets/speaker-on.png"
import speakerOff from "./assets/speaker-off.png"
import { useMusic } from "@/utils/MusicContext";
import { useCursor } from "@/utils/CursorContext";

const MuteSound = () => {
  const { toggleMute, isMuted } = useMusic();
  const { cursorStyle, setTemporaryCursorStyle } = useCursor();

  const handleClick = () =>{
    toggleMute()
    setTemporaryCursorStyle("custom-cursor-grab")
  }

  return (
    <div className="absolute bottom-10 right-16">
      <button className={`${cursorStyle} w-10 h-10 pointer-events-auto`} onClick={handleClick}>
        {isMuted ?
          <Image src={speakerOff} className="w-10 h-10" height={40} width={40} alt="Mute Button" /> :
          <Image src={SpeakerOn} className="w-10 h-10" height={40} width={40} alt="Unmute Button" /> 
        }
      </button>
    </div>
  )
}

export default MuteSound