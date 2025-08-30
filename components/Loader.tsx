
import React from 'react';
import { LoadingIcon } from './icons';

const messages = [
  "Berkonsultasi dengan bintang untuk inspirasi...",
  "Menenun visi menjadi kenyataan...",
  "Mengumpulkan esensi pasang surut...",
  "Sang Pendeta Ilahi sedang bekerja...",
  "Memoles mahakarya terakhir...",
];

const Loader: React.FC = () => {
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-md flex flex-col justify-center items-center z-50 rounded-2xl">
      <LoadingIcon className="w-16 h-16" />
      <p className="mt-4 text-lg font-semibold text-white animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;