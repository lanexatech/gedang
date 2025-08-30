
import React from 'react';

const TitleScreen: React.FC<{ isExiting: boolean }> = ({ isExiting }) => {
  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${isExiting ? 'animate-fadeOut' : ''}`}>
      <div className="text-center animate-fadeInGlow">
        <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]">
          Lanexa Image Editor
        </h1>
      </div>
    </div>
  );
};

export default TitleScreen;
