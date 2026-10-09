import { useState } from "react";
import { sortTeachers } from "../services/teacherService.js";

function StatisticsTable({ teachers = [] }) {

    const [sortBy, setSortBy] = useState("full_name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 10;

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
        setCurrentPage(1);
    };

    const sortedTeachers = sortTeachers(teachers, sortBy, sortOrder);
    const totalPages = Math.ceil(sortedTeachers.length / PAGE_SIZE) || 1;
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const currentTeachers = sortedTeachers.slice(startIndex, startIndex + PAGE_SIZE);

    const getSortArrow = (field) => {
        if (sortBy !== field) return "";
        return sortOrder === "asc" ? " ▲" : " ▼";
    };

    return (
        <section id="statistics">
            <h2 className="section-title">Statistics</h2>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("full_name")} style={{ cursor: "pointer" }}>
                            Name{getSortArrow("full_name")}
                        </th>
                        <th onClick={() => handleSort("course")} style={{ cursor: "pointer" }}>
                            Speciality{getSortArrow("course")}
                        </th>
                        <th onClick={() => handleSort("age")} style={{ cursor: "pointer" }}>
                            Age{getSortArrow("age")}
                        </th>
                        <th onClick={() => handleSort("gender")} style={{ cursor: "pointer" }}>
                            Gender{getSortArrow("gender")}
                        </th>
                        <th onClick={() => handleSort("country")} style={{ cursor: "pointer" }}>
                            Nationality{getSortArrow("country")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentTeachers.map((teacher) => (
                        <tr key={teacher.id}>
                            <td>{teacher.full_name}</td>
                            <td>{teacher.course}</td>
                            <td>{teacher.age}</td>
                            <td>{teacher.gender}</td>
                            <td>{teacher.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <span
                        key={pageNum}
                        className={currentPage === pageNum ? "current" : ""}
                        onClick={() => setCurrentPage(pageNum)}
                        style={{ cursor: "pointer" }}
                    >
                        {pageNum}
                    </span>
                ))}
            </div>
            <hr className="divider" />
        </section>
    );
}
export default StatisticsTable;