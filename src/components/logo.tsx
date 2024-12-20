'use client'
import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo.svg" alt="Logo" width={50} height={50} />
      <span className="text-xl font-semibold text-zinc-900">
        Riadh Benchouche
      </span>
    </div>
  )
}

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      fill="none"
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 1034 1024"
      role="presentation"
    >
      <path
        opacity="0.9"
        d="M160.962 741.025v-461.167l354.947-117.075 271.25 88.787 221.060-71.932-492.31-161.564-492.446 161.564v661.963l492.446 161.245v-144.697z"
      ></path>
      <path
        opacity="1.0"
        d="M515.908 1002.845l492.31-161.245v-144.649l-492.31 161.197z"
      ></path>
      <path
        opacity="1.0"
        d="M515.908 744.027l492.31-161.273v-144.653l-492.31 161.213z"
      ></path>
      <path
        opacity="1.0"
        d="M515.908 485.176l492.31-161.277v-144.262l-492.31 160.826z"
      ></path>
    </svg>
  )
}
