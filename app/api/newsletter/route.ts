import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { escapeHtml } from '@/lib/escape-html'

const schema = z.object({
  email: z.string().email(),
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
      subject: 'New newsletter subscriber',
      html: `<h2>New Subscriber</h2><p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
