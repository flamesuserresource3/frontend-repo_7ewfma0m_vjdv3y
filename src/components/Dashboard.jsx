import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

export default function Dashboard({ user, tasks, onAddPlan, onUpdateStatus }) {
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 space-y-6">
      {user.role === 'employee' && (
        <TaskForm user={user} tasks={tasks} onAddPlan={onAddPlan} onUpdateStatus={onUpdateStatus} />
      )}

      <TaskList tasks={user.role === 'admin' ? tasks : tasks.filter(t => t.userEmail === user.email)} currentUser={user} />
    </div>
  );
}
