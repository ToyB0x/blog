import { Feed } from 'feed'
import { compareDesc } from 'date-fns/compareDesc'
import { allPosts } from '@/.contentlayer/generated'

const baseUrl = 'https://www.toyb0x.me'

export async function GET() {
  const feed = new Feed({
    title: '@Toyb0x blog',
    description: 'Toyb0x のブログ',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    copyright: 'All rights reserved @Toyb0x',
  })

  const sortedPosts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  sortedPosts.forEach((post) => {
    const url = `${baseUrl}${post.slug}`

    feed.addItem({
      id: url,
      title: post.title,
      description: post.description,
      link: url,
      date: new Date(post.date),
    })
  })

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
