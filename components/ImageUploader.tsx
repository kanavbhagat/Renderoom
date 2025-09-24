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
        className={`upload-zone ${isDragActive ? 'active' : ''}`}
      >
        <input
          type="file"
          id="file-upload"
          className="sr-only"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload Product Image
            </h3>
            <p className="text-gray-500 mb-2">
              Drag and drop your image here, or click to browse
            </p>
            <p className="text-sm text-gray-400">
              Supports JPEG, PNG, WebP (Max 10MB)
            </p>
          </div>
        </label>
      </div>

      {uploadError && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
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
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Upload Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{uploadError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Tips for best results:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use clear, high-resolution images</li>
          <li>• Ensure the product is the main focus</li>
          <li>• Avoid cluttered backgrounds</li>
          <li>• Good lighting improves AI generation quality</li>
        </ul>
      </div>
    </div>
  )
}