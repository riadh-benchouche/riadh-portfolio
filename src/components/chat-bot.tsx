'use client'

import { useQuestion } from '@/hooks/question'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/16/solid'
import {
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'

const ChatBot = () => {
  const {
    question,
    questionLoading,
    questionError,
    updateQuestion,
    sendQuestion,
    messages,
  } = useQuestion()

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton className="focus-visible:outline-secondary-600 fixed bottom-8 right-8 z-10 rounded-full bg-[#6922C5] p-2.5 text-white shadow-sm hover:bg-[#6A5ACD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:bottom-10 md:right-10">
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
                  <div
                    className="bg-primary-400 hover:bg-primary-500 cursor-pointer rounded-full p-0.5"
                    onClick={close}
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-900" />
                  </div>
                </div>

                <div className="my-4 h-full max-h-[25rem] min-h-[19rem] space-y-3 overflow-y-auto rounded-3xl border-[1px] border-gray-200 p-4">
                  {messages.map((msg, index) => (
                    <div key={index} className="flex flex-col space-x-3">
                      {msg.isBot ? (
                        <div className="flex items-center space-x-1">
                          <div className="bg-primary-400 rounded-full p-0.5">
                            <img
                              alt="Riadh Benchouche"
                              src="/profile.jpeg"
                              className="aspect-square size-10 rounded-full object-cover"
                            />
                          </div>
                          <div className="w-fit max-w-[300px] rounded-xl rounded-es-sm bg-gray-200 px-3 py-2">
                            <p className="text-sm font-medium text-gray-900">
                              {questionLoading ? '...' : msg.content}
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end">
                          <div className="w-fit max-w-[300px] rounded-xl rounded-ee-sm bg-[#6922C5] px-3 py-2 text-end text-white">
                            <p className="text-sm font-medium">{msg.content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendQuestion} className="mt-4">
                  <div className="flex flex-1 items-center space-x-2">
                    <label htmlFor="question" className="sr-only">
                      Question
                    </label>
                    <textarea
                      id="question"
                      name="question"
                      rows={2}
                      className="block w-full rounded-2xl border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#6922C5] sm:text-sm sm:leading-6"
                      value={question}
                      onChange={updateQuestion}
                      placeholder="Type your message"
                    />
                    <button
                      type="submit"
                      className="focus-visible:outline-secondary-600 flex rounded-full bg-[#6922C5] p-3 text-sm font-semibold text-white shadow-sm hover:bg-[#6A5ACD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      disabled={questionLoading}
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
