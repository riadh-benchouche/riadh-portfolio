import { Container } from '@/components/container'
import {
  Footer,
  SocialIconGithub,
  SocialIconLinkedIn,
} from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { CardResume, type RoleType } from '@/components/resume-card'
import { Heading, Lead } from '@/components/text'
import {
  AcademicCapIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  GlobeAmericasIcon,
  LanguageIcon,
  PaintBrushIcon,
  PhoneIcon,
} from '@heroicons/react/16/solid'
import { HeartIcon, SparklesIcon } from '@sanity/icons'
import type { Metadata } from 'next'
import Image, { type ImageProps } from 'next/image'
import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  type SVGProps,
} from 'react'

import { Button } from '@/components/button'
import { Link } from '@/components/link'
import apnLogo from '@/images/logos/apn-logo.svg'
import cesiLogo from '@/images/logos/cesi.svg'
import esgiLogo from '@/images/logos/esgi-logo.svg'
import franceFlag from '@/images/logos/france-flag.svg'
import fstckLogo from '@/images/logos/fstck-logo.svg'
import junoLogo from '@/images/logos/juno-logo.svg'
import whitebayLogo from '@/images/logos/logo-whitebay.svg'
import ufasLogo from '@/images/logos/ufas-logo.svg'
import unitedKingdomFlag from '@/images/logos/united-kingdom-flag.svg'

export const metadata: Metadata = {
  title: 'Resume and Expertise',
  description:
    'Discover my resume, journey and expertise in web development, design, and project management.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Resume and Expertise</Heading>
      <Lead className="mt-6 max-w-3xl">Discover My Journey and Expertise</Lead>
    </Container>
  )
}

interface Language {
  language: string
  logo: ImageProps['src']
}

interface Skill {
  skill: string
  subSkills: Array<string>
}

function Lang({ lang }: { lang: Language }) {
  return (
    <li className="mx-auto flex flex-col">
      <div className="relative mb-3 mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5">
        <Image src={lang.logo} alt="Language" />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2 pb-2">
        <dt className="sr-only">Language</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900">
          {lang.language}
        </dd>
      </dl>
    </li>
  )
}

function SkillList({ skill }: { skill: Skill }) {
  return (
    <li className="flex w-full flex-col">
      <dl className="flex flex-auto flex-wrap gap-x-2 pb-2">
        <dt className="sr-only">Skill</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900">
          {skill.skill}
        </dd>
        <dt className="sr-only">Level</dt>
        {skill.subSkills?.map((subSkill, subSkillIndex) => (
          <dd key={subSkillIndex} className="flex text-xs text-black">
            <span>
              {subSkill}{' '}
              {subSkillIndex < skill.subSkills.length - 1 && <span> | </span>}
            </span>
          </dd>
        ))}
      </dl>
    </li>
  )
}

function Work() {
  let resume: Array<RoleType> = [
    {
      company: 'FSTCK',
      title: 'Fullstack web developer',
      logo: fstckLogo,
      start: 'February 2023',
      end: 'Present',
    },
    {
      company: 'Juno',
      title: 'Fullstack web developer',
      logo: junoLogo,
      start: 'June 2022',
      end: 'January 2023',
    },
    {
      company: 'WhiteBay',
      title: 'Designer & Fullstack web developer',
      logo: whitebayLogo,
      start: 'December 2021',
      end: 'June 2022',
    },
    {
      company: 'Popular assembly algeria',
      title: 'Web Development Intern',
      logo: apnLogo,
      start: 'January 2021',
      end: 'July 2021',
    },
  ]

  return <CardResume resume={resume} HeroIcon={BriefcaseIcon} title="Work" />
}

function Education() {
  let education: Array<RoleType> = [
    {
      company: 'ESGI',
      title: 'Web engineering expert',
      logo: esgiLogo,
      start: 'January 2023',
      end: 'Present',
    },
    {
      company: 'CESI',
      title: 'Information systems manager',
      logo: cesiLogo,
      start: 'September 2019',
      end: 'June 2022',
    },
    {
      company: 'University of Setif 1',
      title: 'Bachelor of Computer Science',
      logo: ufasLogo,
      start: 'September 2016',
      end: 'June 2019',
    },
  ]

  return (
    <CardResume
      resume={education}
      HeroIcon={AcademicCapIcon}
      title="Education"
    />
  )
}

function Language() {
  let languages: Array<Language> = [
    {
      language: 'French',
      logo: franceFlag,
    },
    {
      language: 'English',
      logo: unitedKingdomFlag,
    },
  ]

  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/20">
        <div className="rounded-3xl bg-white bg-opacity-80 p-10 pb-9 shadow-2xl ring-1 ring-black/10">
          <h2 className="flex text-base font-semibold text-zinc-800">
            <LanguageIcon className="h-6 w-6 flex-none text-[#456FE8]" />
            <span className="ml-3 bg-gradient-to-r from-[#456FE8] to-[#19B0EC] bg-clip-text text-transparent">
              Languages
            </span>
          </h2>
          <ol className="mt-6 flex flex-1">
            {languages.map((lang, langIndex) => (
              <Lang key={langIndex} lang={lang} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function Skills() {
  let skills: Array<Skill> = [
    {
      skill: 'Frontend Development',
      subSkills: [
        'Vue.js,',
        'React.js',
        'Next.js',
        'Nuxt.js',
        'Tailwind CSS',
        'Materialize',
      ],
    },
    {
      skill: 'Backend Development',
      subSkills: ['Laravel', 'Node.js', 'Express.js', 'Go', 'Api Platform'],
    },
    {
      skill: 'Software Testing and Quality',
      subSkills: ['Jest', 'PHPUnit', 'Vitest', 'Pest', 'Postman'],
    },
    {
      skill: 'Database Management',
      subSkills: ['SQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'],
    },
    {
      skill: 'SEO (Search Engine Optimization)',
      subSkills: [
        'Google Analytics',
        'Google Search Console',
        'Google Tag Manager',
      ],
    },
    {
      skill: 'Services Cloud & DevOps',
      subSkills: [
        'DigitalOcean',
        'Google Cloud Platform (GCP)',
        'Amazon Web Services (AWS)',
        'Docker',
        'Git',
        'GitHub Actions',
        'GitLab CI/CD',
        'Kubernetes',
        'NGINX',
      ],
    },
    {
      skill: 'Project Management',
      subSkills: ['Scrum', 'Kanban', 'Agile', 'GANTT', 'Trello'],
    },
    {
      skill: 'Design and Prototyping Tools',
      subSkills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'InDesign'],
    },
  ]

  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/20">
        <div className="rounded-3xl bg-white bg-opacity-80 p-10 pb-9 shadow-2xl ring-1 ring-black/10">
          <h2 className="flex text-base font-semibold text-zinc-900 dark:text-zinc-100">
            <SparklesIcon className="h-7 w-7 flex-none text-[#456FE8]" />
            <span className="ml-3 bg-gradient-to-r from-[#456FE8] to-[#19B0EC] bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <ol className="mt-6 space-y-4">
            {skills.map((skill, skillIndex) => (
              <SkillList key={skillIndex} skill={skill} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function Hobbies() {
  let Hobbies: Array<{
    Icon: ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string | undefined
        titleId?: string | undefined
      } & RefAttributes<SVGSVGElement>
    >
    hobbit: string
  }> = [
    {
      Icon: GlobeAmericasIcon,
      hobbit: 'Travel Enthusiast',
    },
    {
      Icon: HeartIcon,
      hobbit: 'Health Enthusiast',
    },
    {
      Icon: PaintBrushIcon,
      hobbit: 'Art & Design',
    },
  ]

  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
          <h2 className="flex text-base font-semibold text-zinc-900">
            <SparklesIcon className="h-7 w-7 flex-none text-[#456FE8]" />
            <span className="ml-3 bg-gradient-to-r from-[#456FE8] to-[#19B0EC] bg-clip-text text-transparent">
              Hobbies
            </span>
          </h2>
          <ol className="mt-6 grid grid-cols-3 items-center justify-items-center gap-y-4">
            {Hobbies.map((hobby, hobbyIndex) => (
              <li
                className="col-span-1 flex w-full flex-col items-center justify-center text-center"
                key={hobbyIndex}
              >
                <div className="relative mb-3 mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full p-2 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5">
                  <hobby.Icon className="h-7 w-7" />
                </div>
                <dl className="flex flex-auto flex-wrap items-center justify-center gap-x-2 pb-2">
                  <dt className="sr-only">Hobby</dt>
                  <dd className="w-full flex-none text-sm font-medium text-zinc-900">
                    {hobby.hobbit}
                  </dd>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function HeaderInfo() {
  return (
    <div className="-m-2 mx-auto mb-6 mt-20 grid w-full max-w-7xl grid-cols-1 rounded-4xl px-2 shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="flex flex-1 flex-col items-start justify-around space-y-6 rounded-3xl bg-white px-6 py-6 shadow-2xl ring-1 ring-black/5 md:flex-row md:items-center md:space-y-0 md:px-0">
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-[#456FE8] to-[#19B0EC] bg-clip-text text-4xl font-bold text-transparent">
              Riadh Benchouche
            </span>
            <span className="text-lg text-gray-600">
              Fullstack Web Developer
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <a
              href="tel:+33761421437"
              className="flex items-center text-sm text-gray-950 hover:text-gray-950/75 md:text-base"
            >
              <PhoneIcon className="mr-1 h-5 w-5" /> +33 7 61 42 14 37
            </a>

            <a
              href="mailto:r.benchouche1@gmail.com"
              className="flex items-center text-sm text-gray-950 hover:text-gray-950/75 md:text-base"
            >
              <EnvelopeIcon className="mr-1 h-5 w-5" /> r.benchouche1@gmail.com
            </a>
            <div className="text-sm text-gray-950 md:text-base">
              Paris, France
            </div>
            <div className="flex items-center space-x-3 text-sm text-blue-500 md:text-base">
              <Link
                href="https://linkedin.com/in/riadh-benchouche"
                target="_blank"
                aria-label="Visit us on github"
                className="flex items-center gap-x-2 text-gray-950 data-[hover]:text-gray-950/75"
              >
                <SocialIconLinkedIn className="size-5" />
              </Link>

              <Link
                href="https://github.com/riadh-benchouche"
                target="_blank"
                aria-label="Visit us on github"
                className="flex items-center gap-x-2 text-gray-950 data-[hover]:text-gray-950/75"
              >
                <SocialIconGithub className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
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
      <HeaderInfo />
      <div className="mx-auto mb-20 grid w-full max-w-7xl grid-cols-1 gap-y-6 px-2 md:grid-cols-2 md:gap-x-12">
        <div className="h-full space-y-6 md:order-1">
          <Work />
          <Education />
          <Language />
        </div>
        <div className="h-full space-y-6 md:order-2">
          <Skills />
          <Hobbies />
          <Button
            variant="secondary"
            className="w-full bg-white"
            href="/riadh-benchouche-resume.pdf"
            target="_blank"
          >
            Download Resume
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}
