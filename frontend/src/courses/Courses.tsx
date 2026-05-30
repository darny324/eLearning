import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faSignal, faClock } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "flowbite-react";
import { faSlidersH, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState, type ChangeEvent } from "react";

const CourseFilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: '',
    topic: '',
    duration: '',
    level: '',
    language: ''
  });


  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full p-4 shadow-sm border border-gray-100 rounded-lg">
      {/* Trigger Button & Active Summary */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-white cursor-pointer 
          transition hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <FontAwesomeIcon icon={faSlidersH} className="text-gray-500" />
          <span>{isOpen ? 'Hide Filters' : 'Show Filters'}</span>
          <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Simple Reset Quick Link */}
        {isOpen && (
          <button
            onClick={() => setFilters({ sortBy: '', topic: '', duration: '', level: '', language: '' })}
            className="text-xs text-blue-600 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Horizontal Filter Bar */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">

          {/* 1. Sorting */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold 
              uppercase tracking-wider">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="w-full dark:bg-gray-700 bg-gray-50 border border-gray-300 text-sm rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Most Relevant</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>

          {/* 2. Topic */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Topic</label>
            <select
              name="topic"
              value={filters.topic}
              onChange={handleFilterChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Topics</option>
              <option value="web-dev">Web Development</option>
              <option value="data-science">Data Science</option>
              <option value="design">UI/UX Design</option>
              <option value="business">Business & Marketing</option>
            </select>
          </div>

          {/* 3. Duration */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</label>
            <select
              name="duration"
              value={filters.duration}
              onChange={handleFilterChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any Duration</option>
              <option value="short">0-2 Hours</option>
              <option value="medium">3-6 Hours</option>
              <option value="long">7-16 Hours</option>
              <option value="full">17+ Hours</option>
            </select>
          </div>

          {/* 4. Level */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</label>
            <select
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* 5. Language */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</label>
            <select
              name="language"
              value={filters.language}
              onChange={handleFilterChange}
              className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Languages</option>
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>

        </div>
      )}
    </div>
  );
}

interface CourseCardProps {
  courseImage?: string;
  teacherImage?: string;
  teacherName?: string;
  title?: string;
  description?: string;
  category?: string;
  rating?: number;
  level?: string;
  duration?: string;
}

const CourseCard = ({
  courseImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=340&fit=crop",
  teacherImage = "https://i.pravatar.cc/40?img=12",
  teacherName = "Sarah Johnson",
  title = "Mastering React & Next.js from Scratch",
  description = "Build modern, production-ready web applications with React 19 and Next.js. Covers hooks, server components, and deployment.",
  category = "Web Development",
  rating = 4.8,
  level = "Intermediate",
  duration = "12h 30m",
}: CourseCardProps) => {
  return (
    <div className="w-[300px] md:w-[340px] cursor-pointer rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* 1 — Course Image */}
      <div className="px-3 pt-3">
        <img
          src={courseImage}
          alt={title}
          className="w-full h-[190px] object-cover rounded-lg"
        />
      </div>

      <div className="px-4 pt-3 pb-4 space-y-2.5">
        {/* 2 — Teacher Info */}
        <div className="flex items-center gap-2.5">
          <img
            src={teacherImage}
            alt={teacherName}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-100"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-white">
            {teacherName}
          </span>
        </div>

        {/* 3 — Title */}
        <h3 className="text-xl font-bold leading-snug text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* 4 — Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* 5 — Category Badge */}
        <div>
          <Badge color="purple" className="w-fit text-xs font-semibold">
            {category}
          </Badge>
        </div>

        {/* 6 — Rating · Level · Duration */}
        <div className="flex items-center gap-4 pt-1 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faStar}
              className="text-amber-400 text-xs"
            />
            <span className="font-semibold text-gray-700">{rating}</span>
          </span>

          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faSignal} className="text-purple-500 text-xs" />
            {level}
          </span>

          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} className="text-blue-400 text-xs" />
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
}

const Courses = () => {
  return (
    <div className="md:ml-64 flex flex-col items-center w-full
      ">
      <div className='py-4 px-8 xl:px-100 border-b w-full border-b-gray-200 
        flex justify-center items-center gap-4 mb-4'>
        <span className="font-semibold text-pink-400">Skillgrid</span>
        <div className="flex-1 rounded-full focus:shadow-lg shadow flex items-center gap-2">
          <input className="w-full border-none rounded-full 
            outline-none px-8 py-2 ml-2text-gray-500 " />
          <div className="flex w-10 h-8 justify-center items-center rounded-full 
            bg-blue-500 text-white mr-2
            ">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <CourseFilterBar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
    </div >
  )
}

export default Courses
