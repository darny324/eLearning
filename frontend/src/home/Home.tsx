import Header from "./Header"
import Content from "./Content"
import Footer from "./Footer"

const Home = () => {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-600 text-black dark:text-white">
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
  )
}

export default Home 
