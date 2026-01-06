import React, { useRef } from "react";

import { Play, Sparkles, X } from "lucide-react";

const VideoDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}> = ({ isOpen, onClose, videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log("VideoDialog rendered, isOpen:", isOpen); // Debug log

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="relative bg-[#0D1C2E] rounded-3xl overflow-hidden border border-white/20 shadow-2xl max-w-4xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-linear-to-r from-[#0D1C2E] to-[#122A44]">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Play className="h-5 w-5 text-[#FF6B00]" />
            Our Story
          </h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 group"
          >
            <X className="h-6 w-6 text-white group-hover:text-[#FF6B00] transition-colors" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            controls
            autoPlay
            className="w-full h-full"
            poster="/api/placeholder/800/450"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Footer */}
        <div className="p-6 bg-linear-to-r from-[#122A44] to-[#0D1C2E] border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-white/80">
              <p className="font-semibold">Digital Africa Transformation</p>
              <p className="text-sm">Building the future of technology</p>
            </div>
            <div className="flex items-center gap-2 text-[#FF6B00]">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Innovation Story</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDialog;
