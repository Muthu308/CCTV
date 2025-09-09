// pages/register.js
import { useState } from 'react';
import Router from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      const r = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      if (!r.ok) {
        const json = await r.json();
        setErr(json?.error || 'Failed');
        return;
      }
      // optional: auto-login by calling login endpoint or redirect to login page
      Router.push('/login');
    } catch (e) {
      setErr('Network error');
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label>Email<br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required/>
        </label><br/>
        <label>Name (optional)<br/>
          <input value={name} onChange={e=>setName(e.target.value)} />
        </label><br/>
        <label>Password<br/>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required/>
        </label><br/>
        <button type="submit">Register</button>
      </form>
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </div>
  );
}
