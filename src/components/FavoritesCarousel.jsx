import TeacherCard from "./TeacherCard";

function FavoritesCarousel({ teachers = [], onSelectTeacher }) {
    const favorites = teachers.filter(teacher => teacher.favorite);

    const handleTrackClick = (e) => {
        const card = e.target.closest(".teacher-card");
        if (!card) return;
        const teacherId = card.dataset.id;
        const selected = teachers.find((t) => String(t.id) === String(teacherId));
        if (selected && onSelectTeacher) {
            onSelectTeacher(selected);
        }
    };

    return (
        <section id="favorites">
            <h2 className="section-title">Favorites</h2>
            <div className="carousel">
                <button className="carousel-arrow" aria-label="Previous">‹</button>
                <div className="carousel-track" onClick={handleTrackClick}>
                    {favorites.map(teacher => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                            showStar={false}
                            showSpeciality={false}
                        />
                    ))}
                </div>
                <button className="carousel-arrow" aria-label="Next">›</button>
            </div>
            <hr className="divider" />
        </section>
    );
}

export default FavoritesCarousel;