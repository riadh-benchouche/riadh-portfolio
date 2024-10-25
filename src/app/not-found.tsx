import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'

export default function NotFound() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Container className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-32 ">
        <Subheading>404</Subheading>
        <Heading as="h1">Page not found</Heading>
        <Lead className="mt-6 max-w-3xl">
          Sorry, we couldn’t find the page you’re looking for.
        </Lead>
        <div className="mt-10 flex flex-1 items-center gap-2">
          <ArrowLongLeftIcon className="size-5 text-pink-600" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600"
          >
            Back to home
          </Link>
        </div>
      </Container>
      <Footer />
    </main>
  )
}
