export default function AnimalCardSkeleton() {
  return (
    <div className="animal-card" style={{ pointerEvents: 'none' }}>
      <div className="animal-card-image">
        <div className="shimmer" style={{ width: '100%', height: '100%' }}></div>
      </div>
      <div className="animal-card-body">
        <div className="shimmer" style={{ width: '60%', height: '20px', marginBottom: '12px', borderRadius: '4px' }}></div>
        <div className="shimmer" style={{ width: '80%', height: '14px', marginBottom: '8px', borderRadius: '4px' }}></div>
        <div className="shimmer" style={{ width: '40%', height: '14px', borderRadius: '4px' }}></div>
      </div>
    </div>
  )
}
