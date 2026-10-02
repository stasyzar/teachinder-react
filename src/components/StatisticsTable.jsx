import { statsData } from "../data/statistics";

function StatisticsTable() {
    return (
        <section id="statistics">
            <h2 className="section-title">Statistics</h2>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Speciality</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Nationality</th>
                    </tr>
                </thead>
                <tbody>
          {statsData.map(({ id, name, speciality, age, gender, nationality }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{speciality}</td>
              <td>{age}</td>
              <td>{gender}</td>
              <td>{nationality}</td>
            </tr>
          ))}
        </tbody>
            </table>
            <div className="pagination">
                <span className="current">1</span>
                <span>2</span>
                <span>3</span>
                <span>…</span>
                <span>Last</span>
            </div>
            <hr className="divider" />
        </section>
    );
}

export default StatisticsTable;