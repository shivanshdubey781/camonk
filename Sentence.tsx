import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Sentence = () => {
  const context = useContext(AppContext)
  if (!context) return null
  const { questions, currentQuestionIndex, updateUserAnswer } = context
  const currentQuestion = questions[currentQuestionIndex]

  // Split the sentence at "___" (assuming one blank per sentence)
  const parts = currentQuestion.text.split('___')
  const selected = currentQuestion.userAnswer || ''

  const handleBlankClick = () => {
    // Unselect the answer if the user clicks on the blank
    updateUserAnswer('')
  }

  return (
    <div className="text-xl mb-4">
      {parts[0]}
      <span
        className={`inline-block border-b-2 border-dashed px-2 cursor-pointer ${
          selected ? 'text-blue-500' : 'text-gray-400'
        }`}
        onClick={handleBlankClick}
      >
        {selected || '______'}
      </span>
      {parts[1]}
    </div>
  )
}

export default Sentence
