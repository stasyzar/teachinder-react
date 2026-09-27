import Footer from "./components/Footer";
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import TopTeachers from "./components/TopTeachers";

function App() {
  return (
    <div className="page">
      <Header/>
      <Navbar />
      <main>
        <TopTeachers />
      </main>
    <Footer/>
    </div>
  )
}

export default App;