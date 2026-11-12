import React, { useState } from 'react';
import '../Auth.css';

function Signup({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!email || !password || !confirm) {
      return setError('Please fill in all fields.');
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setError('Please enter a valid email address.');
    }
    if (password.length < 8) {
      return setError('Password must be at least 8 characters.');
    }
    if (password !== confirm) {
      return setError('Passwords do not match.');
    }

    // Check if user already exists
    const existing = JSON.parse(localStorage.getItem('users') || '[]');
    if (existing.find((u) => u.email === email)) {
      return setError('An account with this email already exists.');
    }

    // Save user (plain text — fine for a no-backend demo)
    const users = [...existing, { email, password }];
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Account created! You can now log in.');
    setTimeout(onSwitch, 1200);
  };

  return (
    <div className="auth-card">
      <h1>Create your account</h1>
      <p className="subtitle">Start tracking your budget today.</p>

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
          placeholder="At least 8 characters"
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repeat your password"
        />

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit">Sign Up</button>
      </form>

      <p className="switch-text">
        Already have an account?{' '}
        <span onClick={onSwitch}>Log in</span>
      </p>
    </div>
  );
}

export default Signup;