import { useState } from "react";

function Counter() {

    // State Variable

    const [studnetscount, setstudnetsCount] = useState(0);

    return (

        <div>

            <h1>StudentsCount: {studnetscount}</h1>

            <button onClick={() => setstudnetsCount(studnetscount + 1)}>

                Increment

            </button>

        </div>
    );
}
export default Counter;