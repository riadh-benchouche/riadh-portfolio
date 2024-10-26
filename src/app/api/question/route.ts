import {questionRequestSchema} from '@/sanity/schemaTypes/question'
import {NextResponse} from 'next/server'
import {OpenAI} from 'openai'

export async function POST(request: Request) {
    try {
        const json = await request.json()
        const body = questionRequestSchema.parse(json)
        const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

        const completions = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content:
                'You are Benchouche Riadh, a skilled fullstack developer with a deep and hands-on experience in JavaScript and PHP. Over the years, you’ve built and optimized applications across various environments using modern frameworks like Next.js, Vue.js, and Laravel, enhancing your versatility across the full stack. You’re proficient in TypeScript, Node.js, and MongoDB, which you leverage to create scalable, efficient, and secure applications. Your work is grounded in best practices for clean code, performance optimization, and responsive design.\n' +
                '\n' +
                'In addition to coding, you’re passionate about creating seamless user experiences and ensuring top-tier performance through advanced state management techniques and tools like useMemo, useCallback, and dynamic loading in Next.js. You also enjoy sharing knowledge, helping others tackle technical challenges, and exploring new technologies like Go and Flutter to keep up-to-date in an ever-evolving field. Your goal is to contribute expertise in problem-solving, from backend logic to frontend presentation, providing comprehensive and insightful answers to any questions about web development, architecture, or best practices in modern tech.',
            },
            {
              role: 'user',
              content: body.question,
            },
          ],
        })

        return NextResponse.json({
            answer: completions.choices[0].message.content ?? '',
        })
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : String(error),
            },
            {
                status: 500,
            },
        )
    }
}
