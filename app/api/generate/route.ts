import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import mime from 'mime'
import { GeneratedImage } from '@/types'

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

    console.log('Starting professional image generation...')

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    })

    // Use image generation model when quota allows, fallback to demo for testing
    const model = 'gemini-2.5-flash-image-preview'

    console.log('Note: If you see quota errors, your Gemini API free tier limit has been reached.')

    // Professional studio prompts for 4 different angles
    const studioPrompts = [
      `Transform this product into a professional e-commerce photograph with high-end studio lighting, front-facing angle, clean white background, commercial quality, sharp details, soft shadows, perfect lighting, marketing ready, professional product photography`,

      `Transform this product into a professional e-commerce photograph with studio lighting from 45-degree angle, three-quarter view, pristine white background, commercial grade photography, crisp details, subtle shadows, catalog style, high-resolution`,

      `Transform this product into a professional e-commerce photograph with top-down overhead view, even studio lighting, pure white background, clean minimalist style, sharp focus, e-commerce ready, professional commercial photography`,

      `Transform this product into a professional e-commerce photograph with side profile view, dramatic studio lighting, clean white background, high-end commercial quality, detailed textures, luxury presentation, professional marketing photography`
    ]

    const generatedImages: GeneratedImage[] = []

    // Generate 4 professional images with different angles
    for (let i = 0; i < studioPrompts.length; i++) {
      try {
        console.log(`Generating professional studio image ${i + 1}/4...`)

        const config = {
          responseModalities: ['IMAGE', 'TEXT']
        }

        const contents = [
          {
            role: 'user',
            parts: [
              {
                text: studioPrompts[i]
              },
              {
                inlineData: {
                  mimeType: imageData.split(';')[0].split(':')[1],
                  data: imageData.split(',')[1]
                }
              }
            ]
          }
        ]

        console.log(`Sending request to Gemini for image ${i + 1}...`)

        const response = await ai.models.generateContentStream({
          model,
          config,
          contents
        })

        let generatedImageData: string | null = null

        // Process the streaming response
        for await (const chunk of response) {
          if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
            continue
          }

          // Check for generated image data
          if (chunk.candidates[0].content.parts[0].inlineData) {
            const inlineData = chunk.candidates[0].content.parts[0].inlineData
            const mimeType = inlineData.mimeType || 'image/png'
            const base64Data = inlineData.data || ''

            // Convert to data URL format
            generatedImageData = `data:${mimeType};base64,${base64Data}`
            console.log(`Successfully received generated image ${i + 1}`)
            break
          } else if (chunk.text) {
            console.log(`Gemini response text for image ${i + 1}:`, chunk.text)
          }
        }

        if (generatedImageData) {
          const generatedImage: GeneratedImage = {
            id: `studio_professional_${i + 1}_${Date.now()}`,
            url: generatedImageData,
            prompt: studioPrompts[i],
            timestamp: new Date()
          }

          generatedImages.push(generatedImage)
          console.log(`Successfully generated professional image ${i + 1}/4`)
        } else {
          console.log(`No image data received for professional image ${i + 1}`)
        }

        // Add delay between requests to avoid rate limiting
        if (i < studioPrompts.length - 1) {
          console.log(`Waiting 3 seconds before next generation...`)
          await new Promise(resolve => setTimeout(resolve, 3000))
        }

      } catch (error) {
        console.error(`Error generating professional image ${i + 1}:`, error)

        // Check if it's a quota error
        const errorMessage = error instanceof Error ? error.message : String(error)
        if (errorMessage.includes('quota') || errorMessage.includes('429')) {
          console.log('Quota exceeded - this is expected with Gemini free tier limits')
          // Break the loop since all subsequent requests will also fail
          break
        }
        // Continue with other generations for other types of errors
      }
    }

    if (generatedImages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to generate any professional studio images. The Gemini image generation service may be temporarily unavailable. Please try again in a few moments.'
        },
        { status: 500 }
      )
    }

    console.log(`Successfully generated ${generatedImages.length}/4 professional studio images`)

    return NextResponse.json({
      success: true,
      images: generatedImages,
      message: `Successfully transformed your product photo into ${generatedImages.length} professional studio images`
    })

  } catch (error) {
    console.error('Professional image generation error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate professional studio images'
      },
      { status: 500 }
    )
  }
}