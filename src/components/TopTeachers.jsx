import Filters from "./Filters";
import { useState } from "react";
import TeacherCard from "./TeacherCard";

function TopTeachers({ onSelectTeacher, filters, onFilterChange, teachers = [], filteredTeachers }) {

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
                onFilterChange={onFilterChange}
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