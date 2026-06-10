import { getPostData, getSortedPostsData } from "@/lib/posts"
import { absoluteUrl, siteConfig } from "@/lib/site"

export const dynamic = "force-static"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function cdata(value: string) {
  return value.replace(/]]>/g, "]]]]><![CDATA[>")
}

export async function GET() {
  const posts = await Promise.all(
    getSortedPostsData().map((post) => getPostData(post.id)),
  )

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.id}/`)
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <description>${escapeXml(post.description)}</description>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <content:encoded><![CDATA[${cdata(post.content || post.description)}]]></content:encoded>
</item>`
    })
    .join("\n")

  const latestPost = posts[0]
  const lastBuildDate = latestPost ? new Date(latestPost.date).toUTCString() : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${escapeXml(siteConfig.name)}</title>
  <link>${siteConfig.url}</link>
  <description>${escapeXml(siteConfig.description)}</description>
  <language>ko-KR</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  ${items}
</channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
