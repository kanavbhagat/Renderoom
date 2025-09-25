'use client'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div className={`
      glass-card p-6
      ${hover ? 'hover:bg-white/10 hover:border-green-400/30 hover:scale-105' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}