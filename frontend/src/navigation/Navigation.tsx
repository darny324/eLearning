import { faBlackboard, faDashboard, faMessage, faUserGroup, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink, Outlet } from "react-router"




const Navigation = () => {

  return (
    <div className="w-full bg-white text-black dark:bg-black dark:text-white flex flex-row">

      <div className="md:flex hidden flex-col w-64 h-screen px-4 py-8 dark:border-r 
        dark:border-gray-600 fixed shadow-md
        ">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Brand</h2>

        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </span>

          <input type="text" className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search" />
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <NavLink to={'/navigation/dashboard'}

              className="flex items-center px-4 py-2 text-gray-700 rounded-md dark:text-gray-200"
              style={({ isActive }) => {
                if (isActive) {
                  return {
                    color: 'white',
                    backgroundColor: 'oklch(62.3% 0.214 259.815)',
                  }
                } else {
                  return {}
                }
              }}
            >
              <FontAwesomeIcon icon={faDashboard} />
              <span className="mx-4 font-medium">Dashboard</span>
            </NavLink>

            <NavLink to={'/navigation/courses'}
              className="flex items-center px-4 py-2 mt-5 text-gray-600 
              transition-colors duration-200 transform rounded-md 
              dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 
              dark:hover:text-gray-200 hover:text-gray-700"

              style={({ isActive }) => {
                if (isActive) {
                  return {
                    color: 'white',
                    backgroundColor: 'oklch(62.3% 0.214 259.815)',
                  }
                } else {
                  return {}
                }
              }}
            >
              <FontAwesomeIcon icon={faBlackboard} />
              <span className="mx-4 font-medium">Courses</span>
            </NavLink>

            <NavLink to={'/navigation/chats'} className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"

              style={({ isActive }) => {
                if (isActive) {
                  return {
                    color: 'white',
                    backgroundColor: 'oklch(62.3% 0.214 259.815)',
                  }
                } else {
                  return {}
                }
              }}
            >
              <FontAwesomeIcon icon={faMessage} />
              <span className="mx-4 font-medium">Chats</span>
            </NavLink>

            <NavLink to={'/chat'} className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"

              style={({ isActive }) => {
                if (isActive) {
                  return {
                    color: 'white',
                    backgroundColor: 'oklch(62.3% 0.214 259.815)',
                  }
                } else {
                  return {}
                }
              }}
            >
              <FontAwesomeIcon icon={faUsers} />
              <span className="mx-4 font-medium">Groups</span>
            </NavLink>

            <NavLink to={'/navigation/users'} className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"

              style={({ isActive }) => {
                if (isActive) {
                  return {
                    color: 'white',
                    backgroundColor: 'oklch(62.3% 0.214 259.815)',
                  }
                } else {
                  return {}
                }
              }}
            >
              <FontAwesomeIcon icon={faUserGroup} />
              <span className="mx-4 font-medium">Users</span>
            </NavLink>


          </nav>

          <div className="flex items-center px-4 -mx-2">
            <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
            <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">John Doe</h4>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default Navigation
