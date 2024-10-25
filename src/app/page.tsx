import { BackgroundGradientAnimation } from '@/components/background-gradient-animation'
import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { FeaturedPosts } from '@/components/featured-posts'
import { Footer } from '@/components/footer'
import { GlowingStarsBackgroundCard } from '@/components/glowing-stars'
import { Keyboard } from '@/components/keyboard'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Développeur Web Full Stack - Next.js, Node.js, Laravel',
  description:
    'Full Stack web developer specializing in Next.js, Node.js, and Laravel. I create high-performance, scalable applications. Discover my expertise in development to turn your ideas into robust solutions.',
}

function Hero() {
  return (
    <div className="relative">
      <BackgroundGradientAnimation />
      <Container className="relative">
        <Navbar />
        <div className="pb-28 pt-20 sm:pb-28 sm:pt-24 lg:pb-48 lg:pt-28">
          <h1 className="font-display text-balance text-5xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-7xl/[0.8] md:text-8xl/[0.8]">
            Build Every Solution.
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Specializing in modern technologies like Next.js, Node.js, and
            Laravel to create scalable, high-performance applications.
          </p>
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="#">Discover My Work</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Work Experience</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        My journey in web development and technology.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          eyebrow="Professional Journey"
          title="Companies I've Worked With"
          description="Throughout my career, I’ve had the opportunity to work with amazing companies that helped shape my expertise in web development and technology. Each experience has contributed to my growth as a developer."
          graphic={<LogoCluster />}
          className="z-10 max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Learning Journey"
          title="Continuous Learning"
          description="Every step of my journey has been about expanding my skills and knowledge in the ever-evolving tech landscape."
          graphic={
            <div className="flex items-center justify-center antialiased">
              <GlowingStarsBackgroundCard />
            </div>
          }
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="Passion for Coding"
          title="Code at the Core"
          description="Behind every keystroke lies a passion for building digital solutions. My love for coding is the driving force behind every project I undertake, where innovation and precision come together."
          graphic={
            <div className="flex size-full pl-10 pt-10">
              <Keyboard highlighted={['LeftCommand', 'LeftShift', 'D']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Development Tools"
          title="Tools of the Trade"
          description="A developer is only as strong as their tools. I work with a robust and versatile set of technologies to craft high-performance applications, from backend frameworks to frontend libraries."
          graphic={<LogoTimeline />}
          className="!overflow-visible lg:col-span-2"
        />
        <BentoCard
          eyebrow="Global Impact"
          title="Reaching New Horizons"
          description="As technology transcends borders, so does my work. My projects have touched various corners of the world, reflecting the power of the web to connect people globally."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
          <BentoSection />
        </div>
      </main>
      <FeaturedPosts />
      <Footer />
    </div>
  )
}
