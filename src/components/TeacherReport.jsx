import { useEffect, useState } from "react";
import WebDataRocks from "@webdatarocks/webdatarocks";
import "@webdatarocks/webdatarocks/webdatarocks.min.css";

function TeacherReport({ teachers = [] }) {
    const [isFlat, setIsFlat] = useState(false);

    useEffect(() => {
        if (!document.getElementById("wdr-component") || teachers.length === 0) return;

        const data = teachers.map((t) => ({
            full_name: t.full_name || "",
            course: t.course || "",
            country: t.country || "",
            city: t.city || "",
            age: t.age || null,
            gender: t.gender || "",
            email: t.email || "",
            phone: t.phone || "",
        }));

        const pivot = new WebDataRocks({
            container: "#wdr-component",
            toolbar: true,
            report: {
                dataSource: {
                    data: data,
                    mapping: {
                        full_name: { caption: "Full Name", type: "string" },
                        course: { caption: "Speciality", type: "string" },
                        country: { caption: "Country", type: "string" },
                        city: { caption: "City", type: "string" },
                        age: { caption: "Age", type: "number" },
                        gender: { caption: "Gender", type: "string" },
                        email: { caption: "Email", type: "string" },
                        phone: { caption: "Phone", type: "string" },
                    },
                },
                slice: isFlat
                    ? {
                        columns: [
                            { uniqueName: "full_name" },
                            { uniqueName: "course" },
                            { uniqueName: "country" },
                            { uniqueName: "city" },
                            { uniqueName: "age" },
                            { uniqueName: "gender" },
                            { uniqueName: "email" },
                            { uniqueName: "phone" },
                        ],
                    }
                    : {
                        rows: [{ uniqueName: "country" }],
                        columns: [{ uniqueName: "course" }],
                        measures: [
                            { uniqueName: "full_name", aggregation: "count", caption: "Total Teachers" }
                        ],
                    },
                options: {
                    grid: {
                        type: isFlat ? "flat" : "compact",
                        showTotals: "off",
                        showGrandTotals: "off",
                    },
                },
            },
        });

        return () => {
            pivot.dispose();
        };
    }, [teachers, isFlat]);

    return (
        <section id="reports" style={{ margin: "30px auto", maxWidth: "1000px" }}>
            <h2 className="section-title">Statistics Report</h2>

            <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "15px" }}>
                <button
                    type="button"
                    className="red-button"
                    style={{ opacity: !isFlat ? 1 : 0.6 }}
                    onClick={() => setIsFlat(false)}
                >
                    Звіт
                </button>
                <button
                    type="button"
                    className="red-button"
                    style={{ opacity: isFlat ? 1 : 0.6 }}
                    onClick={() => setIsFlat(true)}
                >
                    Всі викладачі
                </button>
            </div>

            <div id="wdr-component"></div>
            <hr className="divider" />
        </section>
    );
}

export default TeacherReport;