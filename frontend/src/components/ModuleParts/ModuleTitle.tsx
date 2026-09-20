interface ModuleTitleProps {
  title?: string;
  imageUrl?: string;
  className?: string;
}

const defaultBackgroundImage =
  "https://www.figma.com/api/mcp/asset/e3323b0b-5f08-41c9-b47d-6e3e5c28b5d9.png";

export default function ModuleTitle({
  title = "Getting Started",
  imageUrl = defaultBackgroundImage,
  className = "",
}: ModuleTitleProps) {
  return (
    <div
      className={`relative flex w-full h-44 items-center justify-center overflow-hidden p-2.5 ${className}`}
    >
      <img
        src={imageUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative flex items-center justify-center p-2.5">
        <h1 className="text-center text-xl font-bold leading-normal text-black">
          {title}
        </h1>
      </div>
    </div>
  );
}