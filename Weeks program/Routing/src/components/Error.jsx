import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <h1>Error Page</h1>
      <p>Invalid username or password. Please try again.</p>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/error">Error</Link>
      </nav>
    </>
  );
};

export default Error;
