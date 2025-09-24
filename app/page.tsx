'use client'

import { useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import ImageGallery from '@/components/ImageGallery'
import LoadingSpinner from '@/components/LoadingSpinner'
import { UploadedImage, GeneratedImage } from '@/types'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (image: UploadedImage) => {
    setUploadedImage(image)
    setGeneratedImages([])
    setError(null)
  }

  const handleGenerateImages = async () => {
    if (!uploadedImage) return

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: uploadedImage.preview,
          prompt: 'Generate 4 professional product photos with studio lighting in different angles and compositions'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate images')
      }

      if (data.success && data.images) {
        setGeneratedImages(data.images)
      } else {
        throw new Error('No images generated')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Generate Professional
            <span className="text-blue-600"> Product Images</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Upload your product photo and let AI create stunning professional images with studio lighting for your e-commerce store.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600">
                ✨ Powered by Gemini AI
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Section */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Product</h2>
            <ImageUploader onImageUpload={handleImageUpload} />

            {uploadedImage && (
              <div className="mt-6">
                <div className="relative">
                  <img
                    src={uploadedImage.preview}
                    alt="Uploaded product"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                </div>
                <button
                  onClick={handleGenerateImages}
                  disabled={isGenerating}
                  className="mt-4 w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generating Images...' : 'Generate Professional Images'}
                </button>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Generated Images</h2>

            {isGenerating && (
              <div className="flex flex-col items-center justify-center py-12">
                <LoadingSpinner />
                <p className="mt-4 text-gray-600">Creating professional images...</p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error generating images
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {generatedImages.length > 0 && (
              <ImageGallery images={generatedImages} />
            )}

            {!isGenerating && !error && generatedImages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No images generated yet</h3>
                <p className="text-gray-500">Upload a product image to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Use AI Product Images?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600">No need for expensive photography equipment or professional photographers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Results</h3>
              <p className="text-gray-600">Generate professional images in minutes, not days</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600">Studio-quality lighting and composition powered by AI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}