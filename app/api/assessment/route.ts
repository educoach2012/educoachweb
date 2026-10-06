import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { escapeHtml } from '@/lib/escape-html'

const schema = z.object({
  stage: z.string().min(1).max(100),
  countries: z.array(z.string().max(100)).max(20),
  interest: z.string().max(500).optional(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(5).max(20),
  message: z.string().max(2000).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY not configured')
      return NextResponse.json({ ok: true })
    }

    const resend = new Resend(apiKey)
    const to = process.env.NOTIFICATION_EMAIL ?? 'hello@educoach.in'

    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? 'EduCoach <onboarding@resend.dev>',
      to,
      replyTo: data.email,
      subject: `New assessment booking from ${escapeHtml(data.name)}`,
      html: `
        <h2>New Assessment Booking</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Stage:</strong> ${escapeHtml(data.stage)}</p>
        <p><strong>Target countries:</strong> ${escapeHtml(data.countries.join(', ') || 'Not specified')}</p>
        ${data.interest ? `<p><strong>Service interest:</strong> ${escapeHtml(data.interest)}</p>` : ''}
        ${data.message ? `<p><strong>Message:</strong></p><p>${escapeHtml(data.message)}</p>` : ''}
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: err.flatten().fieldErrors }, { status: 400 })
    }
    console.error('Assessment form error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
