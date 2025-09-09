// pages/login.js
import { useState } from 'react';
import Router from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err, setErr] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!r.ok) {
        const json = await r.json();
        setErr(json?.error || 'Login failed');
        return;
      }
      Router.push('/dashboard');
    } catch (e) {
      setErr('Network error');
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label>Email<br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required/>
        </label><br/>
        <label>Password<br/>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required/>
        </label><br/>
        <button type="submit">Login</button>
      </form>
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </div>
  );
}
