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
      gitsnack-button-primary
    `,
    secondary: `
      gitsnack-button
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