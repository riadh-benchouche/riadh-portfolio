'use client'

import { clsx } from 'clsx'
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion'
import Link from 'next/link'
import React, { useCallback, useLayoutEffect, useRef } from 'react'
import useMeasure, { type RectReadOnly } from 'react-use-measure'

const projects = [
  {
    img: '/projects/cuisine-connect.jpg',
    title: 'Cuisine Connect',
    techno: 'OpenAI, Vue.js, Node.js, MongoDB, Tailwind CSS',
    link: 'https://github.com/riadh-benchouche/cuisineConnect',
    description:
      'An innovative application that leverages OpenAI to retrieve recipes from MongoDB, enhancing culinary exploration.',
  },
  {
    img: '/projects/sneak-peak.png',
    title: 'SneakPeak',
    techno: 'Vue.js, Node.js, Stripe, MongoDB, PostgreSQL, Tailwind CSS',
    link: 'https://github.com/riadh-benchouche/challengeS3',
    description:
      'An e-commerce platform for shoe sales, integrating Stripe for secure online payments.',
  },
  {
    img: '/projects/tic-tac-toe.jpg',
    title: 'Tic Tac Toe',
    techno: 'Vue.js, Node.js, Socket.io, MongoDB, Tailwind CSS',
    link: '',
    description:
      'A real-time Tic Tac Toe game utilizing Socket.io for seamless multiplayer interaction.',
  },
  {
    img: '/projects/chef-retard.png',
    title: 'Chef Retard',
    techno: 'Next.js, Tailwind CSS, SEO, Google Search Console',
    link: 'https://chef-retard-seo-riadh-benchouche.vercel.app/',
    description:
      'A school project focused on optimizing a site for the keyword "Chef Retard," employing effective SEO strategies.',
  },
  {
    img: '/projects/laravel.jpg',
    title: 'Laravel Starter Template',
    techno: 'Laravel, Sanctum, Swagger, Role & Permission, Laravel activitylog',
    link: 'https://github.com/riadh-benchouche/laravel-starterkit',
    description:
      'A starter template for Laravel, featuring Sanctum for authentication and Swagger for API documentation.',
  },
  {
    img: '/projects/flutter-go.png',
    title: 'School Association Management (In Progress)',
    techno: 'Go, Flutter',
    link: 'https://github.com/riadh-benchouche/challenge-s4',
    description:
      'An application under development for managing school associations, utilizing Go for backend and Flutter for frontend.',
  },
]

function ProjectCard({
  title,
  techno,
  img,
  children,
  link,
  bounds,
  scrollX,
  ...props
}: {
  img: string
  title: string
  techno: string
  link: string
  children: React.ReactNode
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
      return Math.max(0.5, 1 - percent)
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
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
    <Link href={link}>
      <motion.div
        ref={ref}
        style={{ opacity }}
        {...props}
        className="relative flex aspect-[9/16] w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[3/4] sm:w-96"
      >
        <img
          alt=""
          src={img}
          className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-[calc(7/16*100%)] ring-1 ring-inset ring-gray-950/10 sm:from-25%"
        />
        <figure className="relative p-10">
          <blockquote>
            <p className="relative text-xl/7 text-white">
              <span aria-hidden="true" className="absolute -translate-x-full">
                “
              </span>
              {children}
              <span aria-hidden="true" className="absolute">
                ”
              </span>
            </p>
          </blockquote>
          <figcaption className="mt-6 border-t border-white/20 pt-6">
            <p className="text-sm/6 font-medium text-white">{title}</p>
            <p className="text-sm/6 font-medium">
              <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
                {techno}
              </span>
            </p>
          </figcaption>
        </figure>
      </motion.div>
    </Link>
  )
}

export function Testimonials() {
  let scrollRef = useRef<HTMLDivElement | null>(null)
  let { scrollX } = useScroll({ container: scrollRef })
  let [setReferenceWindowRef, bounds] = useMeasure()

  function scrollTo(index: number) {
    let gap = 32
    let width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth
    scrollRef.current!.scrollTo({ left: (width + gap) * index })
  }

  return (
    <div className="overflow-hidden pb-32">
      <div ref={setReferenceWindowRef}></div>
      <div
        ref={scrollRef}
        className={clsx([
          'mt-16 flex gap-8 px-[var(--scroll-padding)]',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:max(theme(spacing.6),calc((100vw-theme(maxWidth.2xl))/2))] lg:[--scroll-padding:max(theme(spacing.8),calc((100vw-theme(maxWidth.7xl))/2))]',
        ])}
      >
        {projects.map(
          ({ img, title, techno, description, link }, projectIndex) => (
            <ProjectCard
              key={projectIndex}
              link={link}
              title={title}
              techno={techno}
              img={img}
              bounds={bounds}
              scrollX={scrollX}
              onClick={() => scrollTo(projectIndex)}
            >
              {description}
            </ProjectCard>
          ),
        )}
        <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
      </div>
    </div>
  )
}
