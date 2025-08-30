
import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'larenva') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Kata sandi salah. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen w-full p-4 flex items-center justify-center">
      <div className="w-full max-w-sm bg-blue-900/20 backdrop-blur-2xl rounded-2xl p-8 border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] mb-6">
          Selamat Datang
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-blue-500/10 border border-blue-400/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 text-white placeholder-blue-300/60"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:from-cyan-300 hover:to-blue-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
