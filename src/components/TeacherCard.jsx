function TeacherCard({ teacher }) {
    const { firstName, lastName, speciality, country, avatar, initials, isFavorite } = teacher;

    return (
        <div className="teacher-card">
            <div className="avatar-wrap">
                <div className="avatar-circle">
                    {avatar ? (
                        <img src={avatar} alt={`${firstName} ${lastName}`} className="avatar" />
                    ) : (
                        <div className="initials">{initials}</div>
                    )}
                </div>
                {isFavorite && <span className="star">★</span>}
            </div>
            <h3>
                {firstName}
                <br />
                {lastName}
            </h3>
            {speciality && <div className="speciality">{speciality}</div>}
            <div className="country">{country}</div>
        </div>
    );
}

export default TeacherCard;