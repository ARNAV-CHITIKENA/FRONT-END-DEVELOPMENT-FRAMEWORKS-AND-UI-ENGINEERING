import {Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <h1>Welcome to Dashboard</h1>
            <Outlet />
        </>
    );
};

export default Dashboard;