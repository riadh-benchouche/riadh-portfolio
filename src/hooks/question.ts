import { questionReponseSchema } from '@/sanity/schemaTypes/question'
import {
  type ChangeEventHandler,
  type FormEventHandler,
  useCallback,
  useState,
} from 'react'

export const useQuestion = () => {
  const [question, setQuestion] = useState('')
  const [questionLoading, setQuestionLoading] = useState(false)
  const [questionError, setQuestionError] = useState<string | null>(null)
  const [messages, setMessages] = useState<
    { content: string; isBot: boolean }[]
  >([{ content: 'Hello! How can I help you?', isBot: true }])

  const updateQuestion: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      setQuestion(event.target.value)
    },
    [],
  )

  const sendQuestion: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault()
      setQuestionLoading(true)
      setQuestionError(null)
      setQuestion('')

      setMessages((prev) => [...prev, { content: question, isBot: false }])

      try {
        const response = await fetch('/api/question', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question }),
        })

        if (!response.ok) {
          throw new Error(
            'Une erreur est survenue, merci de réessayer ultérieurement',
          )
        }

        const json = await response.json()
        const validation = questionReponseSchema.safeParse(json)

        if (!validation.success) {
          throw new Error(
            'Erreur lors de la récupération de la réponse du serveur',
          )
        }

        setMessages((prev: any) => [
          ...prev,
          { content: validation.data.answer, isBot: true },
        ])
      } catch (error) {
        setQuestionError(error instanceof Error ? error.message : String(error))
      } finally {
        setQuestionLoading(false)
      }
    },
    [question],
  )

  return {
    question,
    messages,
    questionLoading,
    questionError,
    updateQuestion,
    sendQuestion,
  }
}
