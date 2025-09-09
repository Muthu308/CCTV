// pages/dashboard.js
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export default function Dashboard({ user }) {
  return (
    <div style={{ maxWidth: 720, margin: '2rem auto' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name || user?.email}!</p>
      <p>Account created at: {new Date(user?.createdAt).toLocaleString()}</p>
      <form action="/api/auth/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const token = req.cookies?.token || null;
  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, createdAt: true }
    });
    if (!user) throw new Error('No user');
    return { props: { user } };
  } catch (err) {
    return { redirect: { destination: '/login', permanent: false } };
  }
}
