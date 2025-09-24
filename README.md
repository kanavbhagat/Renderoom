# AI Product Image Generator

A modern web application that uses AI to generate professional product images for e-commerce stores. Built with Next.js, TypeScript, Tailwind CSS, and Google's Gemini AI.

![AI Product Image Generator](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&crop=center)

## 🚀 Features

- **AI-Powered Image Generation**: Upload a product photo and generate 4 professional variations with studio lighting
- **Drag & Drop Upload**: Easy file upload with validation and preview
- **Professional UI**: Clean, responsive design built with Tailwind CSS
- **Download Functionality**: Download individual images or all at once
- **Real-time Processing**: Loading states and progress indicators
- **Vercel Ready**: Optimized for deployment on Vercel

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel
- **File Handling**: Native HTML5 File API

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd product-image-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Add your Gemini API key to `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `GEMINI_API_KEY`: Your Google Gemini API key

3. **Configure Environment Variables**
   In your Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add `GEMINI_API_KEY` with your actual API key
   - Deploy

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI image processing | Yes |
| `NEXTAUTH_SECRET` | Secret for authentication (if using auth) | No |
| `NEXTAUTH_URL` | Base URL for the application | No |

### API Limits

- Max file size: 10MB
- Supported formats: JPEG, PNG, WebP
- Generation time: ~15-30 seconds for 4 images
- Rate limits: Based on your Gemini API quota

## 🎨 Usage

1. **Upload a Product Image**
   - Drag and drop an image or click to browse
   - Supported formats: JPEG, PNG, WebP (max 10MB)

2. **Generate Professional Images**
   - Click "Generate Professional Images"
   - Wait for AI processing (15-30 seconds)

3. **Download Results**
   - Preview generated images
   - Download individual images or all at once
   - Images are optimized for e-commerce use

## 🏗️ Project Structure

```
product-image-generator/
├── app/
│   ├── api/generate/       # API routes for image generation
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── ImageUploader.tsx   # File upload component
│   ├── ImageGallery.tsx    # Results display
│   └── LoadingSpinner.tsx  # Loading states
├── types/
│   └── index.ts            # TypeScript type definitions
├── public/                 # Static assets
└── README.md
```

## 🔍 How It Works

1. **Image Upload**: User uploads a product image through the drag-and-drop interface
2. **AI Processing**: Image is sent to Google Gemini AI with studio lighting prompts
3. **Generation**: AI generates 4 variations with different lighting styles:
   - Soft studio lighting from left side
   - Dramatic lighting with subtle shadows
   - Bright even lighting from multiple angles
   - Warm lighting highlighting product texture
4. **Results**: Generated images are displayed in a responsive gallery
5. **Download**: Users can download individual images or all at once

## 🚨 Important Notes

- **API Keys**: Never commit API keys to version control
- **Image Generation**: Current implementation uses mock images for demo purposes
- **Production**: For real image generation, integrate with services like:
  - Google's Imagen API
  - OpenAI's DALL-E
  - Stability AI's Stable Diffusion
  - Midjourney API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- Create an issue for bug reports
- Start a discussion for feature requests
- Check the documentation for common questions

---

**Built with ❤️ using Next.js and Google Gemini AI**