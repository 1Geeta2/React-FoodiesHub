import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post('/auth/register', { 
        name, 
        email, 
        password 
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Registration</h1><br/>
      
      {error && (
        <div style={{color: 'red', marginBottom: '10px'}}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleRegister}>
        <input 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          style={{padding:"10px 20px"}}
          required
        /> 
        <br/><br/>
        
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
          minLength={6}
        />
        <br/><br/>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;