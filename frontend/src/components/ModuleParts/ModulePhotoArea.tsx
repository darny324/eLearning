interface ModulePhotoAreaProps {
  imageUrl?: string;
  alt?: string;
  className?: string;
}

const defaultImage =
  "https://www.figma.com/api/mcp/asset/081c5bfa-cff7-4e0e-ac27-4e0e04e25637.png";

export default function ModulePhotoArea({
  imageUrl = defaultImage,
  alt = "",
  className = "",
}: ModulePhotoAreaProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="relative w-full aspect-[632/313]">
        <img
          src={imageUrl}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}