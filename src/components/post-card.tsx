import type { Slug } from '@/sanity/types'
import {
  type HTMLMotionProps,
  motion,
  MotionValue,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion'
import Link from 'next/link'
import { useCallback, useLayoutEffect, useRef } from 'react'
import type { RectReadOnly } from 'react-use-measure'

export function PostCard({
  date,
  slug,
  title,
  img,
  description,
  bounds,
  scrollX,
  ...props
}: {
  img?: string
  description: string
  date: string
  title: string
  slug?: Slug
  bounds: RectReadOnly
  scrollX: MotionValue<number>
} & HTMLMotionProps<'div'>) {
  let ref = useRef<HTMLDivElement | null>(null)

  let computeOpacity = useCallback(() => {
    let element = ref.current
    if (!element || bounds.width === 0) return 1

    let rect = element.getBoundingClientRect()


    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left
      let percent = diff / rect.width
      return Math.max(0.5, 1)
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right
      let percent = diff / rect.width
      return Math.max(0.5, 1)
    } else {
      return 1
    }
  }, [ref, bounds.width, bounds.left, bounds.right])

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  })

  useLayoutEffect(() => {
    opacity.set(computeOpacity())
  }, [computeOpacity, opacity])

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity())
  })

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5 sm:w-96"
    >
      {img && (
        <img
          alt={''}
          src={img}
          className="aspect-[3/2] w-full rounded-2xl object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-8">
        <div className="mt-2 text-base/7 font-medium">
          <Link href={`/blog/${slug}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </div>
        <div className="mt-2 flex-1 text-sm/6 text-gray-500">{description}</div>
        <div className="mt-6 flex items-center gap-3">
          <div className="text-sm/5 text-gray-700">{date}</div>
        </div>
      </div>
    </motion.div>
  )
}
