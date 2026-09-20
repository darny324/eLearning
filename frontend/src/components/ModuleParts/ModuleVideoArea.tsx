interface ModuleVideoAreaProps {
  videoUrl?: string;
  posterUrl?: string;
  className?: string;
}

export default function ModuleVideoArea({
  videoUrl = "",
  posterUrl,
  className = "",
}: ModuleVideoAreaProps) {
  return (
    <div
      className={`w-full overflow-hidden rounded-lg bg-black ${className}`}
    >
      <div className="relative aspect-video w-full">
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={posterUrl}
        >
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
          Your browser does not support the video element.
        </video>
      </div>
    </div>
  );
}