
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-4 mb-4">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">
        Lanexa Image Editor
      </h1>
      <p className="text-white mt-2 text-md md:text-lg mx-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        Unggah gambar, berikan prompt, dan ubah visual Anda secara instan.
      </p>
    </header>
  );
};

export default Header;