import React, { useEffect, useState } from 'react';
import { registerUser } from './api';

const App = () => {
  const [formData, setFormData] = useState({ username: '', email: '', dob: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus(null);

  try {
    await registerUser(formData);
    setStatus({ type: 'success', msg: 'Successfully registered!' });
    setFormData({ username: '', email: '', dob: '' });
  } catch (err: any) {
    setStatus({ type: 'error', msg: err.message });
  }
};

 // Clear result after 5 seconds
  useEffect(() => {
    if (!status) return;

    const timer = setTimeout(() => {
      setStatus(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Birthday Reminder</h2>
          <p className="text-slate-500 mt-2">Never miss a customer's special day.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Birth</label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={formData.dob}
              onChange={(e) => setFormData({...formData, dob: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all font-bold shadow-lg shadow-indigo-100 cursor-pointer"
          >
            Save Information
          </button>
        </form>

        {status && (
          <div className={`mt-6 p-4 rounded-xl text-center text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
          }`}>
            {status.msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;