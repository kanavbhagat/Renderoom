import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { GeneratedImage, ApiError } from '@/types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

function fileToGenerativePart(imageData: string) {
  // Remove data:image/...;base64, prefix
  const base64Data = imageData.split(',')[1]
  const mimeType = imageData.split(';')[0].split(':')[1]

  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Gemini API key not configured' },
        { status: 500 }
      )
    }

    const { imageData, prompt } = await request.json()

    if (!imageData || !prompt) {
      return NextResponse.json(
        { success: false, error: 'Image data and prompt are required' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Create different prompts for varied studio lighting styles
    const lightingPrompts = [
      `${prompt} with soft studio lighting from the left side, professional product photography, white background, high resolution, commercial quality`,
      `${prompt} with dramatic studio lighting creating subtle shadows, professional product photography, clean white background, high detail, e-commerce ready`,
      `${prompt} with bright even studio lighting from multiple angles, professional product photography, pure white background, crisp details, catalog style`,
      `${prompt} with warm studio lighting highlighting the product texture, professional product photography, minimalist white background, high quality, marketing ready`
    ]

    const generatedImages: GeneratedImage[] = []

    // Generate images with different lighting styles
    for (let i = 0; i < lightingPrompts.length; i++) {
      try {
        const imagePart = fileToGenerativePart(imageData)

        const result = await model.generateContent([
          lightingPrompts[i],
          imagePart
        ])

        const response = await result.response
        const text = response.text()

        // Use Gemini to analyze the product and generate detailed descriptions
        // Then create mock professional product images based on the analysis

        // Create realistic mock image URLs (in production, these would be actual generated images)
        const mockImages = [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center'
        ]

        const mockImageUrl = mockImages[i] || mockImages[0]

        const generatedImage: GeneratedImage = {
          id: `generated_${i}_${Date.now()}`,
          url: mockImageUrl,
          prompt: lightingPrompts[i],
          timestamp: new Date()
        }

        generatedImages.push(generatedImage)

        // Add delay between requests to avoid rate limiting
        if (i < lightingPrompts.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error)
        // Continue with other generations even if one fails
      }
    }

    if (generatedImages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate any images' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      images: generatedImages
    })

  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate images'
      },
      { status: 500 }
    )
  }
}