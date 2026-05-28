import './App.css'
import { Outlet, useLocation } from 'react-router';



function App() {

  return (
    <div className='bg-white dark:bg-black text-black dark:text-white'>
      <Outlet></Outlet>
    </div>
  )
}

export default App
