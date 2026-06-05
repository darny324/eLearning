
// Note: Ensure you have FontAwesome installed: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSmile, faChalkboardTeacher, faArrowRight, faGraduationCap, faBookOpen, faAward, faCheckCircle, faBriefcase, faCertificate, faInfinity, faQuoteRight, faStar } from '@fortawesome/free-solid-svg-icons';


import CourseCard from '../components/ui/CourseCard.tsx';
import type { Course } from '@/types.ts';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

import ProfileImg from '../assets/profile2.png'

function CoursesSection(): React.JSX.Element {
  // Explicitly type the array to prevent type mutation issues later
  const featuredCourses: Course[] = [
    {
      id: 1,
      image: 'https://unsplash.com',
      field: 'Web Development',
      title: 'Full-Stack React & Node.js Masterclass',
      description: 'Build scalable, real-world web applications from scratch. Master frontend architecture, REST APIs, and database deployment.',
      level: 'Intermediate',
      duration: '48 Hours',
      price: '$99',
      badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20'
    },
    {
      id: 2,
      image: 'https://unsplash.com',
      field: 'Data Science',
      title: 'Python for AI & Advanced Machine Learning',
      description: 'Dive deep into neural networks, data visualization, and predictive modeling using industry-standard libraries like TensorFlow.',
      level: 'Advanced',
      duration: '60 Hours',
      price: '$129',
      badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    },
    {
      id: 3,
      image: 'https://unsplash.com',
      field: 'Language',
      title: 'Business English & Global Communication',
      description: 'Accelerate your career by mastering corporate vocabulary, presentation frameworks, and cross-cultural negotiation tactics.',
      level: 'All Levels',
      duration: '24 Hours',
      price: '$49',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    }
  ];

  return (
    <section className="w-full bg-slate-900 border-t border-slate-800 px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Explore Our Top Courses
            </h2>
            <p className="text-base text-slate-400">
              Handpicked premium learning tracks designed to help you specialize fast and acquire highly demanded workplace skills.
            </p>
          </div>
          <button className="inline-flex items-center justify-center border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 whitespace-nowrap self-center md:self-end">
            View All Courses
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
          </button>
        </div>

        {/* Layout Grid feeding data into modular CourseCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

      </div>
    </section>
  );
}

function AchievementSection() {
  const achievements = [
    {
      id: 1,
      metric: '50K+',
      label: 'Active Students',
      desc: 'Empowering minds worldwide.',
      icon: faUsers,
      colorClass: 'text-pink-500 bg-pink-500/10',
    },
    {
      id: 2,
      metric: '300+',
      label: 'Premium Courses',
      desc: 'Expert-led learning tracks.',
      icon: faBookOpen,
      colorClass: 'text-orange-500 bg-orange-500/10',
    },
    {
      id: 3,
      metric: '98.4%',
      label: 'Satisfaction Rate',
      desc: 'Highly rated by our community.',
      icon: faSmile,
      colorClass: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      id: 4,
      metric: '180+',
      label: 'Expert Teachers',
      desc: 'Industry veterans guiding you.',
      icon: faChalkboardTeacher,
      colorClass: 'text-blue-500 bg-blue-500/10',
    },
  ];

  return (
    <section className="w-full bg-slate-900 border-t border-slate-800 px-6 py-16 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-base text-slate-400">
            We are dedicated to building a high-quality global classroom. Here is what we have accomplished together so far.
          </p>
        </div>

        {/* Achievement Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="relative group bg-slate-800/50 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-slate-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl ${item.colorClass}`}>
                <FontAwesomeIcon icon={item.icon} />
              </div>

              {/* Metric Counter String */}
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                {item.metric}
              </span>

              {/* Label */}
              <h3 className="text-sm font-semibold text-slate-200 mb-2">
                {item.label}
              </h3>

              {/* Brief Description */}
              <p className="text-xs text-slate-400 max-w-[200px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden px-6 py-12 md:px-12 lg:px-24">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

        {/* Left Content Side */}
        <div className="flex flex-col space-y-6 text-center lg:text-left order-2 lg:order-1">
          {/* Small Badge */}
          <div className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 w-max mx-auto lg:mx-0">
            <FontAwesomeIcon icon={faAward} className="text-orange-500 text-sm" />
            <span className="text-xs font-medium text-slate-300">Join Over 50,000+ Active Learners</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Master the Future with{' '}
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent block sm:inline">
              SkillGrid
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Unlock your potential with expert-led online courses. Gain real-world skills, earn certified credentials, and connect with a global community built to launch your dream career.
          </p>

          <div className="pt-2">
            <button className="group inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-pink-500/20 transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto">
              Find More
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
          </div>
        </div>

        {/* Right Visual Side */}
        <div className="relative flex justify-center items-center order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none">
          {/* Main Visual Container */}
          <div className="relative w-full aspect-square max-w-[450px] rounded-3xl bg-gradient-to-tr from-pink-500/20 to-orange-500/20 p-1 backdrop-blur-sm">
            <img
              src="https://unsplash.com"
              alt="Students learning and working together"
              className="w-full h-full object-cover rounded-[22px] shadow-2xl"
            />
          </div>

          {/* Floating Card 1: Top Left */}
          <div className="absolute -top-4 -left-4 sm:-left-8 bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-xl flex items-center space-x-3 animate-bounce [animation-duration:3.5s]">
            <div className="w-10 h-10 rounded-xl bg-pink-500 flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faGraduationCap} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Expert Instructors</p>
              <p className="text-sm font-bold text-white">Learn From Pros</p>
            </div>
          </div>

          {/* Floating Card 2: Bottom Right */}
          <div className="absolute -bottom-4 -right-4 sm:-right-8 bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-xl flex items-center space-x-3 animate-bounce [animation-duration:4.5s]">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Interactive Content</p>
              <div className="flex items-center space-x-1">
                <p className="text-sm font-bold text-white">300+ Courses</p>
                <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-400 text-xs ml-1" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

interface FeatureType {
  icon: IconProp,
  title: string | null,
  description: string | null,
  IconColor: string | null,
  IconBgColor: string | null,
};

const FeatureCard = (data: FeatureType) => {
  let { icon, title, description, IconColor, IconBgColor } = data;
  if (!IconColor) IconColor = 'text-blue-500';
  if (!IconBgColor) IconBgColor = 'bg-blue-500/40';

  return (

    <div className='md:w-80 w-full bg-slate-800/50 px-4 py-12 flex flex-col 
          items-center text-center rounded-lg shadow-md gap-2
          border border-gray-400/50 hover:shadow-2xl hover:-translate-y-1 
      transition-all duration-300 ease-initial hover:border-gray-400'>
      <div className={`px-4 py-4 rounded-lg ${IconBgColor ? IconBgColor : 'bg-blue-500/40'}`}>
        <FontAwesomeIcon icon={icon}
          className={`${IconColor ? IconColor : 'bg-blue-500'} text-4xl`}
        />
      </div>

      <div className='text-white font-semibold w-fit
            '>{title}</div>

      <div className='text-gray-400'>
        {description}
      </div>
    </div >
  )
}

const Features = () => {

  return (
    <section className='w-full bg-slate-900 py-20 flex flex-col 
      items-center text-center border-t border-t-gray-400/50'>
      <div>
        <h1 className='text-white text-3xl font-bold'>Why Choose
          <span className='text-pink-500 ml-2'>SkillGrid?</span>
        </h1>
        <span className='text-gray-400 mt-4 text-base max-w-120 inline-block'>
          Everything you need to break into tech, master a language, or accelerate your corporate career.
        </span>
      </div>

      <div className='grid px-8 gap-4 mt-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
        <FeatureCard
          icon={faBriefcase}
          title={'Industry-Vetted Syllabus'}
          description={'Learn only what top companies are actively hiring for. No fluff, just real-world curriculum.'}
          IconBgColor={'bg-blue-500/40'}
          IconColor={'text-blue-500'}
        />
        <FeatureCard icon={faAward}
          title='Verified Certified'
          description='Earn official, shareable digital credentials that you can instantly add to your LinkedIn profile.'
          IconColor={'text-pink-400'}
          IconBgColor={'bg-pink-400/40'}
        />
        <FeatureCard
          icon={faInfinity}
          title={'Flexible, Self-Paced'}
          description={'Balance your career and life. Access standard video modules anytime, anywhere, on any device.'}
          IconColor={'text-orange-400'}
          IconBgColor={'bg-orange-400/40'}
        />
      </div>
    </section>
  )
}

interface TestamonialType {
  name: string,
  reviewText: string | null,
  rating: number,
  role: string,
  courseTag: string | null,
  avatarUrl: string,
}

function TestimonialCard(data: TestamonialType): React.JSX.Element {
  const {
    name = 'Anonymous Student',
    role = 'Learner',
    avatarUrl = 'https://unsplash.com',
    courseTag = 'General Course',
    rating = 5,
    reviewText = 'No review text provided.'
  } = data;

  return (
    <div className="relative bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-slate-600 hover:-translate-y-1 hover:shadow-xl w-full">

      {/* Decorative Quote Icon Overlay */}
      <div className="absolute top-6 right-6 text-slate-700/40 text-3xl pointer-events-none">
        <FontAwesomeIcon icon={faQuoteRight} />
      </div>

      <div>
        {/* Dynamic Star Rating Loop */}

        <div className="flex items-center space-x-1 mb-4 text-amber-400 text-sm">
          {Array.from({ length: Math.min(5, Math.max(0, rating)) }).map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} />
          ))}
        </div>

        {/* Testimonial Review Body */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic mb-6">
          "{reviewText}"
        </p>
      </div>

      {/* Student Profile Info Footer */}
      <div className="flex items-center space-x-4 border-t border-slate-700/50 pt-4 mt-auto">
        <img
          src={avatarUrl}
          alt={`${name} avatar`}
          className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-white truncate">
            {name}
          </span>
          <span className="text-xs text-slate-400 truncate mb-1">
            {role}
          </span>
          <span className="inline-block text-[10px] font-semibold tracking-wider text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-md w-max">
            {courseTag}
          </span>
        </div>
      </div>

    </div>
  );
}

const Testamonials = () => {

  return (
    <section className='py-20 border-t border-t-gray-400/50 
      bg-slate-900 flex flex-col items-center px-8 gap-8'>
      <h1 className='text-4xl text-white font-bold'>Testamonials</h1>
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:max-w-[80%]'>
        <TestimonialCard
          name='James Taylor'
          role='Data Analyst at Deloitte'
          rating={4}
          reviewText={'The flexibility of this platform allowed me to learn advanced data modeling while working a grueling full-time job. The interactive sandbox coding environments meant I didn\'t have to waste hours setting up my local machine. My new automation skills led directly to a 20% promotion.'}
          avatarUrl={ProfileImg}
          courseTag={'Python for Machine Learning'}
        />
        <TestimonialCard
          name='James Taylor'
          role='Data Analyst at Deloitte'
          rating={4}
          reviewText={'The flexibility of this platform allowed me to learn advanced data modeling while working a grueling full-time job. The interactive sandbox coding environments meant I didn\'t have to waste hours setting up my local machine. My new automation skills led directly to a 20% promotion.'}
          avatarUrl={ProfileImg}
          courseTag={'Python for Machine Learning'}
        />
        <TestimonialCard
          name='James Taylor'
          role='Data Analyst at Deloitte'
          rating={4}
          reviewText={'The flexibility of this platform allowed me to learn advanced data modeling while working a grueling full-time job. The interactive sandbox coding environments meant I didn\'t have to waste hours setting up my local machine. My new automation skills led directly to a 20% promotion.'}
          avatarUrl={ProfileImg}
          courseTag={'Python for Machine Learning'}
        />
      </div>
    </section>
  )
}

const Home = () => {
  return (
    <div className=" w-full bg-green-500 
      ">
      <HeroSection />
      <AchievementSection />
      <CoursesSection />
      <Features />
      <Testamonials />
    </div>
  )
}

export default Home
