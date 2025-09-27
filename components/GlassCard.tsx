'use client'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div className={`
      gitsnack-card p-6
      ${hover ? 'hover:scale-105' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}