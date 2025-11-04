import React, { useMemo, useState } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

function formatDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function TaskForm({ user, tasks, onAddPlan, onUpdateStatus }) {
  const todayKey = useMemo(() => formatDateKey(new Date()), []);

  const todaysTask = useMemo(() => {
    if (!user) return null;
    return tasks.find(
      (t) => t.userEmail === user.email && t.date === todayKey
    );
  }, [tasks, user, todayKey]);

  const isMorning = useMemo(() => {
    const hour = new Date().getHours();
    return hour < 14; // treat before 2pm as morning window
  }, []);

  const [title, setTitle] = useState('');
  const [plan, setPlan] = useState('');
  const [status, setStatus] = useState(todaysTask?.status || 'in-progress');
  const [notes, setNotes] = useState('');

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !plan.trim()) return;
    onAddPlan({
      title: title.trim(),
      plan: plan.trim(),
      date: todayKey,
    });
    setTitle('');
    setPlan('');
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus({ status, notes });
    setNotes('');
  };

  if (!user) return null;

  return (
    <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">Your Task for Today</h3>
        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} /> {todayKey}
        </div>
      </div>

      {!todaysTask ? (
        <div>
          <p className="mb-4 text-sm text-gray-600">
            {isMorning
              ? 'Morning planning: Add what you will work on today.'
              : 'No plan added yet. You can still add your task for today.'}
          </p>
          <form onSubmit={handlePlanSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                placeholder="Implement login flow"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Plan for the day</label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                rows={4}
                placeholder="Outline tasks you plan to complete today..."
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                <CheckCircle size={16} /> Save Plan
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="mb-4 rounded-lg border bg-gray-50 p-4">
            <div className="mb-1 text-sm font-medium text-gray-700">Planned</div>
            <div className="font-medium">{todaysTask.title}</div>
            <div className="text-sm text-gray-600 whitespace-pre-line">{todaysTask.plan}</div>
          </div>
          <p className="mb-3 text-sm text-gray-600">Evening update: Share your status and notes.</p>
          <form onSubmit={handleStatusSubmit} className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1.5 md:col-span-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="in-progress">In progress</option>
                <option value="blocked">Blocked</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
                rows={3}
                placeholder="What did you complete? Any blockers or follow-ups?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="md:col-span-3 flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                <CheckCircle size={16} /> Update Status
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
