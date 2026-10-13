import Filters from "./Filters";
import { useState } from "react";
import TeacherCard from "./TeacherCard";
import { filterTeachers } from "../services/teacherService.js";

function TopTeachers({ onSelectTeacher, teachers = [] }) {

    const [filters, setFilters] = useState({
        age: "All",
        country: "All",
        gender: "All",
        hasPhoto: false,
        favorite: false,
    });

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const filteredTeachers = filterTeachers(teachers, filters);

    const handleGridClick = (e) => {
        const card = e.target.closest(".teacher-card");
        if (!card) return;
        const teacherId = card.dataset.id;
        const selected = teachers.find((t) => String(t.id) === String(teacherId));
        if (selected && onSelectTeacher) {
            onSelectTeacher(selected);
        }
    };

    return (
        <section id="teachers">
            <hr className="divider"></hr>
            <h2 className="section-title">Top Teachers</h2>
            <Filters
                teachers={teachers}
                filters={filters}
                onFilterChange={handleFilterChange}
            />
            <div className="teacher-grid" onClick={handleGridClick}>
                {
                    filteredTeachers.slice(0, 15).map(teacher => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                        />
                    ))
                }
            </div>
            <hr className="divider" />
        </section>
    );
}

export default TopTeachers;