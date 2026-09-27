function TeacherInfoModal({ teacher, onClose }) {
  if (!teacher) return null;

  const {
    firstName,
    lastName,
    speciality,
    country,
    city = "Kyiv",
    avatar,
    initials,
    isFavorite,
    email = `${firstName.toLowerCase()}_${lastName.toLowerCase()}@domain.com`,
    phone = "+380964993252",
  } = teacher;

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
              <span className="info-star">{isFavorite ? "★" : "☆"}</span>
              <h2 className="info-name">{`${firstName} ${lastName}`}</h2>
              <h4 className="info-speciality">{speciality}</h4>
              <p className="info-location">{city ? `${city}, ` : ""}{country}</p>
              <p className="info-age-gender">35, Male</p>
              <p className="info-email">
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p className="info-phone">{phone}</p>
            </div>
          </div>

          <p className="info-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab autem consectetur culpa cumque, distinctio
            dolor dolore dolorem doloremque ea explicabo facilis nam nesciunt nisi pariatur perspiciatis porro quis
            similique temporibus veniam veritatis? A ab ad, aliquam amet consequatur cupiditate debitis deserunt
            doloribus dolorum earum eius eos minus nostrum odit omnis perferendis...
          </p>

          <a href="#" className="toggle-map-link" onClick={(e) => e.preventDefault()}>
            toggle map
          </a>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfoModal;