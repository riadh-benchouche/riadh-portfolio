import { Role } from '@/components/role'
import type { ImageProps } from 'next/image'
import React from 'react'
// type of heroicons
type Icon = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string
    titleId?: string
  } & React.RefAttributes<SVGSVGElement>
>

export interface RoleType {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

export function CardResume({
  resume,
  HeroIcon,
  title,
}: {
  resume: RoleType[]
  HeroIcon: Icon
  title: string
}) {
  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/20">
        <div className="rounded-3xl bg-white bg-opacity-80 p-10 pb-9 shadow-2xl ring-1 ring-black/10">
          <h2 className="flex text-base font-semibold text-zinc-900">
            <HeroIcon className="h-6 w-6 flex-none text-[#456FE8]" />
            <span className="ml-3 bg-gradient-to-r from-[#456FE8] to-[#19B0EC] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <ol className="mt-6 space-y-4">
            {resume.map((role, roleIndex) => (
              <Role key={roleIndex} role={role} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
