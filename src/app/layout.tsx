import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import React from "react";

export const metadata: Metadata = {
  title: {
    template: '%s | Riadh Benchouche',
    default: 'Riadh Benchouche | Développeur Web Full Stack - Next.js, Node.js, Laravel',
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
        <title>Riadh Benchouche | Développeur Web Full Stack - Next.js, Node.js, Laravel</title>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Radiant Blog"
          href="/blog/feed.xml"
        />
      </head>
      <body suppressHydrationWarning={true} className="text-gray-950 antialiased">{children}</body>
    </html>
  )
}
