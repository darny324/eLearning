import {Link} from "react-router";
import { useState } from "react";

function CourseCard(){
    return (
        <div className="w-72 self-stretch bg-white rounded-2xl shadow-[0px_10px_24px_-8px_rgba(0,0,0,0.08)] inline-flex flex-col justify-start items-start overflow-hidden">
  <img className="self-stretch h-32" src="https://placehold.co/296x134" />
  <div className="self-stretch p-4 flex flex-col justify-start items-start gap-3">
    <div className="self-stretch justify-start text-gray-900 text-xl font-semibold font-['Inter'] leading-6">C Programming: A Fundamental Approach</div>
    <div className="self-stretch justify-start text-gray-500 text-lg font-medium font-['Inter']">Dr. Sarah Mitchell</div>
    <div className="self-stretch justify-start text-gray-500 text-lg font-normal font-['Inter'] leading-5">Learn the core concepts of C programming from variables and loops to pointers and memory management.</div>
    <div className="self-stretch inline-flex justify-between items-center">
      <div className="size- px-2.5 py-1.5 bg-gray-300 rounded-[999px] flex justify-start items-center gap-1.5">
        <div className="justify-start text-black text-xs font-['Inter']">Beginner</div>
      </div>
      <div className="justify-start text-red-500 text-base font-bold font-['Inter']">$49.99</div>
    </div>
    <Link to="/course/123" className="self-stretch h-11 bg-blue-600 rounded-xl shadow-[0px_8px_18px_-6px_rgba(37,99,235,0.20)] 
    inline-flex justify-center items-center cursor-pointer hover:bg-blue-700 hover:scale-105 active:bg-blue-800 
    transition-colors duration-300 transition-transform">
      <div className="justify-start text-white text-sm font-bold font-['Inter']">Explore</div>
    </Link>
  </div>
</div>
    )
}

function CourseSearchBar() {
  return (
    <div className="flex items-center overflow-hidden rounded-xl bg-[#D1D1D6] focus-within:ring-[#2F69F2] focus-within:ring-2">
      <input
        type="text"
        placeholder="Search Courses"
        className="w-full bg-transparent px-6 py-4 text-lg text-black placeholder-[#8E8E93] outline-none"
      />
      <button className="bg-[#2F69F2] cursor-pointer px-12 py-4 text-lg text-white hover:bg-[#1E4ED8] focus:outline-none 
      focus:ring-2 focus:ring-[#2F69F2] active:bg-[#1E4ED8] transition-colors duration-200">
        Search
      </button>
    </div>
  );
}
const Courses = () => {

    const [showCourses, setShowCourses] = useState(true);
    const [message, setMessage] = useState('Find Courses');

    return (
        <div className="flex flex-col items-center justify-center gap-8 py-10 bg-slate-950">
            <div className="flex w-full px-4 md:px-40 flex-col gap-8">
                <CourseSearchBar />
            </div>

            {
                showCourses ? (
                    <div className="flex flex-wrap justify-center gap-8 md:px-48 px-4">
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 py-10">
                        <h2 className="text-white text-2xl font-semibold">{message}</h2>
                        <p className="text-gray-400 text-lg">Try adjusting your search or filter to find what you're looking for.</p>
                    </div>
                )
            }

         
        </div>
    )
}

export default Courses;