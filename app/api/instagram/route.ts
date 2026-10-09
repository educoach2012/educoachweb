import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const count = Math.min(Number(searchParams.get('count') ?? 6), 12)

  const settings = await client.fetch<{ instagramAccessToken?: string } | null>(
    `*[_type == "siteSettings"][0]{instagramAccessToken}`,
    {},
    { next: { revalidate: 300 } },
  )

  const token = settings?.instagramAccessToken
  if (!token) {
    return NextResponse.json({ posts: [] })
  }

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type,thumbnail_url&limit=${count}&access_token=${token}`
    const res = await fetch(url, { next: { revalidate: 300 } })

    if (!res.ok) {
      console.error('Instagram API error:', res.status, await res.text())
      return NextResponse.json({ posts: [] })
    }

    const data = await res.json()
    return NextResponse.json({ posts: data.data ?? [] })
  } catch (err) {
    console.error('Instagram fetch failed:', err)
    return NextResponse.json({ posts: [] })
  }
}
