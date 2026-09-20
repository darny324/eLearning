import React from 'react'
import { Link, Outlet, useLocation } from 'react-router'

const Account = () => {

    const location = useLocation(); 
    
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col ">
        <div className="py-8 px-8 w-full border-b border-slate-800/60 mb-8">
          <Link to={location.pathname + "../../../"} className="cursor-pointer flex items-center gap-2 text-white hover:text-slate-300 font-medium text-base transition-colors group">
          <svg 
            className="transform group-hover:-translate-x-0.5 transition-transform" 
            xmlns="http://w3.org" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>
        </div>

        <Outlet />
    </div>
  )
}

export default Account