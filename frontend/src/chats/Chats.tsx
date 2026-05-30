import { Outlet, useNavigate } from "react-router"
import Icon from '../assets/react.svg'
import ProfileImg from '../assets/profile2.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleDot, faDotCircle, faHandDots, faSearch } from "@fortawesome/free-solid-svg-icons"
import { Badge } from "flowbite-react"
import DirectChat from "./DirectChat"



const ChatList = () => {

  const users = [
    {
      name: 'James Taylor',
      img_url: ProfileImg,
      last_message: 'What you doing?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby? to create an education system that can generate a learning ',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    }, {
      name: 'Jonny Jones',
      img_url: ProfileImg,
      last_message: 'Hey what are your hobby?',
      message_date: new Date(),
    },
  ]

  const navigate = useNavigate();

  return (
    <div className="h-full shadow-md rounded-lg flex-1 px-4 py-4 flex
      flex-col gap-4 dark:bg-gray-900">
      <header className="flex justify-between ">
        <h2 className="text-pink-400 font-semibold text-2xl">Skillgrid</h2>
        <img src={Icon} width={24} height={24} />
      </header>

      <div className="px-4 rounded-full bg-gray-50 dark:bg-gray-700 
        shadow-md flex items-center gap-2 has-[input:focus]:shadow-lg">
        <FontAwesomeIcon icon={faSearch} />
        <input className="w-full py-4 outline-none" />
      </div>

      <ul className="mt-8 md:hidden grid grid-cols-1 px-2 gap-4 overflow-y-scroll 
        scrollbar-none">
        {
          users.map((user, i) => {
            return (

              <li
                key={user.name + i}
                onClick={() => {
                  navigate('/userId/chats/123')
                }}
                className="flex justify-start items-center gap-4 rounded-lg
          hover:bg-gray-100 dark:hover:bg-gray-800 py-4
          px-4 cursor-pointer w-full min-w-0">
                <div>
                  <img className="w-16 h-16 shrink-0 object-fit rounded-full" src={user.img_url} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl">{user.name}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-2 dark:text-gray-400">
                    <p className="truncate w-28">{user.last_message}</p>
                    <Badge className="text-center" color="blue">{user.message_date.toLocaleString('en-US', { month: 'short' })} {user.message_date.getDay()}</Badge>
                  </span>
                </div>
              </li>
            )
          })
        }
      </ul>


      <ul className="mt-8 hidden md:grid grid-cols-1 px-2 gap-4 overflow-y-scroll 
        scrollbar-none">
        {
          users.map((user) => {
            return (

              <li
                onClick={() => {
                  navigate('/userId/chats?chatId=123&userId=234')
                }}
                className="flex justify-start items-center gap-4 rounded-lg
          hover:bg-gray-100 dark:hover:bg-gray-800 py-4
          px-4 cursor-pointer">
                <div>
                  <img className="w-16 h-16 object-fit rounded-full" src={user.img_url} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-xl">{user.name}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-2 dark:text-gray-400">
                    <p className="max-w-52 truncate">{user.last_message}</p>
                    <Badge color="blue">{user.message_date.toLocaleString('en-US', { month: 'short' })} {user.message_date.getDay()}</Badge>
                  </span>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

const Chats = () => {
  return (
    <div className="h-screen md:ml-64 py-8 px-8 gap-8 flex w-full">
      <ChatList />
      <div className="flex-2 hidden md:flex">
        <DirectChat />
      </div>
    </div>
  )
}

export default Chats
