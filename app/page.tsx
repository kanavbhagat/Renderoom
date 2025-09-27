'use client'

import { useState } from 'react'
import Image from 'next/image'
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
    <>
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          {/* Hero Section */}
          <section className="hero">
            <h1 className="hero-title">
              Transform Products into
              <br />
              <span style={{ background: 'linear-gradient(135deg, var(--primary-orange), var(--accent-pink))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Studio Magic</span>
            </h1>
            <p className="hero-subtitle">
              Upload any product photo and watch our AI create 4 breathtaking studio shots with professional lighting, angles, and backgrounds.
            </p>

            {/* Star Rating */}
            <div className="hero-rating">
              <div className="stars">★★★★★</div>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Trusted by 1,000+ creators worldwide</span>
            </div>

            {/* Stats Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '48px',
              marginBottom: '40px',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary-orange)', marginBottom: '4px' }}>50K+</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Photos Generated</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary-purple)', marginBottom: '4px' }}>30s</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Average Time</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent-pink)', marginBottom: '4px' }}>4K</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Resolution</div>
              </div>
            </div>

            {/* Upload or Results Section */}
            {!uploadedImage ? (
              <section className="upload-section">
                <div className="glass-card">
                  <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px', background: 'linear-gradient(135deg, var(--text-primary), var(--primary-purple))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Ready to Create Magic?
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Drop your product image below and watch the transformation</p>
                  </div>
                  <ImageUploader onImageUpload={handleImageUpload} />
                </div>
              </section>
            ) : (
              <section className="results-section">
                <div className="glass-card" style={{ padding: '32px' }}>
                  <div className="results-grid">
                    {/* Original Image */}
                    <div>
                      <h3 className="result-title">Original Image</h3>
                      <div className="result-card">
                        <Image
                          src={uploadedImage.preview}
                          alt="Uploaded product"
                          className="image-preview"
                          width={400}
                          height={400}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </div>

                    {/* Generated Results */}
                    <div>
                      <h3 className="result-title">Professional Results</h3>
                      {isGenerating ? (
                        <div className="loading-container">
                          <LoadingSpinner />
                          <div className="loading-text">Creating studio magic...</div>
                          <div className="loading-subtext">Transforming your product</div>
                        </div>
                      ) : generatedImages.length > 0 ? (
                        <div className="result-card">
                          <ImageGallery images={generatedImages} />
                        </div>
                      ) : (
                        <div className="loading-container">
                          <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(34, 197, 94, 0.2))',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px'
                          }}>
                            <svg width="32" height="32" fill="none" stroke="var(--primary-green)" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="loading-text">Ready to create magic</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="button-group">
                    <button
                      onClick={handleGenerateImages}
                      disabled={isGenerating}
                      className={`glass-button-primary ${isGenerating ? '' : ''}`}
                      style={{ opacity: isGenerating ? 0.5 : 1, cursor: isGenerating ? 'not-allowed' : 'pointer' }}
                    >
                      {isGenerating ? (
                        <>
                          <div className="spinner" style={{ width: '20px', height: '20px', margin: '0 8px 0 0' }}></div>
                          Creating Studio Magic...
                        </>
                      ) : (
                        <>
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Generate Professional Photos
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setUploadedImage(null)
                        setGeneratedImages([])
                        setError(null)
                      }}
                      className="glass-button"
                    >
                      Upload New Image
                    </button>
                  </div>

                  {error && (
                    <div className="error-message">
                      {error}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Process Steps */}
            <section style={{ marginBottom: '80px' }}>
              <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '700', marginBottom: '60px', color: 'var(--text-primary)' }}>
                How It Works
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--primary-purple), var(--secondary-purple))', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: 'var(--shadow-purple)' }}>📸</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>1. Upload</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Drop your product image and our AI analyzes every detail</p>
                </div>
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--primary-orange), var(--secondary-orange))', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: 'var(--shadow-orange)' }}>✨</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>2. Transform</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Advanced AI creates 4 studio-quality variations with perfect lighting</p>
                </div>
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--accent-pink), var(--primary-purple))', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)' }}>🚀</div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-primary)' }}>3. Download</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Get high-res images ready for your store, ads, or social media</p>
                </div>
              </div>
            </section>

            {/* Feature Cards */}
            <section className="features">
              <div className="feature-card">
                <span className="feature-icon">⚡</span>
                <h3 className="feature-title">Lightning Fast</h3>
                <p className="feature-description">
                  Generate 4 professional shots in under 30 seconds. No waiting, just instant magic.
                </p>
              </div>

              <div className="feature-card">
                <span className="feature-icon">🎨</span>
                <h3 className="feature-title">Studio Quality</h3>
                <p className="feature-description">
                  AI-powered lighting, shadows, and angles that rival $10,000 photography setups.
                </p>
              </div>

              <div className="feature-card">
                <span className="feature-icon">💎</span>
                <h3 className="feature-title">Premium Results</h3>
                <p className="feature-description">
                  4K resolution images perfect for e-commerce, marketing, and social media.
                </p>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  )
}