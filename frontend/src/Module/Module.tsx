import React from 'react';

// --- Import your provided components ---
import ModuleTitle from '../components/ModuleParts/ModuleTitle';
import ModuleTextArea from '../components/ModuleParts/ModuleTextArea';
import ModuleNoteArea from '../components/ModuleParts/ModuleNoteArea';
import ModulePhotoArea from '../components/ModuleParts/ModulePhotoArea';
import ModuleVideoArea from '@/components/ModuleParts/ModuleVideoArea';

// import ModuleVideoArea from '../components/ModuleParts/ModuleVideoArea'; // Available if needed

// --- Sidebar Progress Component ---
const steps = [
  { id: 1, title: 'Introduction to the Course', status: 'completed' },
  { id: 2, title: 'Setting Up Your Environment', status: 'completed' },
  { id: 3, title: 'Understanding the Basics', status: 'completed' },
  { id: 4, title: 'Your First Project', status: 'current' },
  { id: 5, title: 'Key Concepts Review', status: 'upcoming' },
  { id: 6, title: 'Module Summary', status: 'upcoming' },
];

function ModuleSidebar() {
  return (
    <div className="bg-slate-950 w-full lg:w-[320px] xl:w-[350px] rounded-2xl border border-gray-800 p-6 lg:p-8 font-sans h-fit sticky top-6">
      <h2 className="text-white text-2xl font-bold leading-tight mb-8">
        Module 1: Getting Started
      </h2>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-[#334155] z-0" />
        
        <ul className="flex flex-col gap-6 relative z-10">
          {steps.map((step) => (
            <li key={step.id} className="flex items-center gap-4">
              <div className="relative flex-shrink-0 bg-[#0f1523] py-1">
                {step.status === 'completed' && (
                  <div className="w-5 h-5 bg-[#00c885] rounded-full flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {step.status === 'current' && (
                  <div className="w-5 h-5 rounded-full border-[3px] border-[#3b82f6] flex items-center justify-center bg-[#0f1523]">
                    <div className="w-2 h-2 bg-[#3b82f6] rounded-full" />
                  </div>
                )}
                {step.status === 'upcoming' && (
                  <div className="w-5 h-5 rounded-full border-[3px] border-[#475569] flex items-center justify-center bg-[#0f1523]">
                    <div className="w-1.5 h-1.5 bg-[#475569] rounded-full" />
                  </div>
                )}
              </div>
              
              <span className={`text-[15px] tracking-wide ${step.status === 'current' ? 'text-[#3b82f6] font-bold' : 'text-[#94a3b8] font-medium'}`}>
                {step.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- Main Page Layout ---
export default function CourseModulePage() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      
      {/* Top Navigation */}
      

      {/* Breadcrumbs */}
      <div className="w-full px-6 py-4 mx-auto">
        <nav className="text-base text-gray-500 font-medium">
          Home &nbsp;&gt;&nbsp; Dashboard &nbsp;&gt;&nbsp; Course &nbsp;&gt;&nbsp; <span className="text-white">Module 1</span>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="w-full px-4 sm:px-6 pb-12 flex justify-start 2xl:justify-center">
        <div className="flex flex-col-reverse lg:flex-row gap-8 xl:gap-12 items-start mt-4">
          
          {/* Left Column: Course Material */}
          <div className="flex-1 flex flex-col gap-8 w-full max-w-3xl">
            <ModuleTitle title="Getting Started" />
            
            <ModuleTextArea 
              title="The Basics of C programming" 
              description="To create an education system that can generate a learning society capable of facing the challenges of the knowledge age. C programming language is a high level programming language, while giving you all the possible powers." 
            />
            
            <ModuleNoteArea 
              title="Why C programming is Important" 
              note="This is the area for note. When you have something knowledgeable but are not specifically required for the course you can use this component. This is somewhat handy. To create an education system that can generate a learning society capable of facing the challenges of the knowledge age" 
            />
            
            <ModulePhotoArea />
            
            {/* Repeated text and photo matching the screenshot flow */}
            <ModuleTextArea 
              title="The Basics of C programming" 
              description="To create an education system that can generate a learning society capable of facing the challenges of the knowledge age. C programming language is a high level programming language, while giving you all the possible powers."
            />
            
            <ModuleVideoArea
            videoUrl="https://www.youtube.com/watch?v=nw6W_fMf008"
            />
          </div>

          {/* Right Column: Sidebar Progress */}
          
          
        </div>
      </main>

      <div className="w-full hidden xl:block lg:w-auto fixed lg:top-0 lg:right-0 lg:mt-32 lg:mr-8">
            <ModuleSidebar />
          </div>
    </div>
  );
}