import Filters from "./Filters";
import { useState, useEffect } from "react";
import TeacherCard from "./TeacherCard";

function TopTeachers({ onSelectTeacher, filters, onFilterChange, teachers = [], filteredTeachers, onLoadMore,
    isLoadingMore, }) {

    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 15;

    const totalPages = Math.ceil(filteredTeachers.length / CARDS_PER_PAGE) || 1;
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const currentCards = filteredTeachers.slice(startIndex, startIndex + CARDS_PER_PAGE);

    const handleNext = () => {
        if (currentPage >= totalPages) {
            onLoadMore();
        }
        setCurrentPage((prev) => prev + 1);
    };
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleGridClick = (e) => {
        const card = e.target.closest(".teacher-card");
        if (!card) return;
        const teacherId = card.dataset.id;
        const selected = teachers.find((t) => String(t.id) === String(teacherId));
        if (selected && onSelectTeacher) {
            onSelectTeacher(selected);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    return (
        <section id="teachers">
            <hr className="divider"></hr>
            <h2 className="section-title">Top Teachers</h2>
            <Filters
                teachers={teachers}
                filters={filters}
                onFilterChange={onFilterChange}
            />
            <div className="teacher-grid" onClick={handleGridClick}>
                {
                    currentCards.map(teacher => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                        />
                    ))
                }
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", margin: "25px 0" }}>
                <button
                    type="button"
                    className="red-button"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    Назад
                </button>
                <span>Сторінка {currentPage}</span>
                <button
                    type="button"
                    className="red-button"
                    onClick={handleNext}
                    disabled={isLoadingMore}
                >
                    {isLoadingMore ? "Loading..." : "Далі"}
                </button>
            </div>
            <hr className="divider" />
        </section>
    );
}

export default TopTeachers;