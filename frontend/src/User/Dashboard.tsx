import React from 'react';
import { Link } from 'react-router';
export interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  imageUrl: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-[#0b1329] border border-slate-800/60 rounded-2xl overflow-hidden flex flex-col h-full shadow-xl">
      {/* Course Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Details */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-white text-base font-semibold tracking-wide mb-1 leading-snug">
          {course.title}
        </h3>
        <p className="text-slate-400 text-xs mb-5">
          {course.instructor}
        </p>
        
        {/* Progress Tracker */}
        <div className="mt-auto">
          <div className="text-xs text-slate-400 mb-2">
            {course.progress}% Complete
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          
          {/* Action Button */}
          <Link to={`/account/dashboard/course/${course.id}`} className="w-full bg-[#1d4ed8] hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 text-sm">
            Continue
          </Link>
        
        </div>
      </div>
    </div>
  );
};

// Sample mock data to populate the grid identically to the mockup
const MOCK_COURSES: Course[] = Array(4).fill(null).map((_, index) => ({
  id: String(index + 1),
  title: 'C Programming: A Fundamental Approach',
  instructor: 'Dr. Sarah Mitchell',
  progress: 65,
  // Using a laptop setup placeholder image matching the theme
  imageUrl: 'https://unsplash.com',
}));

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-200 ">
      <div className="flex flex-col items-center">
        
        {/* Top Navigation / Back Action */}
        
        

        {/* Main Content Layout Block */}
        <div className="flex max-w-360 flex-col md:flex-row gap-8 lg:gap-12 px-4 py-8">
          
          {/* User Profile Left Sidebar Component */}
          <aside className="w-full md:w-[240px] shrink-0">
            <div className="flex flex-col items-center text-center">
              
              {/* Profile Avatar Placeholder Container */}
              <div className="w-28 h-28 rounded-full bg-slate-900 flex items-center justify-center mb-4 overflow-hidden border border-slate-800">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center relative">
                  {/* Subtle grid pattern background mimicking transparent checkerboard */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[size:8px_8px] bg-[position:0_0,0_4px,4px_-4px,-4px_0] opacity-30 rounded-full" />
                </div>
              </div>

              <h2 className="text-white text-lg font-semibold mb-0.5">John Doe</h2>
              <p className="text-slate-400 text-xs mb-4">johndoe@gmail.com</p>
              
              <span className="bg-[#1e3a8a]/40 text-[#60a5fa] font-medium text-xs px-5 py-1 rounded-full mb-6 border border-blue-500/20">
                Student
              </span>

              {/* Sidebar Action Accomplishments */}
              <div className="w-full space-y-2.5">
                <div className="flex items-center gap-3 border border-slate-800/80 rounded-xl px-3 py-2.5 bg-slate-900/20 text-left">
                  <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span className="text-xs font-medium text-slate-300">15 hours completed</span>
                </div>

                <div className="flex items-center gap-3 border border-slate-800/80 rounded-xl px-3 py-2.5 bg-slate-900/20 text-left">
                  <svg xmlns="http://w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  <span className="text-xs font-medium text-slate-300">15 hours completed</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Courses Main Display Area */}
          <main className="flex-1">
            <h1 className="text-white text-xl font-bold tracking-wide mb-6">
              Your Courses
            </h1>
            
            {/* Fluid Responsive Grid Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_COURSES.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};
