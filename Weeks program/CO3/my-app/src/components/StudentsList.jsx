StudentList.jsx
import { useState, useEffect } from "react";
function StudentList() {
    const [count, setCount] = useState(3);
    const [theme, setTheme] = useState("Light");
    useEffect(() => {
        console.log("useEffect Executed");
        document.title = `Students: ${count}`;

    }, [count]);
    return (
        <div>

            <h2>Total Students: {count}</h2>
            <h3>Theme: {theme}</h3>
            <button onClick={() => setCount(count + 1)}>
                Add Student
            </button>
            <button onClick={() => setTheme("Dark")}>
                Change Theme
            </button>
        </div>
    );
}

export default StudentList;