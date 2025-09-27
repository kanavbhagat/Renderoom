'use client'

export default function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <div className="spinner"></div>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'rgba(0, 255, 136, 0.1)',
          filter: 'blur(8px)',
          animation: 'pulse 2s ease-in-out infinite'
        }}></div>
      </div>
      <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '12px',
          height: '12px',
          background: 'var(--primary-green)',
          borderRadius: '50%',
          animation: 'bounce 1.4s ease-in-out infinite both',
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
        }}></div>
        <div style={{
          width: '12px',
          height: '12px',
          background: 'var(--primary-green)',
          borderRadius: '50%',
          animation: 'bounce 1.4s ease-in-out infinite both',
          animationDelay: '0.2s',
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
        }}></div>
        <div style={{
          width: '12px',
          height: '12px',
          background: 'var(--primary-green)',
          borderRadius: '50%',
          animation: 'bounce 1.4s ease-in-out infinite both',
          animationDelay: '0.4s',
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  )
}