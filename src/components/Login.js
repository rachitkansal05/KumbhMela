import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import useUser hook

export default function Login() {
  const { setUser } = useUser(); // Get setUser from context
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginData.email, password: loginData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set the user in context with the retrieved name and email
        setUser({ name: data.name, email: loginData.email });
        navigate(data.redirectUrl || '/');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="login-center"> 
        <div className="login-container"> 
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2> 
            <div className="form-group"> 
              <label htmlFor="email">Email</label> 
              <input 
                className="input-area" 
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label> 
              <input 
                className="input-area" 
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <p><Link to="/forget-password">Forget password?</Link></p> 
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </button> 
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p className="text-smaller"> 
              Don't have an account? <Link to="/signup">Create new</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
