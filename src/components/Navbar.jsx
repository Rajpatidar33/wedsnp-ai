import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        WebSnpAI
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;