import { useEffect } from "react";
import Chart from "chart.js/auto";

function StatisticsChart({ teachers = [] }) {
  useEffect(() => {
    const canvas = document.getElementById("teachersChart");
    if (!canvas || teachers.length === 0) return;

    // 1. Рахуємо кількість викладачів для кожного предмету
    const courseCounts = teachers.reduce((acc, teacher) => {
      const course = teacher.course || "Other";
      acc[course] = (acc[course] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(courseCounts);
    const data = Object.values(courseCounts);

    // 2. Створюємо кругову діаграму через ID канвасу
    const chartInstance = new Chart(canvas, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Кількість викладачів",
            data: data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C9CBCF",
              "#71B37C",
              "#EC932F",
              "#5A6577",
              "#D45087",
              "#8BC34A",
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
            text: `Розподіл за спеціальностями (Всього: ${teachers.length})`,
          },
        },
      },
    });

    // 3. Знищуємо графік перед повторним викликом
    return () => {
      chartInstance.destroy();
    };
  }, [teachers]);

  return (
    <section id="statistics">
      <hr className="divider" />
      <h2 className="section-title">Statistics (Pie Chart)</h2>
      <div style={{ maxWidth: "480px", margin: "20px auto" }}>
        <canvas id="teachersChart"></canvas>
      </div>
      <hr className="divider" />
    </section>
  );
}

export default StatisticsChart;
