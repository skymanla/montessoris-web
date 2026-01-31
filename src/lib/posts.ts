import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export type PostData = {
  id: string
  date: string
  title: string
  description: string
  content?: string
  [key: string]: string | undefined
}

export function getSortedPostsData(): PostData[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md')).map((fileName) => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx?$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string; description: string }),
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getLatestPostsData(count: number = 3): PostData[] {
  const allPostsData = getSortedPostsData()
  return allPostsData.slice(0, count)
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md')).map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx?$/, ''),
      },
    }
  })
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPathMdx = path.join(postsDirectory, `${id}.mdx`)
  const fullPathMd = path.join(postsDirectory, `${id}.md`)

  let fullPath = fullPathMdx
  if (fs.existsSync(fullPathMd)) {
      fullPath = fullPathMd
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id and content
  return {
    id,
    content: matterResult.content,
    ...matterResult.data as { date: string; title: string; description: string },
  }
}
