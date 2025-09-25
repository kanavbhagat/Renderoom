'use client'

import { useCallback, useState } from 'react'
import { UploadedImage } from '@/types'

interface ImageUploaderProps {
  onImageUpload: (image: UploadedImage) => void
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a valid image file (JPEG, PNG, WebP)'
    }

    if (file.size > maxSize) {
      return 'File size must be less than 10MB'
    }

    return null
  }

  const processFile = useCallback((file: File) => {
    const error = validateFile(file)
    if (error) {
      setUploadError(error)
      return
    }

    setUploadError(null)
    const reader = new FileReader()

    reader.onload = (e) => {
      const preview = e.target?.result as string
      const uploadedImage: UploadedImage = {
        file,
        preview,
        id: Math.random().toString(36).substring(7)
      }
      onImageUpload(uploadedImage)
    }

    reader.readAsDataURL(file)
  }, [onImageUpload])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      processFile(files[0])
    }
  }, [processFile])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
  }, [])

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          backdrop-blur-md border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300
          ${isDragActive
            ? 'border-green-400/60 bg-green-500/10'
            : 'border-white/20 hover:border-green-400/40 hover:bg-white/5'
          }
        `}
      >
        <input
          type="file"
          id="file-upload"
          className="sr-only"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Upload Product Image
            </h3>
            <p className="text-gray-300 mb-4 text-lg">
              Drag and drop your image here, or click to browse
            </p>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl px-4 py-2 border border-white/20">
              <p className="text-sm text-gray-400">
                Supports JPEG, PNG, WebP (Max 10MB)
              </p>
            </div>
          </div>
        </label>
      </div>

      {uploadError && (
        <div className="mt-6 backdrop-blur-md bg-red-500/20 border border-red-400/30 rounded-2xl p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-200">Upload Error</h3>
              <p className="mt-1 text-sm text-red-300">{uploadError}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-white mb-4">✨ Tips for best results:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Clear & High Resolution</p>
                <p className="text-gray-400 text-sm">Use sharp, well-lit product photos</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Product Focused</p>
                <p className="text-gray-400 text-sm">Product should be the main subject</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Clean Background</p>
                <p className="text-gray-400 text-sm">Avoid cluttered or busy backgrounds</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Good Lighting</p>
                <p className="text-gray-400 text-sm">Better input = better AI results</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}