import { useState, useRef, useEffect } from 'react'
import './Modal.css'

const Modal = ({ content, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showReaction, setShowReaction] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const carouselRef = useRef(null)

  // Обработка свайпов для мобильных устройств
  useEffect(() => {
    if (content.type === 'memory' && carouselRef.current) {
      const carousel = carouselRef.current
      let startX = 0
      let endX = 0

      const handleTouchStart = (e) => {
        startX = e.touches[0].clientX
      }

      const handleTouchEnd = (e) => {
        endX = e.changedTouches[0].clientX
        handleSwipe()
      }

      const handleSwipe = () => {
        const swipeDistance = startX - endX
        const swipeThreshold = 50

        if (swipeDistance > swipeThreshold) {
          nextImage()
        } else if (swipeDistance < -swipeThreshold) {
          prevImage()
        }
      }

      carousel.addEventListener('touchstart', handleTouchStart)
      carousel.addEventListener('touchend', handleTouchEnd)

      return () => {
        carousel.removeEventListener('touchstart', handleTouchStart)
        carousel.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [content.type, currentImageIndex])

  // Обработка аудио
  useEffect(() => {
    if (content.type === 'audio' && audioRef.current) {
      const audio = audioRef.current
      
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleEnded = () => setIsPlaying(false)

      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
        
        // Пауза при закрытии модального окна
        if (isPlaying) {
          audio.pause()
        }
      }
    }
  }, [content.type, isPlaying])

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setShowReaction(true)
  }

  const resetQuiz = () => {
    setSelectedOption(null)
    setShowReaction(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === content.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? content.images.length - 1 : prevIndex - 1
    )
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(error => {
          console.error('Ошибка воспроизведения:', error)
        })
      }
    }
  }

  const renderContent = () => {
    switch (content.type) {
      case 'note':
        return (
          <div className="note-content">
            <p>{content.text}</p>
          </div>
        )
      
      case 'quiz':
        return (
          <div className="quiz-content">
            {/* Картинка вопроса (если есть) */}
            {content.questionImage && (
              <img 
                src={content.questionImage} 
                alt="Question" 
                className="quiz-question-image"
              />
            )}
            <h3>{content.question}</h3>
            
            {!showReaction ? (
              <div className="options">
                {content.options.map((option) => (
                  <button
                    key={option.id}
                    className="option-btn"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            ) : (
              <div className="quiz-result">
                {/* Картинка реакции (если есть) */}
                {selectedOption.reactionImage && (
                  <img 
                    src={selectedOption.reactionImage} 
                    alt="Reaction" 
                    className="quiz-reaction-image"
                  />
                )}
                <div className={`reaction ${selectedOption.correct ? 'correct' : 'incorrect'}`}>
                  {selectedOption.correct ? '✅ Правильно!' : '❌ Не совсем...'}
                </div>
                <p className="reaction-text">{selectedOption.reaction}</p>
                <button className="try-again-btn" onClick={resetQuiz}>
                  Попробовать еще раз
                </button>
              </div>
            )}
          </div>
        )
      
      case 'memory':
        return (
          <div className="memory-content">
            <div className="image-carousel" ref={carouselRef}>
              <div className="carousel-container">
                <img 
                  src={content.images[currentImageIndex]} 
                  alt={`Memory ${currentImageIndex + 1}`}
                  className="carousel-image"
                />
                
                {content.images.length > 1 && (
                  <>
                    <button 
                      className="carousel-btn carousel-prev"
                      onClick={prevImage}
                    >
                      ‹
                    </button>
                    <button 
                      className="carousel-btn carousel-next"
                      onClick={nextImage}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              
              {content.images.length > 1 && (
                <div className="carousel-dots">
                  {content.images.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => goToImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <p className="memory-caption">{content.caption}</p>
            <div className="image-counter">
              {currentImageIndex + 1} / {content.images.length}
            </div>
          </div>
        )
      
      case 'audio':
        return (
          <div className="audio-content">
            <h3 className="audio-title">{content.title}</h3>
            {content.description && (
              <p className="audio-description">{content.description}</p>
            )}
            
            <audio
              ref={audioRef}
              src={content.audioFile}
              preload="metadata"
              className="audio-element"
            />
            
            <div className="audio-controls">
              <button
                className={`audio-btn ${isPlaying ? 'pause' : 'play'}`}
                onClick={togglePlayPause}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              
              <div className="audio-info">
                <span className="audio-status">
                  {isPlaying ? 'Воспроизведение...' : 'На паузе'}
                </span>
              </div>
            </div>
          </div>
        )
      
      case 'secret':
        return (
          <div className="secret-content">
            <div className="secret-icon">💫</div>
            {content.image && (
              <img 
                src={content.image} 
                alt="Special memory" 
                className="secret-image"
              />
            )}
            <h2 className="secret-title">{content.text}</h2>
            <p className="secret-subtext">{content.subtext}</p>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        {renderContent()}
      </div>
    </div>
  )
}

export default Modal