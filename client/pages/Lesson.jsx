import { Link, useParams } from 'react-router-dom'
import { getFAQById } from './FAQData.js'
import '../styles/common.css'
import './Lesson.css'

function Lesson() {
  const { lessonId } = useParams()
  const faq = getFAQById(faqId)

  if (!faq) {
    return (
      <section className="lesson-page">
        <div className="surface lesson-missing">
          <h1>Lesson not found</h1>
          <p className="muted">Try heading back to the lessons list.</p>
          <Link className="primary-btn" to="/FAQ">
            Back to FAQ
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="lesson-page">
      <div className="lesson-topbar">
        <Link className="ghost-btn" to="/FAQ">
          &lt; Back to FAQ
        </Link>
      </div>

      <div className="surface lesson-hero">
        <p className="lesson-eyebrow">{lesson.moduleTitle}</p>
        <h1 className="lesson-title">{lesson.title}</h1>
        <p className="lesson-subtitle">{lesson.shortDescription}</p>
        <div className="lesson-meta">
          {lesson.eta ? <span className="lesson-pill">~{lesson.eta}</span> : null}
          <span className="lesson-pill ghost">Guide</span>
        </div>
      </div>

      <div className="surface lesson-content">
        {lesson.content.map((paragraph, index) => (
          <p key={index} className="lesson-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

export default FAQ
