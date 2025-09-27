# 🎨 Renderoom - AI Product Image Generator

Transform any product photo into **4 professional studio shots** instantly using advanced AI technology.

![Renderoom Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Gemini AI](https://img.shields.io/badge/Gemini-AI-purple)

## ✨ Features

- **🚀 Lightning Fast**: Generate 4 professional shots in under 30 seconds
- **🎨 Studio Quality**: AI-powered lighting, shadows, and angles that rival $10,000 photography setups
- **💎 Premium Results**: 4K resolution images perfect for e-commerce, marketing, and social media
- **📱 Fully Responsive**: Beautiful design that works on all devices
- **🌈 Modern UI**: Purple/orange gradient theme with glassmorphism effects

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.5.4 with TypeScript
- **Styling**: Pure CSS with glassmorphism and gradient effects
- **AI**: Google Gemini AI for image generation
- **File Handling**: Drag & drop with validation
- **Animations**: Custom CSS animations with spiral floating orbs

## 🎯 How It Works

1. **📸 Upload**: Drop your product image and our AI analyzes every detail
2. **✨ Transform**: Advanced AI creates 4 studio-quality variations with perfect lighting
3. **🚀 Download**: Get high-res images ready for your store, ads, or social media

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/renderoom-product-generator.git
   cd renderoom-product-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your Google Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Features

- **Purple & Orange Gradient Theme**: Inspired by modern design trends
- **Glassmorphism Effects**: Translucent cards with backdrop blur
- **Spiral Animations**: Floating orbs with rotating motion
- **Responsive Grid**: Perfect layout on mobile, tablet, and desktop
- **Smooth Transitions**: 400ms animations throughout the interface

## 📁 Project Structure

```
renderoom-product-generator/
├── app/
│   ├── api/generate/route.ts    # Gemini AI integration
│   ├── globals.css              # Pure CSS styling
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main application
├── components/
│   ├── ImageUploader.tsx        # Drag & drop upload
│   ├── ImageGallery.tsx         # Results display
│   ├── LoadingSpinner.tsx       # Loading animation
│   └── ...
├── types/
│   └── index.ts                 # TypeScript definitions
└── public/                      # Static assets
```

## 🌟 Key Components

### ImageUploader
- Drag & drop functionality
- File validation (JPEG, PNG, WebP, max 10MB)
- Responsive design with tips section

### ImageGallery
- Grid layout for generated images
- Modal view for full-size images
- Download individual or all images

### AI Integration
- Google Gemini AI for professional image generation
- Multiple prompt variations for diverse results
- Error handling and retry logic

## 🎯 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 📝 Environment Variables

```bash
GEMINI_API_KEY=your_gemini_api_key_here  # Required for AI image generation
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
- **Netlify**: Use `npm run build` and deploy the `out` folder
- **Railway**: Connect GitHub repo and add environment variables
- **Digital Ocean**: Use the app platform with Next.js preset

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- **Google Gemini AI** for powerful image generation
- **Next.js Team** for the amazing framework
- **Design Inspiration** from modern gradient UI trends

---

<div align="center">

**[🌟 Star this repo](https://github.com/YOUR_USERNAME/renderoom-product-generator)** if you found it helpful!

Made with ❤️ and **AI assistance from Claude Code**

</div>