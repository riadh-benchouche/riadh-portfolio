import {
  type ChangeEventHandler,
  type FormEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const useQuestion = () => {
  const [question, setQuestion] = useState('')
  const [questionLoading, setQuestionLoading] = useState(false)
  const [questionError, setQuestionError] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<
    { content: string; isBot: boolean }[]
  >([{ content: 'Hello! How can I help you?', isBot: true }])

  // Ref to store the current message being streamed
  const currentStreamedContent = useRef('')

  const updateQuestion: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (event) => {
      setQuestion(event.target.value)
    },
    [],
  )

  const handleStream = useCallback(async (response: Response) => {
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    // Add an empty bot message that we'll update as we receive chunks
    setMessages((prev) => [...prev, { content: '', isBot: true }])
    setIsTyping(true)

    try {
      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        // Process the chunk
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(5)

            if (data === '[DONE]') {
              setIsTyping(false)
              break
            }

            try {
              currentStreamedContent.current += data
              // Try parsing the accumulated content
              const parsed = JSON.parse(currentStreamedContent.current)

              // Update the last message by appending the new content
              setMessages((prev) => {
                const lastMessage = prev[prev.length - 1]
                return [
                  ...prev.slice(0, -1),
                  {
                    content: lastMessage.content + parsed.content,
                    isBot: true,
                  },
                ]
              })

              currentStreamedContent.current = ''
              await delay(100)
            } catch (e) {
              // If parsing fails, continue accumulating
              console.error('Error parsing streaming chunk:', e)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error reading stream:', error)
      throw error
    } finally {
      // Reset the streamed content
      currentStreamedContent.current = ''
      setIsTyping(false)
    }
  }, [])

  const sendQuestion: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault()
      setQuestionLoading(true)
      setQuestionError(null)
      setQuestion('')

      // Add user message immediately
      setMessages((prev) => [...prev, { content: question, isBot: false }])

      try {
        const response = await fetch('/api/question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question }),
        })

        if (!response.ok) {
          throw new Error(
            'Une erreur est survenue, merci de réessayer ultérieurement',
          )
        }

        // Handle the streaming response
        await handleStream(response)
      } catch (error) {
        setQuestionError(error instanceof Error ? error.message : String(error))

        // Remove the empty bot message if there was an error
        setMessages((prev) => {
          if (
            prev[prev.length - 1].isBot &&
            prev[prev.length - 1].content === ''
          ) {
            return prev.slice(0, -1)
          }
          return prev
        })
      } finally {
        setQuestionLoading(false)
      }
    },
    [question, handleStream],
  )

  return {
    question,
    messages,
    questionLoading,
    questionError,
    updateQuestion,
    sendQuestion,
    isTyping,
  }
}
