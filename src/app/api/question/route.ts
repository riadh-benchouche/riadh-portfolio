import promptData from '@/data/prompt.json'
import { questionRequestSchema } from '@/sanity/schemaTypes/question'
import { OpenAI } from 'openai'

// We need to use the Edge Runtime for streaming responses
export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = questionRequestSchema.parse(json)

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: promptData.prompt,
        },
        {
          role: 'user',
          content: body.question,
        },
      ],
      stream: true, // Enable streaming
    })

    // Create a ReadableStream that will be our response
    const textEncoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || ''
            controller.enqueue(
              textEncoder.encode(
                `data: ${JSON.stringify({ content: text })}\n\n`,
              ),
            )
          }
          controller.enqueue(textEncoder.encode('data:"[DONE]"\n\n'))
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    // Return the stream response
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
