import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Building meaningful web experiences with a passion for innovation and scalability.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Riadh Benchouche - Fullstack Developer.</Heading>
      <Lead className="mt-6 max-w-3xl">
        Building meaningful web experiences with a passion for innovation and
        scalability.
      </Lead>
    </Container>
  )
}

function AboutMe() {
  return (
    <div className="w-auto lg:w-full max-w-7xl mx-2 lg:mx-auto my-24 rounded-4xl bg-gray-900 bg-[url(/dot-texture.svg)] pb-24 pt-36 lg:pt-36">
      <Container>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[200px_1fr_1fr]">
          <div className="flex flex-col max-lg:mt-16 lg:col-span-2">
            <figure className="mx-auto flex max-w-xl flex-col gap-16 max-lg:text-center">
              <blockquote>
                <p className="relative text-xl tracking-tight text-white before:absolute before:-translate-x-full before:content-['“'] after:absolute after:content-['”']">
                  Hello! I’m
                  <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
                    &nbsp;Riadh Benchouche&nbsp;
                  </span>
                  a dedicated full-stack developer currently advancing my skills
                  through a hands-on apprenticeship with FSTCK. My journey into
                  web development is driven by a passion for creating
                  user-friendly and efficient digital solutions that truly
                  enhance user experience.
                  <br />
                  <br />
                  I specialize in building applications with technologies like
                  Next.js, TypeScript, and Go, focusing on performance and
                  clean, maintainable code. Each project fuels my curiosity and
                  commitment to pushing the boundaries of what modern web
                  applications can achieve.
                  <br />
                  <br />
                  As I continue to grow in this field, I aim to work on
                  impactful projects that solve real-world challenges and bring
                  new ideas to life. When I&apos;m not coding, I enjoy exploring
                  the latest tech trends, collaborating with fellow developers,
                  and brainstorming on innovative solutions.
                </p>
              </blockquote>
            </figure>
          </div>
          <div className="flex justify-center lg:-mt-52 lg:justify-start">
            <div className="-m-2 rounded-4xl bg-white/15 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:max-w-xs">
              <div className="rounded-4xl p-2 shadow-md shadow-black/5">
                <div className="overflow-hidden rounded-3xl shadow-2xl outline outline-1 -outline-offset-1 outline-black/10">
                  <Image
                    alt="Riadh Benchouche - Full-Stack Developer"
                    src="/profile.jpeg"
                    width={384}
                    height={512}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default function About() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <AboutMe />
      <Footer />
    </main>
  )
}
