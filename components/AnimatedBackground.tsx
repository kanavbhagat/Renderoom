'use client'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="animated-background absolute inset-0" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl float" style={{ animationDelay: '4s' }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5"
           style={{
             backgroundImage: `
               linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }}
      />
    </div>
  )
}