import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/login");
  };

  return (
    <div className="login-container">
      <h1>Registration</h1>
      <br />

      <form onSubmit={handleRegister}>
        {/* NAME */}
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px 20px" }}
        />
        <br /><br />

        {/* EMAIL VALIDATION */}
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px 20px" }}
        />
        <br /><br />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px 20px" }}
        />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
