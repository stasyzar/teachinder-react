
function Filters({ teachers = [], filters = {}, onFilterChange }) {
   const uniqueCountries = [
      "All",
      ...new Set(teachers.map((t) => t.country).filter(Boolean))
   ].sort();

   return (
      <div className="filters">
         <span>Age</span>
         <select
            value={filters.age || "All"}
            onChange={(e) => onFilterChange("age", e.target.value)}
         >
            <option value="All">All</option>
            <option value="18-31">18-31</option>
            <option value="32-45">32-45</option>
            <option value="46+">46+</option>
         </select>
         <span className="sep">|</span>
         <span>Region</span>
         <select
            value={filters.country || "All"}
            onChange={(e) => onFilterChange("country", e.target.value)}
         >
            {uniqueCountries.map((country) => (
               <option key={country} value={country}>
                  {country}
               </option>
            ))}
         </select>
         <span className="sep">|</span>
         <span>Sex</span>
         <select
            value={filters.gender || "All"}
            onChange={(e) => onFilterChange("gender", e.target.value)}
         >
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
         </select>
         <span className="sep">|</span>
         <label>
            <input
               type="checkbox"
               checked={!!filters.hasPhoto}
               onChange={(e) => onFilterChange("hasPhoto", e.target.checked)}
            />
            Only with photo
         </label>
         <span className="sep">|</span>
          <label>
            <input
               type="checkbox"
               checked={!!filters.favorite}
               onChange={(e) => onFilterChange("favorite", e.target.checked)}
            />
            Only favorites
         </label>
      </div>
   );
}

export default Filters;