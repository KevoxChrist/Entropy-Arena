import { Link } from 'react-router-dom'
import '../../styles/common.css'
import '../../styles/FAQCard.css'

function LessonCard({ lesson, isOpen, onToggle }) {
  const { id, title, shortDescription, eta } = lesson

  return (
    <article className={`lesson-card ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="lesson-card__header"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
      >
        <span className="lesson-card__title">{title}</span>
        <span className={`lesson-card__chevron ${isOpen ? 'open' : ''}`}>
          {isOpen ? '^' : 'v'}
        </span>
      </button>
      {isOpen ? (
        <div className="lesson-card__body">
          <p className="lesson-card__summary">{shortDescription}</p>
          <div className="lesson-card__footer">
            {eta ? <span className="lesson-pill">~{eta}</span> : null}
          </div>
        </div>
      ) : null}
    </article>
  )
}

export default LessonCard
