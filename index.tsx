
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/Login';
import TitleScreen from './components/TitleScreen';

const Root = () => {
  const [view, setView] = useState('title'); // 'title', 'login', 'app'
  const [isExitingTitle, setIsExitingTitle] = useState(false);

  useEffect(() => {
    // Timer untuk menampilkan layar judul selama total 5 detik
    const titleTimer = setTimeout(() => {
      setIsExitingTitle(true); // Mulai animasi fade-out
      const fadeOutTimer = setTimeout(() => {
        setView('login');
      }, 1000); // Durasi animasi fade-out

      return () => clearTimeout(fadeOutTimer);
    }, 4000); // 4 detik terlihat + 1 detik fade out = 5 detik total

    return () => clearTimeout(titleTimer);
  }, []);

  const handleLoginSuccess = () => {
    setView('app');
  };

  if (view === 'title') {
    return <TitleScreen isExiting={isExitingTitle} />;
  }
  
  if (view === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <App />;
};


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);