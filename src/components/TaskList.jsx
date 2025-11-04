import React, { useMemo, useState } from 'react';
import { Search, Filter } from 'lucide-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TaskList({ tasks, currentUser }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchesQuery = [t.title, t.plan, t.userName].some((v) =>
        (v || '').toLowerCase().includes(query.toLowerCase())
      );
      const matchesStatus = status === 'all' ? true : (t.status || 'in-progress') === status;
      return matchesQuery && matchesStatus;
    });
  }, [tasks, query, status]);

  return (
    <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-base font-semibold">
          {currentUser?.role === 'admin' ? "Everyone's Tasks" : 'Your Recent Tasks'}
        </h3>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="relative w-full md:w-64">
            <Search size={16} className="pointer-events-none absolute left-3 top-2.5 text-gray-400" />
            <input
              className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm focus:border-indigo-600 focus:outline-none"
              placeholder="Search by title, plan or name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              className="rounded-md border border-gray-300 px-2.5 py-2 text-sm focus:border-indigo-600 focus:outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="in-progress">In progress</option>
              <option value="blocked">Blocked</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-2 font-medium">Date</th>
              <th className="px-4 py-2 font-medium">Employee</th>
              <th className="px-4 py-2 font-medium">Title</th>
              <th className="px-4 py-2 font-medium">Plan</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>
                  No tasks yet.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="px-4 py-2 text-gray-600">{t.date}</td>
                  <td className="px-4 py-2">
                    <div className="font-medium">{t.userName}</div>
                    <div className="text-xs text-gray-500">{t.userEmail}</div>
                  </td>
                  <td className="px-4 py-2 font-medium">{t.title}</td>
                  <td className="px-4 py-2 text-gray-700 whitespace-pre-line max-w-md">{t.plan}</td>
                  <td className="px-4 py-2">
                    <span
                      className={classNames(
                        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                        t.status === 'done' && 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
                        t.status === 'blocked' && 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
                        (!t.status || t.status === 'in-progress') && 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                      )}
                    >
                      {t.status || 'in-progress'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-pre-line max-w-md">{t.notes || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
