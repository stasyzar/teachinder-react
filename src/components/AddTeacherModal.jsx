function AddTeacherModal({ isOpen, onClose, onAddTeacher }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const bDate = formData.get("b_date") || form["f-dob"]?.value;
    let age = null;
    if (bDate) {
      const birthYear = new Date(bDate).getFullYear();
      const currentYear = new Date().getFullYear();
      age = currentYear - birthYear;
    }

    const newTeacher = {
      id: `teacher_${Date.now()}`,
      full_name: form["f-name"].value,
      course: form["f-speciality"].value,
      country: form["f-country"].value,
      city: form["f-city"].value || null,
      email: form["f-email"].value,
      phone: form["f-phone"].value,
      b_date: bDate,
      age: age > 0 ? age : null,
      gender: form.sex.value === "female" ? "Female" : "Male",
      bg_color: form.querySelector('input[type="color"]')?.value || "#ffffff",
      note: form["f-notes"].value || null,
      favorite: false,
      picture_large: null,
      picture_thumbnail: null,
    };

    if (onAddTeacher) {
      onAddTeacher(newTeacher);
    }

    form.reset();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add Teacher</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form id="add-teacher-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="f-name">Name</label>
              <input type="text" id="f-name" placeholder="Enter name" required />
            </div>

            <div className="field">
              <label htmlFor="f-speciality">Speciality</label>
              <select id="f-speciality">
                <option>Mathematics</option>
                <option>Chemistry</option>
                <option>Biology</option>
                <option>Physics</option>
                <option>Computer Science</option>
                <option>Chess</option>
              </select>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="f-country">Country</label>
                <select id="f-country">
                  <option>Ukraine</option>
                  <option>Poland</option>
                  <option>Belgium</option>
                  <option>Denmark</option>
                  <option>China</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-city">City</label>
                <input type="text" id="f-city" />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input type="email" id="f-email" />
              </div>
              <div className="field">
                <label htmlFor="f-phone">Phone</label>
                <input type="tel" id="f-phone" />
              </div>
            </div>

            <div className="field half-field">
              <label htmlFor="f-dob">Date of birth</label>
              <input type="date" id="f-dob" />
            </div>

            <div className="field inline-field">
              <span>Sex</span>
              <label>
                <input type="radio" name="sex" value="male" defaultChecked /> Male
              </label>
              <label>
                <input type="radio" name="sex" value="female" /> Female
              </label>
            </div>

            <div className="field inline-field">
              <span>Background color</span>
              <div className="color-picker-wrap">
                <input type="color" defaultValue="#333333" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="f-notes">Notes (optional)</label>
              <textarea id="f-notes" rows="4"></textarea>
            </div>

            <button type="submit" className="modal-submit-btn">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeacherModal;