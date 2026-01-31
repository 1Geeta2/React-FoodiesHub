import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const { data } = await API.post('/auth/login', { 
      email, 
      password 
    });
    
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // DISPATCH EVENT TO UPDATE NAVBAR
    window.dispatchEvent(new Event("loginChanged"));
    
    alert('Login successful!');
    navigate('/');
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message);
    setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <h1>Login</h1><br/>
      
      {error && (
        <div style={{color: 'red', marginBottom: '10px'}}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <input 
          type="email"
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          style={{padding:"10px 20px"}}
          required
        />
        <br/><br/>
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          style={{padding:"10px 20px"}}
          required
        />
        <br/><br/>
        
        <button type="submit" style={{padding:"10px 20px"}} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;