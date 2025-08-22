import './SecretStar.css'

const SecretStar = ({ onClick }) => {
  return (
    <div
      className="secret-star"
      style={{
        left: '50%',
        top: '50%'
      }}
      onClick={onClick}
    >
      <div className="secret-star-inner">
        <div className="star-core"></div>
        <div className="star-rays">
          <div className="ray ray-1"></div>
          <div className="ray ray-2"></div>
          <div className="ray ray-3"></div>
          <div className="ray ray-4"></div>
        </div>
        <div className="star-glows">
          <div className="glow glow-1"></div>
          <div className="glow glow-2"></div>
          <div className="glow glow-3"></div>
        </div>
      </div>
      <div className="secret-star-particles">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="particle" style={{
            animationDelay: `${i * 0.2}s`
          }}></div>
        ))}
      </div>
    </div>
  )
}

export default SecretStar