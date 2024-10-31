'use client'

import { useQuestion } from '@/hooks/question'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/16/solid'
import {
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'

const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    <div className="bg-primary-400 rounded-full p-0.5">
      <img
        alt="Riadh Benchouche"
        src="/profile.jpeg"
        className="aspect-square size-10 rounded-full object-cover"
      />
    </div>
    <div className="w-16 rounded-xl rounded-es-sm bg-gray-200 px-3 py-2">
      <div className="flex space-x-1">
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
          style={{ animationDelay: '0ms' }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
          style={{ animationDelay: '150ms' }}
        />
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  </div>
)

const ChatBot = () => {
  const {
    question,
    questionLoading,
    questionError,
    updateQuestion,
    sendQuestion,
    messages,
    isTyping,
  } = useQuestion()

  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [question])

  // Handle Enter key to submit (Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (question.trim() && !questionLoading) {
        sendQuestion(e)
      }
    }
  }

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton
            aria-label="Open chat"
            title="Open chat"
            className="fixed bottom-8 right-8 z-10 rounded-full bg-gray-950 p-2.5 text-white shadow-sm hover:bg-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 md:bottom-10 md:right-10"
          >
            <ChatBubbleLeftEllipsisIcon
              className="h-7 w-7"
              aria-hidden="true"
            />
          </PopoverButton>
          <PopoverPanel className="fixed bottom-20 right-8 z-10 flex w-full max-w-max pb-2 md:bottom-24 md:right-10">
            <div className="w-80 flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5 md:w-full md:max-w-md">
              <div className="p-4">
                <div className="flex items-start justify-between rounded-3xl bg-gray-100 px-4 py-2.5">
                  <div className="flex flex-col items-start">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Need technical help?
                    </h3>
                    <p className="text-gray-500">
                      I&apos;m here to support you with your web development
                      questions
                    </p>
                  </div>
                  <button
                    className="bg-primary-400 hover:bg-primary-500 cursor-pointer rounded-full p-0.5"
                    onClick={close}
                    aria-label="Close chat"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-900" />
                  </button>
                </div>

                <div className="my-4 h-full max-h-[25rem] min-h-[19rem] space-y-3 overflow-y-auto scroll-smooth rounded-3xl border-[1px] border-gray-200 p-4">
                  {messages.map((msg, index) => (
                    <div key={index} className="flex flex-col space-x-3">
                      {msg.isBot ? (
                        <div className="flex items-end space-x-1">
                          <div className="bg-primary-400 rounded-full">
                            <img
                              alt="Riadh Benchouche"
                              src="/profile.jpeg"
                              className="aspect-square size-8 rounded-full object-cover"
                            />
                          </div>
                          <div className="w-fit max-w-[300px] rounded-xl rounded-es-sm bg-gray-200 px-3 py-2">
                            <p className="whitespace-pre-wrap text-sm font-medium text-gray-900">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end">
                          <div className="w-fit max-w-[300px] rounded-xl rounded-ee-sm bg-gray-950 px-3 py-2 text-end text-white">
                            <p className="whitespace-pre-wrap text-sm font-medium">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {questionLoading && !isTyping && (
                      <TypingIndicator />
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendQuestion} className="mt-4">
                  <div className="flex flex-1 items-end space-x-2">
                    <label htmlFor="question" className="sr-only">
                      Question
                    </label>
                    <textarea
                      ref={textareaRef}
                      id="question"
                      name="question"
                      rows={1}
                      className="block max-h-32 w-full resize-none rounded-2xl border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6922C5] sm:text-sm sm:leading-6"
                      value={question}
                      onChange={updateQuestion}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message"
                      disabled={questionLoading}
                    />
                    <button
                      type="submit"
                      className="flex rounded-full bg-gray-950 p-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={questionLoading || !question.trim()}
                      aria-label="Send message"
                    >
                      <PaperAirplaneIcon className="inline-block h-5 w-5" />
                    </button>
                  </div>
                  {questionError && (
                    <p className="mt-2 text-sm text-red-500">{questionError}</p>
                  )}
                </form>
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  )
}

export default ChatBot
