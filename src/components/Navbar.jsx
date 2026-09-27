function Navbar() {
    return (
        <>
            <div className="nav-row">
                <nav>
                    <a href="#teachers">Teachers</a>
                    <a href="#statistics">Statistics</a>
                    <a href="#favorites">Favorites</a>
                    <a href="#about">About</a>
                </nav>
                <a href="#" className="red-button ">Add teacher</a>

            </div>
            <hr className="divider"></hr>
        </>
    );
}

export default Navbar;