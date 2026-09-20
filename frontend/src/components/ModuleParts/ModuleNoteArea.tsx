interface ModuleNoteAreaProps {
  title?: string;
  note?: string;
  className?: string;
}

export default function ModuleNoteArea({
  title = "Why C programming is Important",
  note = "This is the area for note. When you have something knowledgeable but are not specifically required for the course you can use this component. This is somewhat handy. To create an education system that can generate a learning society capable of facing the challenges of the knowledge age",
  className = "",
}: ModuleNoteAreaProps) {
  return (
    <aside
      className={`w-full rounded-lg border-y-[12px] border-[#007acc] bg-[#ebf5fb] px-4 ${className}`}
    >
      {/* Note title */}
      <div className="flex items-center justify-center p-2.5">
        <h2 className="text-center text-xl font-bold leading-8 text-black">
          {title}
        </h2>
      </div>

      {/* Note content */}
      <div className="flex w-full items-center justify-center py-2.5">
        <p className="flex-1 text-xl font-medium leading-8 text-black">
          {note}
        </p>
      </div>
    </aside>
  );
}