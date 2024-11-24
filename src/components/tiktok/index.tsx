'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Video {
  id: number
  url: string
  username: string
  description: string
  likes: string
  comments: string
  shares: string
  avatar: string
}

export default function VideoFeed() {
  const videos: Video[] = [
    {
      id: 1,
      url: "https://example.com/video1.mp4",
      username: "@JaneFisher",
      description: "Locked in a house together ... #TikTok #fyp #quarantine",
      likes: "1.3M",
      comments: "10.7M",
      shares: "30.9K",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    // ... add more videos here to reach a total of 10
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isForYou, setIsForYou] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const blurredVideoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const shuffledVideos = [...videos].sort(() => Math.random() - 0.5)
    videos.splice(0, videos.length, ...shuffledVideos)
  }, [])

  const handleSwipe = (direction: number) => {
    if (direction > 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    } else if (direction < 0 && currentIndex < videos.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const togglePlayPause = useCallback(() => {
    const video = videoRefs.current[currentIndex]
    const blurredVideo = blurredVideoRefs.current[currentIndex]
    
    if (video && blurredVideo) {
      if (isPaused) {
        video.play()
        blurredVideo.play()
      } else {
        video.pause()
        blurredVideo.pause()
      }
      setIsPaused(!isPaused)
    }
  }, [currentIndex, isPaused])

  const setVideoRef = useCallback((el: HTMLVideoElement | null, index: number, isBlurred: boolean) => {
    if (isBlurred) {
      blurredVideoRefs.current[index] = el
    } else {
      videoRefs.current[index] = el
    }
  }, [])

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden">
      {/* Top Navigation */}
      <div className="absolute top-0 z-50 w-full px-4 pt-12 pb-2 flex justify-center items-center gap-4 bg-gradient-to-b from-black/50 to-transparent">
        <button 
          className={`font-semibold ${!isForYou ? 'text-white' : 'text-gray-400'}`}
          onClick={() => setIsForYou(false)}
        >
          Following
        </button>
        <span className="text-gray-400">|</span>
        <button 
          className={`font-semibold ${isForYou ? 'text-white' : 'text-gray-400'}`}
          onClick={() => setIsForYou(true)}
        >
          For You
        </button>
      </div>

      {/* Video Feed */}
      <motion.div 
        className="h-full w-full"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(e, info) => handleSwipe(info.offset.y)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full relative"
            onClick={togglePlayPause}
          >
            {/* Blurred background video */}
            <video
              ref={(el) => setVideoRef(el, currentIndex, true)}
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl brightness-50"
              src={videos[currentIndex].url}
              loop
              autoPlay
              muted
              playsInline
            />
            
            {/* Main video */}
            <video
              ref={(el) => setVideoRef(el, currentIndex, false)}
              className="absolute inset-0 w-full h-full object-contain"
              src={videos[currentIndex].url}
              loop
              autoPlay
              muted
              playsInline
            />

            {/* Pause indicator */}
            {isPaused && (
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/path-to-your-pause-icon.png" 
                  alt="Pause" 
                  className="w-20 h-20 opacity-80"
                />
              </div>
            )}

            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <div className="mb-4">
                <h2 className="font-semibold">{videos[currentIndex].username}</h2>
                <p className="text-sm">{videos[currentIndex].description}</p>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <button className="p-2">
                  <img 
                    src="./assets/icon/like.png" 
                    alt="Like" 
                    className="w-8 h-8"
                  />
                </button>
                <span className="text-xs">{videos[currentIndex].likes}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="p-2">
                  <img 
                    src="./assets/icon/comment.png" 
                    alt="Comment" 
                    className="w-8 h-8"
                  />
                </button>
                <span className="text-xs">{videos[currentIndex].comments}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="p-2">
                  <img 
                    src="./assets/icon/share.png"
                    alt="Share" 
                    className="w-8 h-8"
                  />
                </button>
                <span className="text-xs">{videos[currentIndex].shares}</span>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <img 
                  src={videos[currentIndex].avatar} 
                  alt="User avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

