import { useState } from "react";
const ControlledForm = () => {
    const [name, setName] = useState("");
    return (
        <div>
            <h1>Controlled Form</h1>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter at least 5 letters"
            />
            {/* Live Validation */}

            {name.length > 0 && name.length < 5 && (
                <p style={{ color: "red" }}>
                    Name must be at least 5 characters
                </p>
            )}

            <p>Live Value: {name}</p>
        </div>
    );
};

export default ControlledForm;