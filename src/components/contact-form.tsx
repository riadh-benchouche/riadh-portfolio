'use client'

import Alert from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/Input'
import { Field, Label, Switch } from '@headlessui/react'
import { type FormEvent, useState } from 'react'

export default function ContactForm() {
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!agreed) {
      alert('Please agree to our privacy policy')
      return
    }
    setLoading(true)

    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          company,
          email,
          phoneNumber,
          message,
        }),
      })
      setSuccess(true)
    } catch (error) {
      setError('We could not send your message, please try again later')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="isolate bg-white px-6 pb-24 sm:pb-32 lg:px-8">
      {success && (
        <Alert
          title="Thank you for your message!"
          message="We will get back to you as soon as possible."
        />
      )}
      {error !== '' && <Alert title="An error occurred" message={error} />}
      {!success && error === '' && (
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-xl sm:mt-14"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <Input
                label="First name"
                name="first-name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                required={true}
                autoComplete="given-name"
              />
            </div>
            <div>
              <Input
                label="Last name"
                name="last-name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                required={true}
                autoComplete="family-name"
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Company"
                name="company"
                type="text"
                onChange={(e) => setCompany(e.target.value)}
                required={false}
                autoComplete="organization"
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                autoComplete="email"
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Phone number"
                name="phone-number"
                type="tel"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required={false}
                autoComplete="tel"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  required={true}
                  rows={4}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>
            <Field className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                  />
                </Switch>
              </div>
              <Label className="text-sm leading-6 text-gray-600">
                By selecting this, you agree to our{' '}
                <a
                  href="/privacy-policy"
                  className="font-semibold text-indigo-600"
                >
                  privacy&nbsp;policy
                </a>
                .
              </Label>
            </Field>
          </div>
          <div className="mt-10">
            <Button type="submit" className="w-full">
              {loading ? 'Sending...' : 'lets talk'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
