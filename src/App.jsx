import { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TopTeachers from "./components/TopTeachers";
import StatisticsTable from "./components/StatisticsTable";
import FavoritesCarousel from "./components/FavoritesCarousel";
import About from "./components/About";
import Footer from "./components/Footer";
import AddTeacherModal from "./components/AddTeacherModal";
import TeacherInfoModal from "./components/TeacherInfoModal";
import { validateTeacher, formatTeachers, findTeacher, filterTeachers } from "./services/teacherService.js";

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [filters, setFilters] = useState({
    age: "All",
    country: "All",
    gender: "All",
    hasPhoto: false,
    favorite: false,
  });

  useEffect(() => {
    fetch("https://randomuser.me/api/?page=1&results=30&seed=teachinder")
      .then((response) => response.json())
      .then((data) => {
        const normalized = formatTeachers(data.results, []);
        setTeachers(normalized);
      })
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

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

  const handleAddTeacher = (newTeacher) => {
    setTeachers((prevTeachers) => [newTeacher, ...prevTeachers]);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleLoadMore = () => {
    setIsLoadingMore(true);
    const nextPage = Math.floor(teachers.length / 15) + 1;
    fetch(`https://randomuser.me/api/?page=${nextPage}&results=15&seed=teachinder`)
      .then((response) => response.json())
      .then((data) => {
        const newTeachers = formatTeachers(data.results, []);
        setTeachers((prev) => [...prev, ...newTeachers]);
      })
      .catch((error) => console.error("Error loading more teachers:", error))
      .finally(() => {
        setIsLoadingMore(false);
      });
  };

  let filteredTeachers = filterTeachers(teachers, filters);

  return (
    <div className="page">
      <Header onSearch={handleSearch} />
      <Navbar onOpenAddTeacher={() => setIsAddModalOpen(true)} />
      <main>
        <TopTeachers onSelectTeacher={setSelectedTeacher} filters={filters}
          onFilterChange={handleFilterChange} teachers={teachers} filteredTeachers={filteredTeachers} onLoadMore={handleLoadMore} isLoadingMore={isLoadingMore} />
        <StatisticsTable teachers={filteredTeachers} />
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
        onAddTeacher={handleAddTeacher}
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