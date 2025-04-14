import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Feedback = () => {
  const context = useContext(AppContext)
  if (!context) return null
  const { questions } = context

  const score = questions.reduce((acc, q) => (q.userAnswer === q.answer ? acc + 1 : acc), 0)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <p className="mb-4">
        You scored {score} out of {questions.length}.
      </p>
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.id} className="border p-4 rounded">
            <p className="mb-2">
              <strong>Question {index + 1}:</strong>{' '}
              {q.text.replace('___', q.userAnswer || '______')}
            </p>
            {q.userAnswer === q.answer ? (
              <p className="text-green-500">Correct!</p>
            ) : (
              <div>
                <p className="text-red-500">
                  Incorrect. You answered: {q.userAnswer || 'No Answer'}
                </p>
                <p className="text-green-500">Correct answer: {q.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feedback
