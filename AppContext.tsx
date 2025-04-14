import React, { createContext, useState, ReactNode } from 'react'

export interface Question {
  id: number
  text: string           // Expects sentence with a "___" placeholder
  options: string[]
  answer: string         // Correct answer for the blank
  userAnswer?: string    // User's selected answer (optional)
}

interface AppContextType {
  questions: Question[]
  currentQuestionIndex: number
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>
  updateUserAnswer: (answer: string) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const updateUserAnswer = (answer: string) => {
    setQuestions(prev =>
      prev.map((q, index) => {
        if (index === currentQuestionIndex) {
          return { ...q, userAnswer: answer }
        }
        return q
      })
    )
  }

  return (
    <AppContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        setQuestions,
        setCurrentQuestionIndex,
        updateUserAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
