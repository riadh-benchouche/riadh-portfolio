'use client'

import { PostCard } from '@/components/post-card'
import { image } from '@/sanity/image'
import { getFeaturedPosts } from '@/sanity/queries'
import * as Headless from '@headlessui/react'
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { Container } from './container'
import { Link } from './link'
import { Heading, Subheading } from './text'

function CallToAction() {
  return (
    <div>
      <p className="max-w-sm text-sm/6 text-gray-600">
        Join a community of developers shaping the future with Next.js and
        modern technologies.
      </p>
      <div className="mt-2">
        <Link
          href="/blog"
          className=" inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600"
        >
          Explore More Articles
          <ArrowLongRightIcon className="size-5" />
        </Link>
      </div>
    </div>
  )
}

export function FeaturedPosts() {
  let [posts, setPosts] = useState([])
  let scrollRef = useRef<HTMLDivElement | null>(null)
  let { scrollX } = useScroll({ container: scrollRef })
  let [setReferenceWindowRef, bounds] = useMeasure()
  let [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollX, 'change', (x) => {
    setActiveIndex(Math.floor(x / scrollRef.current!.children[0].clientWidth))
  })

  function scrollTo(index: number) {
    let gap = 32
    let width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth
    scrollRef.current!.scrollTo({ left: (width + gap) * index })
  }

  useEffect(() => {
    // @ts-ignore
    getFeaturedPosts(6).then(setPosts)
  }, [])

  return (
    <div className="overflow-hidden py-32">
      <Container>
        <div ref={setReferenceWindowRef}>
          <Subheading>Explore</Subheading>
          <Heading as="h3" className="mt-2">
            Discover featured articles.
          </Heading>
        </div>
      </Container>
      <div
        ref={scrollRef}
        className={clsx([
          'mt-16 flex gap-8 px-[var(--scroll-padding)] py-2',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:max(theme(spacing.6),calc((100vw-theme(maxWidth.2xl))/2))] lg:[--scroll-padding:max(theme(spacing.8),calc((100vw-theme(maxWidth.7xl))/2))]',
        ])}
      >
        {posts.map(
          ({ slug, publishedAt, excerpt, mainImage, title }, postIndex) => (
            <PostCard
              key={postIndex}
              slug={slug}
              date={dayjs(publishedAt).format('dddd, MMMM D, YYYY')}
              title={title || ''}
              img={mainImage && image(mainImage).size(1170, 780).url()}
              description={excerpt || ''}
              bounds={bounds}
              scrollX={scrollX}
              onClick={() => scrollTo(postIndex)}
            />
          ),
        )}
        <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
      </div>
      <Container className="mt-16">
        <div className="flex justify-between">
          <CallToAction />
          <div className="hidden sm:flex sm:gap-2">
            {posts.map(({ slug }, postIndex) => (
              <Headless.Button
                key={postIndex}
                onClick={() => scrollTo(postIndex)}
                data-active={activeIndex === postIndex ? true : undefined}
                aria-label={`Scroll to post from ${slug}`}
                className={clsx(
                  'size-2.5 rounded-full border border-transparent bg-gray-300 transition',
                  'data-[active]:bg-gray-400 data-[hover]:bg-gray-400',
                  'forced-colors:data-[active]:bg-[Highlight] forced-colors:data-[focus]:outline-offset-4',
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
