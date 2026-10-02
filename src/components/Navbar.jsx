function Navbar({ onOpenAddTeacher }) {
    return (
        <div className="nav-row">
            <nav>
                <a href="#teachers">Teachers</a>
                <a href="#statistics">Statistics</a>
                <a href="#favorites">Favorites</a>
                <a href="#about">About</a>
            </nav>
            <button type="button" className="red-button" onClick={onOpenAddTeacher}>
                Add teacher
            </button>
        </div>
    );
}

export default Navbar;