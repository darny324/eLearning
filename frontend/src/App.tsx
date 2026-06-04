import './App.css'
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBlog, faCircleInfo, faComputer, faHome, faPhone, faSchool, faSignIn, faSigning, faTasks, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


const Header = () => {

  const [barOpen, setbarOpen] = useState(false);
  const isUser = false;
  return (
    <header className='flex justify-between bg-cyan-400 px-8 py-4 items-center
      fixed w-full'>
      <div>
        <img />
        <span className='text-pink-400 font-semibold text-2xl'>Skillgrid</span>
      </div>

      <div className='gap-10 items-center text-white hidden md:flex'>
        <NavLink to='home'>
          Home
        </NavLink>

        <NavLink to='courses'>
          Courses
        </NavLink>

        <NavLink to='careers'>
          Careers
        </NavLink>

        <NavLink to='blogs'>
          Blogs
        </NavLink>

        <NavLink to='about'>
          About Us
        </NavLink>

        <NavLink to='contact'>
          Contact us
        </NavLink>

        <NavLink to='login'
          className='px-8 py-2 rounded-full bg-white 
          font-semibold text-gray-400 hover:bg-gray-50'
        >
          Login
        </NavLink>

        <NavLink to='sign_up'
          className='px-8 py-2 rounded-full bg-gray-50/40 
          hover:bg-gray-50/30'
        >
          Sign Up
        </NavLink>
      </div>

      <div className='block md:hidden'>
        <button
          onClick={() => {
            setbarOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} className='text-white
            hover:text-gray-50' />
        </button>
      </div>
      {
        barOpen && <div className='absolute right-0 h-screen 
          bg-gray-50 top-0 w-52 animate-slide-left
          flex flex-col items-start justify-between px-4 py-4'>
          <div className='flex flex-col gap-4 w-full items-start'>
            <button
              onClick={() => setbarOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className='text-gray-500' />
            </button>
            <NavLink to=''
              className={({ isActive }) => {
                if (isActive) {
                  return `w-full px-4 py-2 rounded-lg bg-blue-500 text-white
                    transition-opacity duration-300`
                } else {
                  return 'w-full px-4 py-2'
                }
              }}
            >
              <FontAwesomeIcon icon={faHome} className='mr-2' />
              Home
            </NavLink>
            <NavLink to='courses'
              className={({ isActive }) => {
                if (isActive) {
                  return `w-full px-4 py-2 rounded-lg bg-blue-500 text-white
                    transition-opacity duration-300`
                } else {
                  return 'w-full px-4 py-2'
                }
              }}
            >
              <FontAwesomeIcon icon={faComputer} className='mr-2' />
              Courses
            </NavLink>
            <NavLink to='careers'
              className={({ isActive }) => {
                if (isActive) {
                  return `w-full px-4 py-2 rounded-lg bg-blue-500 text-white
                    transition-opacity duration-300`
                } else {
                  return 'w-full px-4 py-2'
                }
              }}
            >
              <FontAwesomeIcon icon={faTasks} className='mr-2' />
              Careers
            </NavLink>
            <NavLink to='blogs'
              className={({ isActive }) => {
                if (isActive) {
                  return `w-full px-4 py-2 rounded-lg bg-blue-500 text-white
                    transition-opacity duration-300`
                } else {
                  return 'w-full px-4 py-2'
                }
              }}
            >
              <FontAwesomeIcon icon={faBlog} className='mr-2' />
              Blogs
            </NavLink>
            <NavLink to='about'
              className={({ isActive }) => {
                if (isActive) {
                  return `w-full px-4 py-2 rounded-lg bg-blue-500 text-white
                    transition-opacity duration-300`
                } else {
                  return 'w-full px-4 py-2'
                }
              }}
            >
              <FontAwesomeIcon icon={faCircleInfo} className='mr-2' />
              About Us
            </NavLink>
            <NavLink to='contact'
              className={({ isActive }) => {
                if (isActive) {
                  return `w-full px-4 py-2 rounded-lg bg-blue-500 text-white
                    transition-opacity duration-300`
                } else {
                  return 'w-full px-4 py-2'
                }
              }}
            >
              <FontAwesomeIcon icon={faPhone} className='mr-2' />
              Contact Us
            </NavLink>

          </div>
          {
            isUser ? <div>
              <div></div>
            </div>
              : <div className='w-full flex flex-col gap-4 '>
                <Link to='login'
                  className='px-4 py-2 rounded-lg bg-cyan-300 text-white w-full'>
                  Login
                  <FontAwesomeIcon icon={faSignIn} className='ml-4' />
                </Link>
                <Link to='sign_up'
                  className='bg-gray-300 rounded-lg px-4 py-2 w-full '>
                  Sign Up
                  <FontAwesomeIcon icon={faSignIn} className='-rotate-90' />
                </Link>
              </div>
          }
        </div>
      }
    </header>
  )
}

const Footer = () => {

  return (
    <footer className='fixed bottom-0'>
      footer
    </footer>
  )
}

function App() {

  return (
    <div className='bg-white dark:bg-black text-black dark:text-white
      flex flex-col'>
      <Header />

      <div className='flex-1'>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  )
}

export default App
