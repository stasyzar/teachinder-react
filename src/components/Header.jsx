function Header() {
    return(
        <header>
         <h1 className="logo">Teachinder</h1>
         <div className="search">
            <input type="text" placeholder="Name, note or age to search"/>
            <button className="red-button">Search</button>
         </div>
      </header>
    );
}

export default Header;