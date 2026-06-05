
import React from 'react';
// Note: Ensure you have FontAwesome installed: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLayerGroup, faTag } from '@fortawesome/free-solid-svg-icons';
import type { Course } from '@/types';

export default function CourseCard({ course }: { course: Course }) {
  // Safe fallbacks to prevent errors if data fields are missing
  const {
    image = 'https://unsplash.com',
    field = 'General',
    title = 'Untitled Course',
    description = 'No description provided.',
    level = 'All Levels',
    duration = 'Self-paced',
    price = 'Free',
    badgeColor = 'bg-pink-500/10 text-pink-400 border-pink-500/20'
  } = course;

  return (
    <div className="group bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-slate-600 hover:-translate-y-1 hover:shadow-xl w-full">

      {/* Image & Field Overlay Banner */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-md ${badgeColor}`}>
          {field}
        </span>
      </div>

      {/* Course Main Metadata Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-orange-400 transition-all duration-200">
          {title}
        </h3>

        <p className="text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Technical Specifications Bar (Level & Duration) */}
        <div className="grid grid-cols-2 gap-4 border-t border-slate-700/60 pt-4 mt-auto">
          <div className="flex items-center space-x-2 text-slate-400">
            <FontAwesomeIcon icon={faLayerGroup} className="text-xs text-slate-500" />
            <span className="text-xs font-medium">{level}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400 justify-end">
            <FontAwesomeIcon icon={faClock} className="text-xs text-slate-500" />
            <span className="text-xs font-medium">{duration}</span>
          </div>
        </div>

        {/* Bottom Pricing & CTA Layout */}
        <div className="flex items-center justify-between border-t border-slate-700/60 pt-4 mt-4">
          <div className="flex items-center space-x-1.5">
            <FontAwesomeIcon icon={faTag} className="text-sm text-orange-500" />
            <span className="text-xl font-extrabold text-white">{price}</span>
          </div>
          <button className="text-xs font-bold text-white bg-slate-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 px-4 py-2 rounded-lg transition-all duration-300">
            Enroll Now
          </button>
        </div>

      </div>
    </div>
  );
}
