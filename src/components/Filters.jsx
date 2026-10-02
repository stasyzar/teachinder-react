function Filters() {
   return (
      <div className="filters">
         <span>Age</span>
         <select>
            <option>18-31</option>
         </select>
         <span className="sep">|</span>
         <span>Region</span>
         <select>
            <option>Europe</option>
         </select>
         <span className="sep">|</span>
         <span>Sex</span>
         <select>
            <option>Male</option>
         </select>
         <span className="sep">|</span>
         <label><input type="checkbox" />Only with photo</label>
         <span className="sep">|</span>
         <label><input type="checkbox" />Only favorites</label>
      </div>
   );
}

export default Filters;