import { GoogleGenAI, Modality } from "@google/genai";
import { GenerationResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function fileToGenerativePart(base64: string, mimeType: string) {
  return {
    inlineData: {
      data: base64,
      mimeType
    },
  };
}

interface ImageInput {
    base64ImageData: string;
    mimeType: string;
}

export async function editImageWithGemini(
  images: ImageInput[],
  prompt: string
): Promise<GenerationResult> {
  try {
    const imageParts = images.map(img => fileToGenerativePart(img.base64ImageData, img.mimeType));
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: [{
        parts: [...imageParts, textPart],
      }],
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const result: GenerationResult = { image: null, text: null };
    const candidate = response.candidates?.[0];

    if (candidate && candidate.content && candidate.content.parts) {
      for (const part of candidate.content.parts) {
        if (part.text) {
          result.text = part.text;
        } else if (part.inlineData) {
          result.image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    } else {
        let reason = "tidak diketahui";
        if (candidate?.finishReason) {
            reason = `alasan: ${candidate.finishReason}`;
        }
        if (response.promptFeedback?.blockReason) {
            reason = `alasan: ${response.promptFeedback.blockReason}`;
        }
        throw new Error(`Model tidak menghasilkan konten. Kemungkinan ${reason}.`);
    }
    
    if (!result.image) {
        throw new Error("Model tidak mengembalikan gambar. Coba prompt yang berbeda.");
    }

    return result;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gagal menghasilkan gambar: ${error.message}`);
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat menghasilkan gambar.");
  }
}