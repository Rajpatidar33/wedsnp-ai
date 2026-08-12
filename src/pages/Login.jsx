import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    console.log("Login successful:", data);

    alert("Login successful!");

    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-icon">🔐</div>

        <h1>Welcome Back</h1>

        <p>Login to access your WebSnpAI account.</p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p className="auth-bottom">
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;