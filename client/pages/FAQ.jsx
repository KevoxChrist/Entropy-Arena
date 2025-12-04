import { useState } from 'react'
import LessonCard from '../components/lessons/LessonCard.jsx'
import { faqItems, moduleInfo } from './FAQData.js'
import '../styles/common.css'
import '../styles/FAQ.css'

function FAQ() {
  const [openItemId, setOpenItemId] = useState(faqItems[0]?.id ?? null)

  const handleToggle = (itemId) => {
    setOpenItemId((current) => (current === itemId ? null : itemId))
  }

  return (
    <section className="lessons-page">
      <div className="surface module-card">
        <h1 className="module-title">{moduleInfo.title}</h1>
        <p className="module-subtitle">{moduleInfo.subtitle}</p>
      </div>

      <div className="surface lesson-collection">
        {faqItems.map((item) => (
          <LessonCard
            key={item.id}
            lesson={item}
            isOpen={openItemId === item.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </section>
  )
}

export default FAQ
