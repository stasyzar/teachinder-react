import Filters from "./Filters";
import TeacherCard from "./TeacherCard";
import { teachersData } from "../data/teachers";

function TopTeachers() {
    return (
        <section id="teachers">
            <hr className="divider"></hr>
            <h2 className="section-title">Top Teachers</h2>
            <Filters />
            <div className="teacher-grid">
                {
                    teachersData.map(teacher => (
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