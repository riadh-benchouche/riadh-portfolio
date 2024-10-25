import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s | Riadh Benchouche',
    default: 'Fullstack Web Developer',
  },
  applicationName: 'Riadh Benchouche',
  authors: [
    {
      name: 'Riadh Benchouche',
      url: 'https://www.riadhbench.com',
    },
  ],
  description:
    'Full Stack web developer specializing in Next.js, Node.js, and Laravel. I create high-performance, scalable applications. Discover my expertise in development to turn your ideas into robust solutions.',
  openGraph: {
    url: 'https://www.riadhbench.com',
    siteName: 'Riadh Benchouche',
    title: 'Riadh Benchouche - Fullstack Web Developer',
    description:
      'Full Stack web developer specializing in Next.js, Node.js, and Laravel. I create high-performance, scalable applications. Discover my expertise in development to turn your ideas into robust solutions.',
    images: [
      {
        url: 'https://www.riadhben.com/_next/image?url=%2Fprofile.jpeg&w=828&q=75',
        width: 600,
        height: 315,
        alt: 'Riadh Benchouche - Fullstack Web Developer',
      },
    ],
  },
  verification: {
    // google: 'rF1p7hrWwW_kkswltukk9fUBQrOy2VQAx8P7X9htbwc',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for Riadh Benchouche"
          href="/blog/feed.xml"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className="text-gray-950 antialiased"
      >
        {children}
      </body>
    </html>
  )
}
