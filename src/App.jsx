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
import { validateTeacher, formatTeachers, findTeacher } from "./services/teacherService.js";
import { randomUserMock, additionalUsers } from "./data/FE4U-Lab2-mock.js";

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState(() => {
    return formatTeachers(randomUserMock, additionalUsers).filter((teacher) => validateTeacher(teacher));
  });

  const handleToggleFavorite = (teacherId) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((t) =>
        t.id === teacherId ? { ...t, favorite: !t.favorite } : t
      )
    );
    setSelectedTeacher((prev) =>
      prev && prev.id === teacherId ? { ...prev, favorite: !prev.favorite } : prev
    );
  };

  const handleSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const found = findTeacher(teachers, trimmed);
    if (found) {
      setSelectedTeacher(found);
    } else {
      alert("Teacher not found!");
    }
  };

  return (
    <div className="page">
      <Header onSearch={handleSearch} />
      <Navbar onOpenAddTeacher={() => setIsAddModalOpen(true)} />
      <main>
        <TopTeachers onSelectTeacher={setSelectedTeacher} teachers={teachers} />
        <StatisticsTable teachers={teachers} />
        <FavoritesCarousel
          teachers={teachers}
          onSelectTeacher={setSelectedTeacher}
        />
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
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  )
}

export default App;