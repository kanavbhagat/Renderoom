'use client'

export default function AnimatedBackground() {
  return (
    <>
      {/* GitSnack-inspired atmospheric background */}
      <div className="gitsnack-background">
        {/* Atmospheric green glow orbs */}
        <div className="green-glow-orb orb-1" />
        <div className="green-glow-orb orb-2" />
        <div className="green-glow-orb orb-3" />

        {/* Grid pattern overlay */}
        <div className="grid-pattern" />
      </div>
    </>
  )
}