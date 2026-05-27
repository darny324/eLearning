import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./home/Home.tsx";


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
      }
    ]
  }
]);

export default router; 
