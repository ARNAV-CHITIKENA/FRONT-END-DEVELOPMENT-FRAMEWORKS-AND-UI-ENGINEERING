import { useRef, useState } from "react";

const UncontrolledForm = () => {
    const inputRef = useRef();

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const value = inputRef.current.value;

        // Validation happens ONLY on submit
        if (value.length < 5) {
            setError("Name must be at least 5 characters");
        } else {
            setError("");
            alert("Form Submitted");
        }
    };
    return (
        <div>
            <h1>Uncontrolled Form</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Enter at least 5 letters"
                />

                <br />
                <br />

                <button type="submit">
                    Submit
                </button>
            </form>

            <p style={{ color: "red" }}>
                {error}
            </p>
        </div>
    );
};

export default UncontrolledForm;