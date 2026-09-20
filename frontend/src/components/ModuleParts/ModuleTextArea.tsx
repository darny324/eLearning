interface ModuleTextAreaProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function ModuleTextArea({
  title = "The Basics of C programming",
  description = `To create an education system that can generate a learning society capable of facing the challenges of the knowledge age. C programming language is a high level programming language, while giving you all the possible powers.`,
  className = "",
}: ModuleTextAreaProps) {
  return (
    <section className={`w-full ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-center py-2.5">
        <h2 className="text-center text-xl font-bold leading-normal text-white">
          {title}
        </h2>
      </div>

      {/* Description */}
      <div className="w-full p-2.5">
        <p className="text-xl font-normal leading-8 text-[#dbd8d8]">
          {description}
        </p>
      </div>
    </section>
  );
}