import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TopTeachers from "./components/TopTeachers";
import StatisticsTable from "./components/StatisticsTable";
import FavoritesCarousel from "./components/FavoritesCarousel";
import About from "./components/About";
import Footer from "./components/Footer";
import AddTeacherModal from "./components/AddTeacherModal";
import TeacherInfoModal from "./components/TeacherInfoModal";

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  return (
    <div className="page">
      <Header />
      <Navbar onOpenAddTeacher={() => setIsAddModalOpen(true)} />
      <main>
        <TopTeachers onSelectTeacher={setSelectedTeacher} />
        <StatisticsTable />
        <FavoritesCarousel />
        <About />
      </main>
      <Footer onOpenAddTeacher={() => setIsAddModalOpen(true)} />

      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <TeacherInfoModal
        teacher={selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />
    </div>
  )
}

export default App;