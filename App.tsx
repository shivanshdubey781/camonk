import React, { useEffect, useContext } from 'react'
import { AppContext, AppProvider } from './context/AppContext'
import Sentence from './components/Sentence'
import Options from './components/Options'
import Timer from './components/Timer'
import Feedback from './components/Feedback'

const Quiz = () => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex } = useContext(AppContext)!
  const currentQuestion = questions[currentQuestionIndex]

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleTimeUp = () => {
    handleNext()
  }

  // Next button enabled only when the question is answered
  const isAnswered = currentQuestion.userAnswer && currentQuestion.userAnswer !== ''

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Timer onTimeUp={handleTimeUp} />
      <Sentence />
      <Options />
      <button
        onClick={handleNext}
        disabled={!isAnswered}
        className={`mt-4 px-4 py-2 rounded ${
          isAnswered
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  )
}

const App = () => {
  const { questions, setQuestions, currentQuestionIndex } = useContext(AppContext)!

  useEffect(() => {
    // Fetch questions from API.
    // For demonstration, fallback to dummy data if the fetch fails.
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://tools.camonk.com/api/sentence-construction-questions')
        const data = await response.json()
        setQuestions(data)
      } catch (error) {
        console.error('Error fetching questions, using fallback data:', error)
        setQuestions([
          {
            id: 1,
            text: 'The ___ barked loudly.',
            options: ['dog', 'cat', 'bird', 'car'],
            answer: 'dog',
          },
          {
            id: 2,
            text: 'She loves to eat ___ for breakfast.',
            options: ['pasta', 'cereal', 'salad', 'soup'],
            answer: 'cereal',
          },
          // Add more questions as needed
        ])
      }
    }
    fetchQuestions()
  }, [setQuestions])

  // Show a loading indicator until questions are loaded
  if (questions.length === 0) {
    return <div className="p-4">Loading...</div>
  }

  // Once all questions are answered, show the feedback screen.
  if (currentQuestionIndex >= questions.length) {
    return <Feedback />
  }

  return <Quiz />
}

const AppWrapper = () => (
  <AppProvider>
    <App />
  </AppProvider>
)

export default AppWrapper
