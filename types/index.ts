export interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

export interface GeneratedImage {
  url: string;
  id: string;
  prompt: string;
  timestamp: Date;
}

export interface GenerationRequest {
  imageData: string;
  prompt: string;
}

export interface GenerationResponse {
  success: boolean;
  images?: GeneratedImage[];
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
}