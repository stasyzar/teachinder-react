function TeacherInfoModal({ teacher, onClose, onToggleFavorite }) {
  if (!teacher) return null;

  const {
    id,
    full_name,
    course,
    country,
    city,
    picture_large,
    picture_thumbnail,
    favorite,
    email,
    phone,
    gender,
    age,
    note,
    coordinates,
  } = teacher;

  const nameParts = full_name ? full_name.split(" ") : ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts[1] || "";
  const initials = firstName && lastName ? `${firstName[0]}.${lastName[0]}` : "";
  const avatar = picture_large || picture_thumbnail;
  const description = note || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab autem consectetur culpa cumque, distinctio dolor dolore dolorem doloremque ea explicabo facilis nam nesciunt nisi pariatur perspiciatis porro quis similique temporibus veniam veritatis? A ab ad, aliquam amet consequatur cupiditate debitis deserunt doloribus dolorum earum eius eos minus nostrum odit omnis perferendis...";
  const lat = coordinates?.latitude;
  const lng = coordinates?.longitude;
  const mapUrl = (lat && lng)
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : `https://www.google.com/maps?q=${encodeURIComponent(`${city || ""}, ${country}`)}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-teacher-info" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Teacher Info</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="teacher-info-top">
            {avatar ? (
              <img src={avatar} alt={`${firstName} ${lastName}`} className="info-photo" />
            ) : (
              <div className="info-photo initials-photo">{initials}</div>
            )}

            <div className="info-meta">
              <span
                className="info-star"
                onClick={() => onToggleFavorite(id)}
                style={{ cursor: "pointer" }}
              >
                {favorite ? "★" : "☆"}
              </span>
              <h2 className="info-name">{`${firstName} ${lastName}`}</h2>
              <h4 className="info-speciality">{course}</h4>
              <p className="info-location">{city ? `${city}, ` : ""}{country}</p>
              <p className="info-age-gender">{`${age}, ${gender}`}</p>
              <p className="info-email">
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p className="info-phone">{phone}</p>
            </div>
          </div>

          <p className="info-description">
            {description}
          </p>

          <a href={mapUrl} className="toggle-map-link" target="_blank" rel="noopener noreferrer">
            toggle map
          </a>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfoModal;