"use client";
import {useRef, useState, useEffect, useCallback} from "react";

export default function BrandFilmSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Autoplay when in view, pause when not
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch((err) => {
            console.warn("Autoplay failed:", err);
            setPlaying(false);
          });
          setPlaying(true);
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      {threshold: 0.3}, // lowered so it triggers more easily
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Toggle play/pause manually (called by outer div)
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => console.warn("Play failed:", err));
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <section className="relative max-w-[1440px] mx-auto py-20 px-8">
      <div
        className="relative aspect-video bg-graphite rounded-lg overflow-hidden group cursor-pointer"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src="/1782779009140.publer.com.mp4"
          poster="https://res.cloudinary.com/dnadawobi/image/upload/v1782255389/devon-janse-van-rensburg-yoqHLUayUTg-unsplash_fdq60a.jpg"
          muted={muted}
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Cinematic vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-black/20" />

        {/* Central play/pause button */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            !playing || showControls
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-void/60 backdrop-blur-md flex items-center justify-center text-chrome hover:bg-void/80 transition-all duration-300 shadow-2xl"
            aria-label={playing ? "Pause brand film" : "Play brand film"}
          >
            {playing ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 md:w-10 md:h-10"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 md:w-10 md:h-10 ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Bottom control bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {/* Indeterminate progress bar */}
          <div className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden mr-4">
            <div
              className={`h-full bg-gold ${
                playing ? "animate-progress-indeterminate" : ""
              }`}
            />
          </div>

          {/* Mute toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMuted(!muted);
            }}
            className="w-10 h-10 rounded-full bg-void/60 backdrop-blur flex items-center justify-center text-chrome hover:bg-void/80 transition-colors"
            aria-label={muted ? "Unmute brand film" : "Mute brand film"}
          >
            {muted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <p className="text-center text-platinum/60 text-xs tracking-widest uppercase mt-6">
        The Art of Velocity
      </p>

      <style jsx>{`
        @keyframes progress-indeterminate {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
