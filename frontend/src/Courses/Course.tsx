import React, { useState } from 'react';
import { ChevronDown, Star, Award, Code, BookOpen, Video } from 'lucide-react';

// Explicit interfaces for TypeScript Type Safety
interface IncludedMaterials {
  videos: number;
  assignments: number;
  readings: number;
}

interface ModuleItem {
  id: number;
  title: string;
  moduleNumber: string;
  description: string;
  included: IncludedMaterials;
}

// Strictly Typed Mock Data
const MODULES_DATA: ModuleItem[] = [
  {
    id: 1,
    title: "C Programming: Hello World",
    moduleNumber: "module 1",
    description: "An introduction to the C programming language environment. Learn how to set up your compiler, write your very first program, and understand the basic structure of C source code.",
    included: { videos: 5, assignments: 2, readings: 3 }
  },
  {
    id: 2,
    title: "Variables and Data Types",
    moduleNumber: "module 2",
    description: "Deep dive into memory allocation, primitive data types, variable declarations, and fundamental arithmetic operations in C.",
    included: { videos: 8, assignments: 4, readings: 5 }
  },
  {
    id: 3,
    title: "Control Structures & Loops",
    moduleNumber: "module 3",
    description: "Master conditional logic using if-else statements and switch cases. Automate repetitive tasks using for, while, and do-while loops.",
    included: { videos: 7, assignments: 3, readings: 4 }
  },
  {
    id: 4,
    title: "Functions and Scope",
    moduleNumber: "module 4",
    description: "Learn how to modularize your code using functions. Understand parameter passing, return types, local vs. global scope, and recursion basics.",
    included: { videos: 6, assignments: 3, readings: 2 }
  }
];

export default function Course(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans py-6 px-44 md:p-12">
      <div className=" mx-auto space-y-16 flex flex-col items-center">
        
        {/* Header Section */}
        <header className="max-w-[1440px] grid md:grid-cols-2 gap-8 items-center border-b border-gray-800 pb-12">
          <div className="bg-[#0f172a] self-stretch border border-gray-800 rounded-xl flex items-center justify-center text-gray-500 shadow-xl overflow-hidden">
            <img className="w-full h-full object-cover" src="https://via.placeholder.com/600x400" alt="Course Image" />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">C Programming: A Fundamental Approach</h1>
            <p className="text-gray-400 text-sm">Dr. Sarah Mitchell</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Master the fundamentals of C programming. From variables, data types, and control structures to pointers, memory management, and file I/O — this course gives you a solid foundation in one of the most powerful and widely-used programming languages.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="text-2xl font-bold">$49.99</span>
              <span className="bg-[#13233c] text-[#4ea2ff] px-3 py-1 rounded-full text-xs font-semibold">Beginner</span>
              <div className="flex items-center text-yellow-500 gap-1">
                <Star size={16} fill="currentColor" />
                <span className="text-white font-medium">4.8</span>
                <span className="text-gray-400 text-xs">(2,450)</span>
              </div>
            </div>
            <button className="w-full bg-[#1d5eff] hover:bg-[#1546c7] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Enroll
            </button>
          </div>
          
        </header>

        {/* Learning Outcomes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Learning Outcomes</h2>
          <ul className="max-w-2xl mx-auto space-y-2 text-gray-300 text-lg list-disc list-inside">
            <li>Understand the basic syntax of C programming Language</li>
            <li>Intuitively understand how a C program works</li>
            <li>Understand how the computer executes a C program</li>
            <li>Program intermediate C programs</li>
            <li>Understand structures and other advanced C techniques</li>
          </ul>
        </section>

        {/* Skills & Tools */}
        <section className="grid sm:grid-cols-2 gap-8 text-center max-w-2xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Skills You Will Gain</h2>
            <div className="flex justify-center gap-2 flex-wrap">
              {['programming', 'programming', 'programming'].map((skill, i) => (
                <span key={i} className="bg-white text-black text-xs font-medium px-4 py-2 rounded-full shadow-sm">{skill}</span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Tools You Will Learn</h2>
            <div className="flex justify-center gap-2 flex-wrap">
              {['Python', 'C/C++', 'Libraries'].map((tool, i) => (
                <span key={i} className="bg-white text-black text-xs font-medium px-4 py-2 rounded-full shadow-sm">{tool}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Modules Accordion Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold">Modules</h2>
            <p className="text-sm font-semibold text-gray-400">There are four modules in this course</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Are you interested in learning the basic of how computer works and structural programming. C programming offers you a range of employment opportunities primarily in embedded programming. C programming is still the dominant programming language in embedded programming and it seems that it has no way of stopping it.
            </p>
          </div>

          <div className="max-w-2xl mx-auto border border-gray-800 rounded-xl divide-y divide-gray-800 bg-[#090d16] overflow-hidden">
            {MODULES_DATA.map((module) => (
              <ModuleAccordionItem key={module.id} module={module} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// Child Accordion Props Interface
interface ModuleAccordionItemProps {
  module: ModuleItem;
}

// Component with typed Props structure
function ModuleAccordionItem({ module }: ModuleAccordionItemProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="transition-colors duration-200">
      {/* Clickable Header Row */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex items-center justify-between hover:bg-[#0f172a] transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-wide">{module.title}</h3>
          <p className="text-xs text-gray-500 uppercase tracking-wider">{module.moduleNumber}</p>
        </div>
        <ChevronDown 
          size={20} 
          className={`text-blue-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Expandable Content Area */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[400px] border-t border-gray-900 bg-[#050b14]' : 'max-h-0'
        }`}
      >
        <div className="p-5 space-y-4 text-sm text-gray-300 leading-relaxed border-b border-gray-900">
          <p>{module.description}</p>
          
          {/* Included Features Breakout */}
          <div className="pt-4 border-t border-gray-800/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
              <Award size={14} /> What is included
            </h4>
            <div className="grid grid-cols-3 gap-4 text-xs bg-[#0b1224] p-3 rounded-lg border border-gray-800">
              <div className="flex items-center gap-2 text-gray-400">
                <Video size={14} className="text-purple-400" />
                <span><strong className="text-white">{module.included.videos}</strong> Videos</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Code size={14} className="text-emerald-400" />
                <span><strong className="text-white">{module.included.assignments}</strong> Assignments</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <BookOpen size={14} className="text-amber-400" />
                <span><strong className="text-white">{module.included.readings}</strong> Readings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
