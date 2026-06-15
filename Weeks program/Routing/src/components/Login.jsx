// useRef hook
// used to read data from text boxes (input)
import { useRef } from "react";
// used to navigate between components based on events
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const navigate = useNavigate();

  const login = () => {
    ref1.current.value === "admin" && ref2.current.value === "admin@123" 
      ? navigate("/dashboard")
      : navigate("/error");
  };

  return (
    <>
      <h1>Login Page</h1>
      <input type="text" ref={ref1} placeholder="enter username" />
      <br />
      <br />
      <br />
      <input type="password" ref={ref2} placeholder="enter password" />
      <br />
      <br />
      <br />
      <button onClick={login}>Login</button>
      <br />
      <br />
      <nav>
        <Link to="/">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/error">Error</Link>
      </nav>
    </>
  );
};

export default Login;
