import Footer from "./components/Footer";
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import TopTeachers from "./components/TopTeachers";
import StatisticsTable from "./components/StatisticsTable";
import FavoritesCarousel from "./components/FavoritesCarousel";
import About from "./components/About";

function App() {
  return (
    <div className="page">
      <Header />
      <Navbar />
      <main>
        <TopTeachers />
        <StatisticsTable />
        <FavoritesCarousel />
        <About/>
      </main>
      <Footer />
    </div>
  )
}

export default App;