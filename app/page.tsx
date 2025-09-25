'use client'

import { useState } from 'react'
import GlassCard from '@/components/GlassCard'
import GlassButton from '@/components/GlassButton'
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
          prompt: 'Transform this product image into professional e-commerce photos'
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
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Professional Product Photos
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Simply upload any product image and get 4 stunning studio-quality shots instantly.
            No photographer needed.
          </p>

          {/* Stars and Rating */}
          <div className="flex items-center justify-center space-x-2 mb-12">
            <div className="flex text-green-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-300 ml-2">Trusted by 1k+ e-commerce stores</span>
          </div>

          {/* Upload Section */}
          <GlassCard className="max-w-4xl mx-auto mb-12" hover={false}>
            {!uploadedImage ? (
              <div className="py-8">
                <ImageUploader onImageUpload={handleImageUpload} />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Original Image */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Original Image</h3>
                    <div className="relative group">
                      <img
                        src={uploadedImage.preview}
                        alt="Uploaded product"
                        className="w-full h-64 object-cover rounded-xl border border-white/20"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    </div>
                  </div>

                  {/* Generated Results Preview */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Professional Results</h3>
                    {isGenerating ? (
                      <div className="h-64 flex items-center justify-center backdrop-blur-md bg-white/5 rounded-xl border border-white/10">
                        <div className="text-center">
                          <LoadingSpinner />
                          <p className="mt-4 text-green-400">Creating studio magic...</p>
                          <p className="text-sm text-gray-400">Transforming your product</p>
                        </div>
                      </div>
                    ) : generatedImages.length > 0 ? (
                      <ImageGallery images={generatedImages} />
                    ) : (
                      <div className="h-64 flex items-center justify-center backdrop-blur-md bg-white/5 rounded-xl border border-white/10">
                        <div className="text-center text-gray-400">
                          <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <p>Ready to create magic</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <GlassButton
                    onClick={handleGenerateImages}
                    disabled={isGenerating}
                    className="px-12 py-4 text-lg font-semibold"
                  >
                    {isGenerating ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Creating Studio Magic...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Generate Professional Photos</span>
                      </div>
                    )}
                  </GlassButton>
                </div>

                {error && (
                  <div className="backdrop-blur-md bg-red-500/20 border border-red-400/30 rounded-2xl p-4 text-center">
                    <p className="text-red-200">{error}</p>
                  </div>
                )}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">⚡ Lightning Fast</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Generate 4 professional shots in under 60 seconds. No waiting, just instant results.
            </p>
          </div>

          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">🎨 Studio Quality</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              AI-powered lighting and angles that rival professional photography studios.
            </p>
          </div>

          <div className="feature-card text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">💰 Cost Effective</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Save thousands on product photography costs. One upload, infinite possibilities.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}