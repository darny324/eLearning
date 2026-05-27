import StudyingImg from '../assets/studying.jpeg'
import ComputerImg from '../assets/computer.png'
import ProfileImg from '../assets/profile.png'

const Intro = () => {
  return (
    <div className='
      flex flex-col md:flex-row md:justify-between gap-4 
      md:items-center
      '>
      <div>
        <img
          className='
          rounded-md w-xs md:w-xl lg:w-2xl 
          '
          src={StudyingImg} />
      </div>
      <div className='flex flex-col items-center md:items-start'>
        <h2 className='
          text-xl md:text-2xl lg:text-3xl 
          '>
          Welcome to <span className='text-pink-600'>Skillgrid</span>
        </h2>
        <span className='text-gray-400'>
          A modern and unique approach to learning
        </span>
      </div>
    </div >
  )
}

const CategoryCard = () => {
  return (
    <div className='shadow-lg py-4 w-75 rounded-md px-8 flex-col flex gap-4' >
      <div className='w-full flex justify-center shadow-sm py-4 rounded-lg bg-gray-200'>
        <img
          src={ComputerImg}
          className='w-25'
        />
      </div>
      <div className='w-full flex flex-col items-center'>
        <h3 className='text-xl font-semibold'>Computing</h3>
        <span className='
          text-gray-300 
          '>Learn computer science, networking, cybersecurity, system administration</span>
      </div>
      <div>
        <button
          className='
          transition transform hover:scale-110 active:scale-95 active:bg-pink-500 
          rounded-3xl bg-pink-400 px-10 py-2 text-white 
          '
        >Explore</button>
      </div>
    </div>
  )
}

const Category = () => {

  return (
    <div className='max-w-6xl mt-8'>
      <h2 className='text-2xl font-bold mb-4 w-full text-center'>
        Category
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  )
}

const TeacherCard = () => {
  return (
    <div className='w-75 flex flex-col items-center gap-2'>
      <div>
        <img
          src={ProfileImg}
          className='w-37.5 rounded-full' />
      </div>
      <div className='w-full flex flex-col items-center gap- text-gray-400'>
        <span className='font-semibold text-lg dark:text-white text-black'>James Taylor</span>
        <span>james@gmail.com</span>
        <span>293829231</span>
        <span>Computer science, Language</span>
      </div>
    </div>
  )
}

const Teacher = () => {

  return (
    <div className='max-w-6xl mt-12'>
      <h2 className='text-2xl font-bold mb-4 w-full text-center'>
        Our Most Active Teachers
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
      </div>
    </div>
  )
}

const Content = () => {
  return (
    <div className='
      max-w-8xl flex flex-col 
      items-center py-24 dark:bg-gray-600 bg-white
      '>
      <Intro />
      <Category />
      <Teacher />
    </div>
  )
}

export default Content
