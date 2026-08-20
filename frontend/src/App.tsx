import './App.css'
import { Link, NavLink, Outlet } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPaperPlane, faBars, faCircleInfo, faComputer, faHome, faPhone, faSignIn, faXmark, faUser, faGaugeHigh, faRightFromBracket, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import WebsiteIcon from './assets/icon2.png'

// Note: Ensure you have FontAwesome installed: npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import type { FooterSection } from './types';

function Footer(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');

  const footerNavigation: FooterSection[] = [
    {
      title: 'Explore',
      links: [
        { label: 'Popular Courses', href: '#courses' },
        { label: 'Learning Tracks', href: '#tracks' },
        { label: 'Free Resources', href: '#freebies' },
        { label: 'Certificates', href: '#credentials' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Student Forums', href: '#forums' },
        { label: 'Hackathons', href: '#hackathons' },
        { label: 'Discord Server', href: '#discord' },
        { label: 'Success Stories', href: '#testimonials' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About SkillGrid', href: '#about' },
        { label: 'Become a Teacher', href: '#careers' },
        { label: 'Affiliate Program', href: '#affiliate' },
        { label: 'Contact Support', href: '#support' },
      ],
    },
  ];

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed ${email} to SkillGrid updates!`);
    setEmail('');
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 px-6 pt-16 pb-8 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Top Content Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 xl:gap-12 pb-12 border-b border-slate-800/80">

          {/* Brand Info Grid Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent tracking-tight block">
              SkillGrid
            </span>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering learners worldwide through scalable, high-yield digital credentials and interactive, expert-guided education structures.
            </p>
            {/* Social Network Icon Strips */}
            <div className="flex items-center space-x-4 pt-2">
              <a href="#twitter" aria-label="Twitter" className="hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faTwitter} className="text-lg" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
              </a>
              <a href="#facebook" aria-label="Facebook" className="hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faFacebook} className="text-lg" />
              </a>
              <a href="#github" aria-label="GitHub" className="hover:text-white transition-colors duration-200">
                <FontAwesomeIcon icon={faGithub} className="text-lg" />
              </a>
            </div>
          </div>

          {/* Map Section Navigation Arrays */}
          {footerNavigation.map((section, index) => (
            <div key={index} className="flex flex-col space-y-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                {section.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="hover:text-pink-400 transition-colors duration-150 block w-max"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Metadata Bar & Newsletter Row */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Quick Newsletter Module inside Footer */}
          <form onSubmit={handleSubscribe} className="w-full max-w-md flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 focus-within:border-slate-700 transition-colors duration-200">
            <div className="pl-3 text-slate-500">
              <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
            </div>
            <input
              type="email"
              placeholder="Join our tech newsletter..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm text-white px-3 py-2 outline-none placeholder-slate-500"
              required
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center aspect-square"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
            </button>
          </form>

          {/* Legal Copyright Disclaimers */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-slate-500 text-center lg:text-right">
            <span>&copy; {new Date().getFullYear()} SkillGrid Inc. All rights reserved.</span>
            <div className="space-x-4">
              <a href="#privacy" className="hover:text-slate-400 transition-colors duration-150">Privacy Policy</a>
              <a href="#terms" className="hover:text-slate-400 transition-colors duration-150">Terms of Service</a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}


const Header = () => {



  const [barOpen, setbarOpen] = useState(false);
  const [isUser, setIsUser] = useState(() => localStorage.getItem('isUser') === 'true');
  const [profileOpen, setProfileOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100)
        setScrolled(true);
      else setScrolled(false);
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <header className={`flex justify-between ${scrolled ? 'bg-transparent text-gray-500' : 'bg-slate-800 text-gray-500'} px-8 py-4 items-center
       w-full z-30 transition-colors duration-300 ease-out`}>
      <div>
        <img src={WebsiteIcon} className='w-10 h-10 inline object-cover rounded-full' />
        <span className='text-pink-400 font-semibold text-2xl ml-2'>Skillgrid</span>
      </div>

      <div className='gap-10 items-center hidden md:flex'>
        <NavLink to='home'
          className={({ isActive }) => {
            if (isActive) {
              return `after:content-[''] after:w-full relative
after:h-0.5 ${scrolled ? 'after:bg-cyan-400' : 'after:bg-white'} after:absolute after:bottom-0 after:left-0 
after:animate-stretch-x after:origin-center after:transition
`
            } else {
              return '';
            }
          }}
        >
          <span>Home</span>
        </NavLink>

        <NavLink to='courses'
          className={({ isActive }) => {
            if (isActive) {
              return `after:content-[''] after:w-full relative
after:h-0.5 ${scrolled ? 'after:bg-cyan-400' : 'after:bg-white'} after:absolute after:bottom-0 after:left-0 
after:animate-stretch-x after:origin-center after:transition
`
            } else {
              return '';
            }
          }}
        >
          <span>Courses</span>
        </NavLink>

        <NavLink to='about'>
          About Us
        </NavLink>

        <NavLink to='contact'>
          Contact us
        </NavLink>

        {isUser ? <div className='relative'>
          <button
            type='button'
            aria-expanded={profileOpen}
            aria-haspopup='menu'
            aria-label='Open profile menu'
            onClick={() => setProfileOpen(!profileOpen)}
            className='flex items-center gap-2 rounded-full focus:outline-2 focus:outline-cyan-400'
          >
            <img src={WebsiteIcon} alt='Profile' className='cursor-pointer h-10 w-10 rounded-full object-cover ring-2 ring-cyan-300/70 hover:ring-cyan-400' />
          </button>
          {profileOpen && <div className='absolute right-0 top-12 z-50 w-48 rounded-lg border border-slate-200 bg-white py-2 text-slate-700 shadow-xl' role='menu'>
            <Link to='account' role='menuitem' className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100'>
              <FontAwesomeIcon icon={faUser} className='w-4 text-slate-500' />
              My Account
            </Link>
            <Link to='dashboard' role='menuitem' className='flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100'>
              <FontAwesomeIcon icon={faGaugeHigh} className='w-4 text-slate-500' />
              Dashboard
            </Link>
            <button
              type='button'
              role='menuitem'
              onClick={() => {
                setIsUser(false);
                localStorage.removeItem('isUser');
                setProfileOpen(false);
              }}
              className='flex w-full items-center gap-3 px-4 py-2.5 text-left text-rose-600 hover:bg-rose-50'
            >
              <FontAwesomeIcon icon={faRightFromBracket} className='w-4' />
              Sign Out
            </button>
          </div>}
        </div> : <>
          <NavLink to='login' className='rounded-full bg-blue-500 px-8 py-2 font-semibold text-white'>
            Login
          </NavLink>
          <NavLink to='sign-up' className='rounded-full bg-gray-700 px-8 py-2 text-white'>
            Sign Up
          </NavLink>
        </>}
      </div>

      <div className='block md:hidden'>
        <button
          onClick={() => {
            setbarOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faBars}
            className={`${scrolled ? 'text-gray-500 hover:text-gray-400' : 'text-white text-gray-50'}`}
          />
        </button>
      </div>
      {
        barOpen && <div className='absolute right-0 h-screen 
          bg-slate-800 top-0 w-52 animate-slide-left md:hidden 
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
            isUser ? <div className='w-full flex flex-col gap-4 mb-12'>
              <NavLink to='account' className='w-full rounded-lg px-4 py-2'>
                <img src={WebsiteIcon} alt='Profile' className='mr-2 inline-block h-8 w-8 rounded-full object-cover align-middle' />
                My Account
              </NavLink>
              <button
                type='button'
                onClick={() => {
                  setIsUser(false);
                  localStorage.removeItem('isUser');
                  setbarOpen(false);
                }}
                className='w-full rounded-lg px-4 py-2 text-left text-rose-400'
              >
                <FontAwesomeIcon icon={faRightFromBracket} className='mr-2' />
                Sign Out
              </button>
            </div>
              : <div className='w-full flex flex-col gap-4 mb-12'>
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


function App() {

  return (
    <div className='bg-white dark:bg-black text-black dark:text-white
      flex flex-col'>
      <Header />
      <div
        className='flex-1 min-h-screen bg-slate-950'
      >
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  )
}

export default App
