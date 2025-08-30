
import React from 'react';
import { ImageIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File, base64: string) => void;
  previewUrl: string | null;
  title: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl, title }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        if (base64String) {
          onImageUpload(file, base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <div
        onClick={handleAreaClick}
        className="relative w-full aspect-square bg-blue-500/10 rounded-xl flex flex-col justify-center items-center text-center p-4 cursor-pointer hover:bg-blue-500/20 transition-all duration-300"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {previewUrl ? (
          <img src={previewUrl} alt="Pratinjau" className="w-full h-full object-contain rounded-lg" />
        ) : (
          <>
            <ImageIcon className="w-16 h-16 text-blue-200/50 mb-4" />
            <p className="text-white font-semibold">Klik untuk mengunggah gambar</p>
            <p className="text-sm text-blue-200 mt-1">PNG, JPG, atau WEBP</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;