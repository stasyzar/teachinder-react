import { useEffect } from "react";
import Chart from "chart.js/auto";

function StatisticsPiechart({ teachers = [] }) {
    useEffect(() => {
        const canvas = document.getElementById("teachersChart");
        const ageCanvas = document.getElementById("teachersAgeChart");

        if (!canvas || teachers.length === 0 || !ageCanvas) return;

        const ageCounts = teachers.reduce((acc, teacher) => {
            const age = teacher.age;
            if (typeof age === "number" && age > 0) {
                if (age <= 31) acc["18-31"] += 1;
                else if (age <= 45) acc["32-45"] += 1;
                else acc["46+"] += 1;
            }
            return acc;
        }, { "18-31": 0, "32-45": 0, "46+": 0 });

        const courseCounts = teachers.reduce((acc, teacher) => {
            const course = teacher.course;
            if (!acc[course]) {
                acc[course] = 0;
            }
            acc[course] += 1;
            return acc;
        }, {});

        const labels = Object.keys(courseCounts);
        const data = Object.values(courseCounts);

        const chartInstance = new Chart(canvas, {
            type: "pie",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Кількість викладачів",
                        data: data,
                        radius: 110,
                        backgroundColor: [
                            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
                            "#9966FF", "#FF9F40", "#C9CBCF", "#71B37C",
                            "#EC932F", "#5A6577", "#D45087", "#8BC34A"
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                    title: {
                        display: true,
                        text: `Розподіл за спеціальностями`,
                    },
                },
            },
        });
        const ageChart = new Chart(ageCanvas, {
            type: "doughnut",
            data: {
                labels: Object.keys(ageCounts),
                datasets: [
                    {
                        label: "Кількість викладачів",
                        data: Object.values(ageCounts),
                        radius: 110,
                        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "bottom" },
                    title: {
                        display: true,
                        text: "Розподіл за віком",
                    },
                },
            },
        });

        return () => {
            chartInstance.destroy();
            ageChart.destroy();
        };
    }, [teachers]);

    return (
        <section id="statistics">
            <h2 className="section-title">Statistics</h2>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "50px",
                flexWrap: "wrap",
                margin: "25px auto",
                maxWidth: "1000px"
            }}>
                <div style={{ flex: "1 1 380px", maxWidth: "420px" }}>
                    <canvas id="teachersChart"></canvas>
                </div>
                <div style={{ flex: "1 1 380px", maxWidth: "420px" }}>
                    <canvas id="teachersAgeChart"></canvas>
                </div>
            </div>
            <hr className="divider" />
        </section>
    );
}
export default StatisticsPiechart;