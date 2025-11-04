import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';

function formatDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleLogin = (u) => {
    setUser(u);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddPlan = ({ title, plan, date }) => {
    if (!user) return;
    const newTask = {
      id: `${user.email || user.name}-${date}`,
      userEmail: user.email || `${user.name}@example.com`,
      userName: user.name,
      date,
      title,
      plan,
      status: 'in-progress',
      notes: '',
    };
    setTasks((prev) => {
      // prevent duplicate for same user+date
      const existing = prev.find((t) => t.userEmail === newTask.userEmail && t.date === newTask.date);
      if (existing) return prev;
      return [newTask, ...prev];
    });
  };

  const handleUpdateStatus = ({ status, notes }) => {
    if (!user) return;
    const today = formatDateKey(new Date());
    setTasks((prev) =>
      prev.map((t) =>
        t.userEmail === (user.email || `${user.name}@example.com`) && t.date === today
          ? { ...t, status, notes }
          : t
      )
    );
  };

  const bgGradient = useMemo(
    () => 'bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50',
    []
  );

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      <Header user={user} onLogout={handleLogout} />

      {!user ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <Dashboard
          user={user}
          tasks={tasks}
          onAddPlan={handleAddPlan}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      <footer className="mt-8 pb-8 text-center text-xs text-gray-500">
        Built for role-based daily planning and updates
      </footer>
    </div>
  );
}
