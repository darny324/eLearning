import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./home/Home.tsx";
import SignUp from "./Authetication/SignUp.tsx";
import Login from "./Authetication/Login.tsx";
import Courses from "./Courses/Courses.tsx";
import Course from "./Courses/Course.tsx";

// this is for loaders 

const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'home',
        Component: Home,
      }, {
        path: 'courses', 
        Component: Courses, 
      }, {
        path: 'course/:id', 
        Component: Course
      }
    ]
  }, {
    path: 'sign-up',
    Component: SignUp,
  }, {
    path: 'login',
    Component: Login,
  }
]);

export default router; 
