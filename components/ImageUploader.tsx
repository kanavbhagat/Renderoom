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
        className={`upload-area ${isDragActive ? 'active' : ''}`}
      >
        <input
          type="file"
          id="file-upload"
          className="file-input"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="upload-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="upload-title">
              Upload Product Image
            </h3>
            <p className="upload-subtitle">
              Drag and drop your image here, or click to browse
            </p>
            <div className="upload-info">
              Supports JPEG, PNG, WebP (Max 10MB)
            </div>
          </div>
        </label>
      </div>

      {uploadError && (
        <div className="error-message">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flexShrink: 0 }}>
              <svg
                width="20"
                height="20"
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
            <div style={{ marginLeft: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Upload Error</h3>
              <p style={{ fontSize: '14px' }}>{uploadError}</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '32px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', textAlign: 'center', color: 'var(--text-primary)' }}>
          💡 Tips for best results
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px' }}>
          <div className="result-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'rgba(139, 95, 191, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="12" height="12" fill="none" stroke="var(--primary-purple)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '12px' }}>High Resolution</p>
            </div>
          </div>

          <div className="result-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'rgba(249, 115, 22, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="12" height="12" fill="none" stroke="var(--primary-orange)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '12px' }}>Product Focused</p>
            </div>
          </div>

          <div className="result-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'rgba(168, 85, 247, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="12" height="12" fill="none" stroke="var(--secondary-purple)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '12px' }}>Clean Background</p>
            </div>
          </div>

          <div className="result-card" style={{ padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: 'rgba(236, 72, 153, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="12" height="12" fill="none" stroke="var(--accent-pink)" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '12px' }}>Perfect Lighting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}