import TeacherCard from "./TeacherCard";

function FavoritesCarousel({teachers = [], onSelectTeacher }) {
    const favorites = teachers.filter(teacher => teacher.favorite);
    
    return (
        <section id="favorites">
            <h2 className="section-title">Favorites</h2>
            <div className="carousel">
                <button className="carousel-arrow" aria-label="Previous">‹</button>
                <div className="carousel-track">
                    {favorites.map(teacher => (
                        <TeacherCard
                            key={teacher.id}
                            teacher={teacher}
                            showStar={false}
                            showSpeciality={false}
                            onSelect={() => onSelectTeacher && onSelectTeacher(teacher)}
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