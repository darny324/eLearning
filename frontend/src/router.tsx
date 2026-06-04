import { createBrowserRouter } from "react-router";
import App from "./App";

// this is for loaders 

const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [],
  }
]);

export default router; 
