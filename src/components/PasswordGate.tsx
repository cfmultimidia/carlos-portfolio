import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const SESSION_KEY = 'premmia_unlocked';
const CORRECT_PASSWORD = '1234';

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  // Check session storage so user doesn't retype on page refresh
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-6">
      {/* Back link */}
      <div className="absolute top-6 left-6">
        <a href="/" className="text-[16px] text-[#737882] hover:text-[#111] transition-colors flex items-center gap-1">
          ← back
        </a>
      </div>

      <div
        className={`w-full max-w-[380px] flex flex-col items-center gap-8 transition-all ${shake ? 'animate-[wiggle_0.4s_ease]' : ''}`}
        style={shake ? { animation: 'wiggle 0.4s ease' } : {}}
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#111] flex items-center justify-center">
          <Lock size={22} className="text-white" />
        </div>

        {/* Text */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-[22px] font-semibold tracking-tight text-[#111]">This project is protected</h1>
          <p className="text-[16px] text-[#737882] leading-[1.5]">Enter the password to access the Premmia case study.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className={`w-full px-4 py-3.5 pr-12 rounded-xl border text-[16px] outline-none transition-all bg-white
                ${error
                  ? 'border-red-400 text-red-500 placeholder-red-300'
                  : 'border-[#ddd] text-[#111] placeholder-[#aaa] focus:border-[#111]'
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#aaa] hover:text-[#555] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-[14px] text-red-500 text-center">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#111] text-white rounded-xl text-[16px] font-medium hover:bg-[#333] transition-colors active:scale-[0.98]"
          >
            Unlock
          </button>
        </form>
      </div>

      {/* Wiggle keyframes injected via style tag */}
      <style>{`
        @keyframes wiggle {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-8px); }
          40%  { transform: translateX(8px); }
          60%  { transform: translateX(-6px); }
          80%  { transform: translateX(6px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
