import React, { useState } from 'react';
import { Shield, User } from 'lucide-react';

export default function AuthForm({ onLogin }) {
  const [role, setRole] = useState('employee');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({ name: name.trim(), email: email.trim(), role });
  };

  return (
    <div className="min-h-[60vh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white/70 backdrop-blur p-6 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-indigo-600 text-white grid place-items-center">
            {role === 'admin' ? <Shield /> : <User />}
          </div>
          <h2 className="text-xl font-semibold">Sign in</h2>
          <p className="text-sm text-gray-500">Choose your role and enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('employee')}
              className={`rounded-md border px-3 py-2 text-sm font-medium ${
                role === 'employee' ? 'border-indigo-600 text-indigo-700 bg-indigo-50' : 'border-gray-200 text-gray-700'
              }`}
            >
              Employee
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`rounded-md border px-3 py-2 text-sm font-medium ${
                role === 'admin' ? 'border-indigo-600 text-indigo-700 bg-indigo-50' : 'border-gray-200 text-gray-700'
              }`}
            >
              Admin
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-600 focus:outline-none"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email (optional)</label>
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-600 focus:outline-none"
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
