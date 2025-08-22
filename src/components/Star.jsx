import './Star.css'

const Star = ({ id, x, y, size, content, onClick, isClicked }) => {
  const handleClick = () => {
    onClick(content, id)
  }

  return (
    <div
      className={`star ${isClicked ? 'clicked' : ''}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size * 4}px`,
        height: `${size * 4}px`,
        animationDelay: `${(x + y) % 5}s`,
        animationDuration: `${3 + (size % 3)}s`
      }}
      onClick={handleClick}
    >
      <div className="star-inner"></div>
    </div>
  )
}

export default Star