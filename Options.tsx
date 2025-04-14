import React, { useContext } from 'react'
import { AppContext } from 'AppContext.tsx'

const Options = () => {
  const context = useContext(AppContext)
  if (!context) return null
  const { questions, currentQuestionIndex, updateUserAnswer } = context
  const currentQuestion = questions[currentQuestionIndex]
  const selected = currentQuestion.userAnswer || ''

  const handleOptionClick = (option: string) => {
    // Set the answer only if there's no answer selected (modify as needed)
    if (!selected) {
      updateUserAnswer(option)
    }
  }

  return (
    <div className="flex space-x-4">
      {currentQuestion.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(option)}
          // Disable if an answer is already chosen to force using the unselect feature
          disabled={selected !== ''}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
