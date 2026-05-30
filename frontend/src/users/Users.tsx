import { faAngleDown, faAngleUp, faFilter, faGreaterThan, faSearch, faTurnDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Badge } from "flowbite-react"
import { useState } from "react"
import ProfileImg from '../assets/profile.png'
import { Link } from "react-router"


interface UserType {
  username: string,
  email: string,
  type: 'student' | 'teacher',
  specializations: string[],
  img_url: string,
}

const UserCard = (user: UserType) => {

  return (
    <div className="flex justify-start hover:bg-gray-200 dark:hover:bg-gray-700 px-4 rounded-md 
      dark:border-b-gray-700
      items-center gap-4 py-4 border-b border-b-gray-300 ">
      <div>
        <img src={user.img_url} className="w-16 rounded-full" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="flex justify-start items-center gap-2">
          <span className="font-semibold">{user.username}</span>
          <Badge color="green">{user.type}</Badge>
        </span>
        <span className="text-gray-500 text-xs">{user.email}</span>
        <span className="flex gap-2">{
          user.specializations.map((s) => <Badge className="text-xs" color="pink">{s}</Badge>)
        }</span>

      </div>
    </div>
  )
}

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [interest, setInterest] = useState<string>('any interest');
  const [specialization, setSpecialization] = useState<string>('any specialization');
  const [ageRange, setAgeRange] = useState<string>('any age range');
  const [sortBy, setSortBy] = useState<string>('name');
  return (
    <div className="px-4 py-2 border border-gray-200 dark:border-gray-700 
      rounded-md shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-200 w-fit text-slate-500 rounded-lg
        hover:scale-105 transition duration-300 dark:bg-gray-700 
        dark:text-slate-300
        flex items-center gap-1 hover:bg-gray-10 
        ">
        <FontAwesomeIcon icon={faFilter} />
        <span> {isOpen ? 'Hide Filters' : 'Show Filters'}</span>
        {isOpen ? <FontAwesomeIcon icon={faAngleUp} /> :
          <FontAwesomeIcon icon={faAngleDown} />
        }
      </button>

      {
        isOpen && <div className="mt-4 py-4 border-t border-t-gray-300
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-4 dark:text-slate-200 
          ">
          <div className="flex flex-col gap-1">
            <label className="text-slate-500">SORT BY</label>
            <select
              name="sortBy"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
              }}
              className="pl-4 rounded-md py-1 bg-gray-200 dark:bg-gray-700">
              <option>name</option>
              <option>age</option>
              <option>experience</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-500">Interest</label>
            <select
              value={interest}
              onChange={(e) => {
                setInterest(e.target.value);
              }}
              className="pl-4 rounded-md py-1 bg-gray-200">
              <option>any interest</option>
              <option>Web Development</option>
              <option>Graphic Design</option>
              <option>Maths</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-500">Specialization</label>
            <select
              value={specialization}
              onChange={(e) => {
                setSpecialization(e.target.value);
              }}
              className="pl-4 rounded-md py-1 bg-gray-200">
              <option>any specialization</option>
              <option>Physics</option>
              <option>Mathematics</option>
              <option>Software Engineering</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-500">Age Range</label>
            <select
              value={ageRange}
              onChange={(e) => {
                setAgeRange(e.target.value);
              }}
              className="pl-4 rounded-md py-1 bg-gray-200">
              <option>any age range</option>
              <option>13-18</option>
              <option>18-30</option>
              <option>30-45</option>
              <option>45+</option>
            </select>
          </div>
        </div>
      }
    </div>
  )
}

const Users = () => {
  return (
    <div className="md:ml-64 w-full flex justify-center py-4 bg-white dark:bg-black">
      <div className="xl:w-[50%] w-[80%] flex flex-col items-center">
        <header className="flex gap-4 items-center w-full">
          <div>
            <Link to={'/navigation/dashboard'} className="text-pink-400">Skillgrid</Link>
          </div>
          <div className="bg-gray-200 flex w-full items-center 
            rounded-lg px-3 dark:bg-gray-700 ">
            <input className="py-1 outline-none w-full text-lg" />
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </header>
        <div className="w-full mt-4">
          <Filter />
        </div>
        <div className="w-full py-4">
          <UserCard
            username="Jonny Stone"
            type="student"
            specializations={['web development', 'graphic designs']}
            email="jonny@gmail.com"
            img_url={ProfileImg}
          />
          <UserCard
            username="Jonny Stone"
            type="student"
            specializations={['web development', 'graphic designs']}
            email="jonny@gmail.com"
            img_url={ProfileImg}
          />
          <UserCard
            username="Jonny Stone"
            type="student"
            specializations={['web development', 'graphic designs']}
            email="jonny@gmail.com"
            img_url={ProfileImg}
          />
          <UserCard
            username="Jonny Stone"
            type="student"
            specializations={['web development', 'graphic designs']}
            email="jonny@gmail.com"
            img_url={ProfileImg}
          />
          <UserCard
            username="Jonny Stone"
            type="student"
            specializations={['web development', 'graphic designs']}
            email="jonny@gmail.com"
            img_url={ProfileImg}
          />
          <UserCard
            username="Jonny Stone"
            type="student"
            specializations={['web development', 'graphic designs']}
            email="jonny@gmail.com"
            img_url={ProfileImg}
          />
          <UserCard
            username="Jonny Stone"
            type="student"
            specializations={['web development', 'graphic designs']}
            email="jonny@gmail.com"
            img_url={ProfileImg}
          />
          <UserCard
            username="Jonny Stone"
            type="student"
            specializations={['web development', 'graphic designs']}
            email="jonny@gmail.com"
            img_url={ProfileImg}
          />
        </div>
      </div>
    </div>
  )
}

export default Users
