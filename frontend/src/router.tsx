import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./home/Home.tsx";
import Navigation from "./navigation/Navigation.tsx";
import DashBoard from "./dashboard/DashBoard.tsx";
import Courses from "./courses/Courses.tsx";
import Users from "./users/Users.tsx";
import Chats from "./chats/Chats.tsx";
import DirectChat from "./chats/DirectChat.tsx";


const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      }, {
        path: '/home',
        Component: Home,
      }, {
        path: '/:userId',
        Component: Navigation,
        children: [
          {
            index: true,
            Component: DashBoard,
          },
          {
            path: 'dashboard',
            Component: DashBoard,
          }, {
            path: 'courses',
            Component: Courses,
          }, {
            path: 'users',
            Component: Users,
          }, {
            path: 'chats',
            Component: Chats,
          }, {
            path: 'chats/:chatId',
            Component: DirectChat,
          }
        ]
      }
    ]
  }
]);

export default router; 
