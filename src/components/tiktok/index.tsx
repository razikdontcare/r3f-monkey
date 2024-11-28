'use client';

import React, { useState, useRef, useEffect, useCallback, MutableRefObject } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimation } from "framer-motion";
import Image from 'next/image';

import playIcon from './assets/icon/play.png';
import verifiedIcon from './assets/icon/verified_round.png';
import likeIcon from './assets/icon/like.png';
import likedIcon from './assets/icon/liked.png';
import commentIcon from './assets/icon/comment.png';
import shareIcon from './assets/icon/share.png';
import avatarIcon from './assets/avatar.png';
import { videosData } from './data/videos'
import { useMusic } from "@/utils/MusicContext";

interface Video {
  id: number;
  src: string;
  username: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
  bLiked: boolean;
}

export default function Tiktok() {
  const initialVideos: Video[] = videosData;
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isForYou, setIsForYou] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const controls = useAnimation();
  const y = useMotionValue(0);
  const { playMusic,pauseMusic } = useMusic();


  const handleDragEnd = async (e: MouseEvent | TouchEvent | PointerEvent, info: { offset: { y: number } }) => {
    handleSwipe(info.offset.y);
    setIsPaused(false);
    await controls.start({ y: 0 });
  };

  useEffect(() => {
    const shuffledVideos = [...initialVideos].sort(() => Math.random() - 0.5);
    setVideos(shuffledVideos);
  }, []);

  useEffect(() => {
    const currentVideoElement = videoRefs.current[currentIndex];
    if (currentVideoElement) {
      videoRefs.current.forEach((video, index) => {
        if (index !== currentIndex && video) video.pause();
      });

      currentVideoElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      currentVideoElement.muted = false;
      currentVideoElement.play();
    }
  }, [currentIndex]);

  useEffect(() => {
    const backgroundVideo = backgroundVideoRef.current;
    const currentVideo = videoRefs.current[currentIndex];
    if (backgroundVideo) {
      if (isPaused) {
        backgroundVideo.pause();
        currentVideo?.pause();
      } else {
        backgroundVideo.play();
        currentVideo?.play();
      }
    }
  }, [isPaused, currentIndex]);

  useEffect(() => {
    if (isPaused) {
      playMusic();
    } else {
      pauseMusic();
    }
  }, [isPaused]);

  const handleSwipe = (offsetY: number) => {
    if (offsetY > 50) {
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    } else if (offsetY < -50) {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }
  };

  const togglePlayPause = useCallback(() => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      if (isPaused) {
        video.play();
      } else {
        video.pause();
      }
      setIsPaused(!isPaused);
    }
  }, [currentIndex, isPaused]);

  const toggleLike = (index: number) => {
    setVideos((prevVideos) =>
      prevVideos.map((video, i) =>
        i === index
          ? { ...video, bLiked: !video.bLiked }
          : video
      )
    );
  };

  const setVideoRef = useCallback((el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el;
  }, []);

  const handleVideoLoaded = (index: number) => {
    setLoadedVideos((prev) => ({ ...prev, [index]: true }));
    setIsLoading(false);
  };

  const handleVideoLoading = (index: number) => {
    if (loadedVideos[index]) {
      return;
    }
    setIsLoading(true);
  };

  return (
    <div className="h-full w-full bg-black text-white overflow-hidden relative rounded-3xl">
      {/* Blurry Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={backgroundVideoRef}
          src={videos[currentIndex]?.src}
          className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110"
          style={{ pointerEvents: 'none' }} // Prevent interaction
          loop
          autoPlay
          muted
        />
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 z-50 w-full px-4 pt-6 pb-2 flex justify-center items-center gap-4 bg-gradient-to-b from-black/50 to-transparent">
        <button
          className={`font-semibold ${!isForYou ? 'text-white' : 'text-gray-400'}`}
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
        className="h-full w-full relative z-10 flex justify-center items-center"
        drag="y"
        style={{ y }}
        dragConstraints={{ top: -100, bottom: 100 }}
        onDragEnd={handleDragEnd}
        animate={controls}
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
            {/* Main Video */}
            <video
              ref={(el) => setVideoRef(el, currentIndex)}
              className="absolute inset-0 w-full h-full object-contain z-10"
              src={videos[currentIndex]?.src}
              loop
              autoPlay
              onLoadedData={() => handleVideoLoaded(currentIndex)}
              onWaiting={() => handleVideoLoading(currentIndex)}
            />

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/70">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Pause Indicator */}
            {isPaused && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Image src={playIcon} alt="Pause" width={60} height={60} className="opacity-80" fetchPriority="low" />
              </div>
            )}

            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent z-20">
              <div className="mb-4">
                <div className='flex items-center'>
                  <h2 className="font-semibold mr-[2px]">{videos[currentIndex]?.username}</h2>
                  <Image src={verifiedIcon} alt="Pause" width={18} height={18} fetchPriority="low" />
                </div>
                <p className="text-sm">{videos[currentIndex]?.caption}</p>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6 z-20">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <Image src={avatarIcon} alt="User avatar" width={40} height={40} className="object-cover" fetchPriority="low" />
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(currentIndex);
                  }}
                >
                  <Image
                    src={videos[currentIndex]?.bLiked ? likedIcon : likeIcon}
                    alt="Like"
                    width={32}
                    height={32}
                    fetchPriority="low"
                  />
                </button>
                <span className="text-xs">{videos[currentIndex]?.likes}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="p-2" onClick={(e) => e.stopPropagation()}>
                  <Image src={commentIcon} alt="Comment" width={32} height={32} fetchPriority="low" />
                </button>
                <span className="text-xs">{videos[currentIndex]?.comments}</span>
              </div>
              <div className="flex flex-col items-center">
                <button className="p-2" onClick={(e) => e.stopPropagation()}>
                  <Image src={shareIcon} alt="Share" width={32} height={32} fetchPriority="low" />
                </button>
                <span className="text-xs">{videos[currentIndex]?.shares}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}