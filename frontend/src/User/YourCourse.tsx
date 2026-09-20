import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

type ModuleStatus = "completed" | "in-progress";

interface ModuleCardProps {
  title: string;
  completion: number;
  status: ModuleStatus;
}

function ModuleCard({
  title,
  completion,
  status,
}: ModuleCardProps) {
  const isCompleted = status === "completed";

  const statusColor = isCompleted
    ? "bg-emerald-500 text-white"
    : "bg-amber-500 text-white";

  const progressColor = isCompleted
    ? "bg-emerald-500"
    : "bg-amber-500";

  const percentageColor = isCompleted
    ? "text-emerald-400"
    : "text-amber-400";

  return (
    <Link to="./module/123" className="group w-full hover:scale-102 transition duration-300
     rounded-xl border border-slate-800 bg-slate-900 p-4 
     shadow-[0_10px_12px_rgba(0,0,0,0.25)] cursor-pointer ">
      {/* Module header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-bold text-white">
          {title}
        </h2>

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${statusColor}`}
        >
          <FontAwesomeIcon
            icon={isCompleted ? faCheck : faClock}
            className="text-sm"
          />
        </div>
      </div>

      {/* Progress */}
      <div className="mt-3">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400">
            Completion
          </span>

          <span className={`font-bold ${percentageColor}`}>
            {completion}%
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full ${progressColor} transition-all duration-300`}
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      <div
        className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr]"
      >
        <div className="min-h-0 overflow-hidden">
          <button
            type="button"
            className="mt-4 cursor-pointer w-full rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            {isCompleted ? "finished" : "continue"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function YourCourse() {

  const modules: ModuleCardProps[] = [
    {
      title: "Module 1: Getting Started",
      completion: 100,
      status: "completed",
    },
    {
      title: "Module 2: Data Types",
      completion: 45,
      status: "in-progress",
    },
    {
      title: "Module 3: Operators",
      completion: 45,
      status: "in-progress",
    },
    {
      title: "Module 4: Control Flow",
      completion: 45,
      status: "in-progress",
    },{
      title: "Module 2: Data Types",
      completion: 45,
      status: "in-progress",
    },
    {
      title: "Module 3: Operators",
      completion: 45,
      status: "in-progress",
    },
    {
      title: "Module 4: Control Flow",
      completion: 45,
      status: "in-progress",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Back button */}
      

      <section className="flex flex-col items-center px-6 pb-16">
        {/* Breadcrumb
            Add your own paths/links here later */}
        <nav
          aria-label="Breadcrumb"
          className="flex w-full items-center gap-2 text-sm"
        >
          <span className="text-slate-400">Home</span>

          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-[10px] text-slate-500"
          />

          <span className="text-slate-400">Dashboard</span>

          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-[10px] text-slate-500"
          />

          <span className="max-w-44 truncate font-bold text-white" title="Course name">
            Course name
          </span>
        </nav>

        <div className="mt-8 flex w-full max-w-180 items-center flex-col">
          {/* Course title */}
          <h1 className="text-xl font-bold text-white">
            C programming: A fundamental Approach
          </h1>

          {/* Modules */}
          <div className="mt-[85px] self-stretch flex flex-col gap-[30px]">
            {modules.map((module, i) => (
              <ModuleCard
                key={module.title + i}
                title={module.title}
                completion={module.completion}
                status={module.status}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}