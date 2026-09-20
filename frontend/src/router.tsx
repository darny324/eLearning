import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./home/Home.tsx";
import SignUp from "./Authetication/SignUp.tsx";
import Login from "./Authetication/Login.tsx";
import Courses from "./Courses/Courses.tsx";
import Course from "./Courses/Course.tsx";
import { Dashboard } from "./User/Dashboard.tsx";
import YourCourse from "./User/YourCourse.tsx";
import Module from "./Module/Module.tsx";
import Account from "./User/Account.tsx";
import AboutUsPage from "./Information/AboutUsPage.tsx";
import ContactUsPage from "./Information/ContactUsPage.tsx";

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
      }, {
        path: 'about-us', 
        Component: AboutUsPage, 
      }, {
        path: 'contact-us', 
        Component: ContactUsPage,
      }
    ]
  }, {
    path: 'sign-up',
    Component: SignUp,
  }, {
    path: 'login',
    Component: Login,
  }, {
    path: '/account', 
    Component: Account,
    children: [
      {
        index: true, 
        Component: Dashboard,
      }, {
        path: 'dashboard', 
        Component: Dashboard,
      }, {
        path: 'dashboard/course/:courseId', 
        Component: YourCourse, 
      }, {
        path: 'dashboard/course/:courseId/module/:moduleId',
        Component: Module
      }
    ]
  }, 
]);

export default router; 
