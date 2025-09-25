'use client'

interface GlassButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary'
}

export default function GlassButton({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary'
}: GlassButtonProps) {
  const baseClasses = `
    font-medium py-3 px-6 rounded-2xl transition-all duration-500 ease-in-out
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${!disabled ? 'hover:scale-105 hover:shadow-2xl' : ''}
  `

  const variantClasses = {
    primary: `
      glass-button
      ${!disabled ? 'hover:bg-green-500/30 hover:border-green-400/50' : ''}
    `,
    secondary: `
      backdrop-blur-md bg-white/10 border border-white/20 text-white
      ${!disabled ? 'hover:bg-white/20 hover:border-white/30' : ''}
    `
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  )
}