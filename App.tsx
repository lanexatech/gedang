
import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import PromptInput from './components/PromptInput';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { MagicWandIcon, InfoIcon } from './components/icons';
import { editImageWithGemini } from './services/geminiService';
import { GenerationResult } from './types';


export default function App() {
  const [originalImageFile1, setOriginalImageFile1] = useState<File | null>(null);
  const [originalImageBase64_1, setOriginalImageBase64_1] = useState<string | null>(null);
  const [originalImageFile2, setOriginalImageFile2] = useState<File | null>(null);
  const [originalImageBase64_2, setOriginalImageBase64_2] = useState<string | null>(null);

  const [prompt, setPrompt] = useState<string>('');
  const [generatedResult, setGeneratedResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('1/1');
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleImageUpload1 = (file: File, base64: string) => {
    setOriginalImageFile1(file);
    const dataUrl = `data:${file.type};base64,${base64}`;
    setOriginalImageBase64_1(dataUrl);
    setGeneratedResult(null); // Clear previous result
    setError(null);
    setShowResults(false);

    const img = new Image();
    img.onload = () => {
      setAspectRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
    };
    img.src = dataUrl;
  };
  
  const handleImageUpload2 = (file: File, base64: string) => {
    setOriginalImageFile2(file);
    const dataUrl = `data:${file.type};base64,${base64}`;
    setOriginalImageBase64_2(dataUrl);
    setGeneratedResult(null); // Clear previous result
    setError(null);
    setShowResults(false);
  };

  const handleGenerateClick = async () => {
    const imagesToProcess = [];
    if (originalImageFile1 && originalImageBase64_1) {
        imagesToProcess.push({
            file: originalImageFile1,
            base64: originalImageBase64_1.split(',')[1]
        });
    }
     if (originalImageFile2 && originalImageBase64_2) {
        imagesToProcess.push({
            file: originalImageFile2,
            base64: originalImageBase64_2.split(',')[1]
        });
    }

    if (imagesToProcess.length === 0) {
      setError('Silakan unggah setidaknya satu gambar referensi.');
      return;
    }
    if (!prompt.trim()) {
      setError('Silakan masukkan prompt untuk mendeskripsikan visi Anda.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setGeneratedResult(null);
    setShowResults(true);

    try {
      const imageInputs = imagesToProcess.map(img => ({
          base64ImageData: img.base64,
          mimeType: img.file.type
      }));
      const result = await editImageWithGemini(imageInputs, prompt);
      setGeneratedResult(result);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const canGenerate = (!!originalImageFile1 || !!originalImageFile2) && prompt.trim().length > 0;

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <main className="w-full max-w-screen-2xl bg-blue-900/20 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Left Column: Controls */}
          <div className="flex flex-col space-y-6 p-6 bg-blue-500/10 backdrop-blur-md rounded-2xl border border-blue-500/20 transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ImageUploader title="Gambar Referensi 1" onImageUpload={handleImageUpload1} previewUrl={originalImageBase64_1} />
                <ImageUploader title="Gambar Referensi 2 (Opsional)" onImageUpload={handleImageUpload2} previewUrl={originalImageBase64_2} />
            </div>
            
            <PromptInput prompt={prompt} setPrompt={setPrompt} isDisabled={isLoading} />
            
            {error && (
              <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-start space-x-2 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <button
              onClick={handleGenerateClick}
              disabled={!canGenerate || isLoading}
              className="w-full flex items-center justify-center px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:from-cyan-300 hover:to-blue-500 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none disabled:bg-gradient-to-r disabled:from-blue-800/50 disabled:to-blue-900/50"
            >
              <MagicWandIcon className="w-6 h-6 mr-2" />
              {isLoading ? 'Menghasilkan...' : 'Hasilkan Gambar'}
            </button>
          </div>

          {/* Right Column: Results */}
          <div className="relative w-full min-h-[400px] lg:min-h-0 p-6 bg-blue-500/10 backdrop-blur-md rounded-2xl border border-blue-500/20 transition-all duration-300 flex items-center justify-center">
             {isLoading && <Loader />}
            <ResultDisplay 
                generatedResult={generatedResult} 
                aspectRatio={aspectRatio}
                showResults={showResults}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
