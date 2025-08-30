
import React from 'react';
import { GenerationResult } from '../types';
import { ImageIcon, DownloadIcon } from './icons';

interface ResultDisplayProps {
  generatedResult: GenerationResult | null;
  aspectRatio: string;
  showResults: boolean;
}

const ImageCard: React.FC<{ title: string, imageUrl: string | null, aspectRatio: string, isResult?: boolean }> = ({ title, imageUrl, aspectRatio, isResult = false }) => (
    <div className="w-full flex flex-col items-center">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div 
            className="relative w-full bg-blue-900/20 rounded-xl border border-blue-400/30 flex justify-center items-center p-2 group overflow-hidden"
            style={{ aspectRatio }}
        >
            {imageUrl ? (
                <>
                    <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain rounded-lg transition-all duration-300 group-hover:brightness-90" />
                    {isResult && (
                        <a
                            href={imageUrl}
                            download={`lanexa-generated-image.png`}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 px-4 py-2 bg-blue-500/40 backdrop-blur-md border border-blue-300/30 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500/60 transition-all duration-300 transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                            aria-label="Unduh gambar yang dihasilkan"
                            title="Unduh Gambar"
                        >
                            <DownloadIcon className="w-5 h-5" />
                            <span>Unduh</span>
                        </a>
                    )}
                </>
            ) : (
                <div className="text-slate-400">
                    <ImageIcon className="w-16 h-16" />
                </div>
            )}
        </div>
    </div>
);


const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedResult, aspectRatio, showResults }) => {
  if (!showResults) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400/80 to-blue-600/80 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.6)]">
               <ImageIcon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">Mahakarya Anda menanti</h2>
            <p className="text-white mt-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Unggah gambar dan jelaskan visi Anda untuk memulai.</p>
        </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
      <div className="w-full max-w-md">
        <ImageCard 
            title="Hasil"
            imageUrl={generatedResult?.image || null} 
            aspectRatio={aspectRatio} 
            isResult={true} 
        />
      </div>
       {generatedResult?.text && (
            <div className="bg-blue-500/20 border border-blue-500/30 text-white/90 p-4 rounded-xl w-full max-w-md">
                <p className="font-bold text-white">Pesan dari model:</p>
                <p>{generatedResult.text}</p>
            </div>
        )}
    </div>
  );
};

export default ResultDisplay;