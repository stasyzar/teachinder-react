import Navbar from "./Navbar";

function Footer({ onOpenAddTeacher }) {
    return (
        <footer>
            <Navbar onOpenAddTeacher={onOpenAddTeacher} />
        </footer>
    );
}

export default Footer;