
import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isDisabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, isDisabled }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-2">Visi Anda</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isDisabled}
        placeholder="contoh: 'Jadikan latar belakangnya istana bawah air yang indah', 'Tambahkan ubur-ubur lucu yang melayang di dekatnya', 'Ubah gayanya menjadi lukisan cat air'"
        className="w-full flex-grow p-4 bg-blue-500/10 border border-blue-400/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/80 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 placeholder-blue-300/60 text-white disabled:bg-blue-900/20 disabled:text-blue-300/50"
      />
    </div>
  );
};

export default PromptInput;