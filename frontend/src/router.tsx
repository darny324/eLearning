import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./home/Home.tsx";
import Navigation from "./navigation/Navigation.tsx";
import DashBoard from "./dashboard/DashBoard.tsx";


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
        path: '/dashboard',
        Component: Navigation,
        children: [
          {
            index: true,
            Component: DashBoard,
          }
        ]
      }
    ]
  }
]);

export default router; 
