import React, { useState } from 'react';
import '../Auth.css';

function Login({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      return setError('Please fill in all fields.');
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return setError('Invalid email or password.');
    }

    setSuccess(`Welcome back, ${email}!`);
  };

  return (
    <div className="auth-card">
      <h1>Welcome back</h1>
      <p className="subtitle">Log in to your budget tracker.</p>

      <form onSubmit={handleSubmit} noValidate>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Log In</button>
      </form>

      <p className="switch-text">
        Don't have an account?{' '}
        <span onClick={onSwitch}>Sign up</span>
      </p>
    </div>
  );
}

export default Login;