import { useState } from "react";

function Header({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        }
    };
    return (
        <header>
            <h1 className="logo">Teachinder</h1>
            <form className="search" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name, note or age to search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="red-button">Search</button>
            </form>
        </header>
    );
}

export default Header;