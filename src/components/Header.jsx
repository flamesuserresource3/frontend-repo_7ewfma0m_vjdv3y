import React from 'react';
import { User, LogOut, Shield } from 'lucide-react';

export default function Header({ user, onLogout }) {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white grid place-items-center font-bold">EM</div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Employee Manager</h1>
            <p className="text-xs text-gray-500">Plan in the morning, update in the evening</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {user.role === 'admin' ? (
                <>
                  <Shield size={14} /> Admin
                </>
              ) : (
                <>
                  <User size={14} /> Employee
                </>
              )}
            </span>
            <div className="hidden sm:block text-sm text-gray-600">{user.name}</div>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
