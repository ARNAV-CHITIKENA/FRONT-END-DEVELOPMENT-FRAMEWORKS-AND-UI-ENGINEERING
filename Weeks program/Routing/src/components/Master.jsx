import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Error from "./Error";

const Master=()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<Login></Login>}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}> </Route>
            <Route path="/error" element={<Error></Error>}></Route>
        </Routes>
        
        </>  
    )
}

export default Master;