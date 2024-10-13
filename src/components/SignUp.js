import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; 

const SignUp = () => {
  const { setUser } = useUser(); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!userData.name || !userData.email.includes('@')) {
      setError('Please fill in all fields correctly.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        setUser({ name: userData.name }); 
        setUserData({ name: '', email: '', password: '' });
        navigate('/'); 
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="login-center">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="input-area"
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Mail</label>
              <input
                className="input-area"
                type="email"
                name="email"
                value={userData.email}
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
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <button className='login-btn' type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Sign Up'}
            </button>

            <p className="text-smaller">
              Already have an account?{' '}
              <Link to="/login">Go to login</Link>
            </p>
          </form>
          {error && <p style={{ color: '#d0ad53' }}>{error}</p>}
        </div>
      </section>
    </div>
  );
}

export default SignUp;
