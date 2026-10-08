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

    return (
        <section id="teachers">
            <hr className="divider"></hr>
            <h2 className="section-title">Top Teachers</h2>
            <Filters
                teachers={teachers}
                filters={filters}
                onFilterChange={handleFilterChange}
            />
            <div className="teacher-grid">
                {
                    filteredTeachers.map(teacher => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                            onSelect={() => onSelectTeacher(teacher)}
                        />
                    ))
                }
            </div>
            <hr className="divider" />
        </section>
    );
}

export default TopTeachers;