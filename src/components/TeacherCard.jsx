function TeacherCard({ teacher, showStar = true, showSpeciality = true, onSelect }) {
    const { full_name, course, country, picture_large, picture_thumbnail, favorite } = teacher;

    const nameParts = full_name ? full_name.split(" ") : ["", ""];
    const firstName = nameParts[0] || "";
    const lastName = nameParts[1] || "";
    const initials = firstName && lastName ? `${firstName[0]}.${lastName[0]}` : "";
    const avatar = picture_large || picture_thumbnail;

    return (
        <div className="teacher-card" onClick={onSelect}>
            <div className="avatar-wrap">
                <div className="avatar-circle">
                    {avatar ? (
                        <img src={avatar} alt={`${firstName} ${lastName}`} className="avatar" />
                    ) : (
                        <div className="initials">{initials}</div>
                    )}
                </div>
                {showStar && favorite && <span className="star">★</span>}
            </div>
            <h3>
                {firstName}
                <br />
                {lastName}
            </h3>
            {showSpeciality && course && <div className="speciality">{course}</div>}
            <div className="country">{country}</div>
        </div>
    );
}

export default TeacherCard;