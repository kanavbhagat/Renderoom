'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-solid rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 border-solid rounded-full border-t-transparent absolute left-0 top-0 animate-spin"></div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}