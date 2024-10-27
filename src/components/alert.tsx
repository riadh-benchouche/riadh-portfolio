import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default function Alert({
  title,
  message,
}: {
  title: string
  message: string
}) {
  return (
    <div className="mx-auto mt-10 max-w-xl rounded-md bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#d4eaff] from-[28%] via-[#a0c4ff] via-[70%] to-[#ffb6b9] p-4 sm:mt-14 sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon aria-hidden="true" className="black h-5 w-5" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-black">{title}</h3>
          <div className="mt-2 text-sm text-black">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
