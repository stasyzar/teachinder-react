import TeacherCard from "./TeacherCard";
import { teachersData } from "../data/teachers";

function FavoritesCarousel() {
    const favoriteIds = [1, 7, 4, 5, 3];
    const favorites = favoriteIds.map(id => teachersData.find(t => t.id === id)).filter(Boolean);

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