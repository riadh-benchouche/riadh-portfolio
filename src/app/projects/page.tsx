import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Testimonials } from '@/components/projects'
import { Heading, Lead } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'We’re on a mission to transform revenue organizations by harnessing vast amounts of illegally acquired customer data.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Projects Showcase</Heading>
      <Lead className="mt-6 max-w-3xl">
        Explore my personal and professional projects that showcase my journey
        in web development. Each project reflects my commitment to creating impactful
        solutions.
      </Lead>
    </Container>
  )
}

export default function Company() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <Testimonials />
      <Footer />
    </main>
  )
}
