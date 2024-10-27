import sgMail from '@sendgrid/mail'
import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

// @ts-ignore
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function POST(req: Request): Promise<Response> {
  const data = await req.json()
  const { firstName, lastName, company, email, phoneNumber, message } = data

  console.log(data)

  const templatePath = path.join(
    process.cwd() + '/src',
    'templates',
    'email-confirmation.html',
  )
  let htmlContentConfirmation = fs.readFileSync(templatePath, 'utf8')
  htmlContentConfirmation = htmlContentConfirmation
    .replace('{{firstName}}', firstName)
    .replace('{{lastName}}', lastName)

  const htmlContent = `
    <h1>New Contact Form Submission</h1>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company || 'N/A'}</p>
    <p><strong>Phone Number:</strong> ${phoneNumber || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `

  await sgMail.send({
    to: 'r.benchouche1@gmail.com',
    from: 'r.benchouche1@gmail.com',
    subject: 'New contact form submission',
    html: htmlContent,
  })

  await sgMail.send({
    to: email,
    from: 'r.benchouche1@gmail.com',
    subject: 'Thank you for your message!',
    html: htmlContentConfirmation,
  })
  return NextResponse.redirect('/about?success=true')
}
