import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth';

type Tab = 'login' | 'signup';

export default function Login() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'login') {
        await signIn(email, password);
        navigate('/dashboard');
      } else {
        if (!username.trim()) throw new Error('Username is required');
        if (username.length < 3) throw new Error('Username must be at least 3 characters');
        if (!/^[a-z0-9_-]+$/i.test(username)) throw new Error('Username can only contain letters, numbers, hyphens and underscores');
        await signUp(email, password, username);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = `w-full px-4 py-3 rounded-xl border text-[15px] outline-none transition-all bg-white ${
    error ? 'border-red-300' : 'border-[#e0e0e0] focus:border-[#111]'
  }`;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between max-w-[1200px] mx-auto w-full">
        <a href="/" className="font-bold text-[18px] tracking-[-0.02em] text-[#111] hover:opacity-70 transition-opacity">
          showfolio
        </a>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[400px]">
          {/* Tab switcher */}
          <div className="flex bg-[#efefef] rounded-xl p-1 mb-8">
            {(['login', 'signup'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                  tab === t ? 'bg-white text-[#111] shadow-sm' : 'text-[#888] hover:text-[#555]'
                }`}
              >
                {t === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {tab === 'signup' && (
              <div>
                <label className="text-[12px] text-[#777] mb-1.5 block">Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999] text-[15px]">showfolio.com/p/</span>
                  <input
                    className={`${inputCls} pl-[155px]`}
                    placeholder="yourname"
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                    autoComplete="username"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[12px] text-[#777] mb-1.5 block">Email</label>
              <input
                type="email"
                className={inputCls}
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-[12px] text-[#777] mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className={`${inputCls} pr-12`}
                  placeholder={tab === 'signup' ? 'Minimum 6 characters' : '••••••••'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555]"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[13px] text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#111] text-white rounded-xl text-[15px] font-medium hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {tab === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          {tab === 'signup' && (
            <p className="text-[12px] text-[#aaa] text-center mt-4">
              By creating an account, you agree to our Terms of Service.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
