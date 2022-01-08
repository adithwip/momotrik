import type { GetAllPostsForRssResponse } from 'interfaces/lib/getAllPostsForRssFeed'

import fs from 'fs'
import { Feed } from 'feed'

import { getAllPostsForRssFeed } from 'lib/useGetAllPostsForRssFeed'
import { stripHtmlTags } from 'utils/stripHtmlTags'
import { config } from 'config'

type Category = {
  name?: string
}

export const generateRssFeed = async () => {
  const {
    posts: { edges },
  }: GetAllPostsForRssResponse = await getAllPostsForRssFeed()
  const { currentURL, originalImage, originalTitle, originalDescription } =
    config

  const feed = new Feed({
    title: originalTitle,
    description: originalDescription,
    id: currentURL,
    link: currentURL,
    language: 'id',
    image: originalImage,
    copyright: `Momotrik ${new Date().getFullYear()}`,
    updated: new Date(),
    generator: 'Feed for Node.js application (NextJS)',
    feedLinks: {
      rss2: `${currentURL}/rss.xml`,
      json: `${currentURL}/feed.json`,
      atom: `${currentURL}/atom.xml`,
    },
  })

  edges.forEach(
    ({
      node: { date, title, slug, excerpt, categories, featuredImage, author },
    }) => {
      const url = `${currentURL}/artikel/${slug}`
      const description = stripHtmlTags(excerpt)
      const authors = [author.node]
      const category: Category[] = categories.edges.map(({ node }) => ({
        name: node.name,
      }))

      feed.addItem({
        title: title,
        id: url,
        link: url,
        description: description,
        content: description,
        author: authors,
        contributor: authors,
        category: category,
        date: new Date(date),
        image: featuredImage.node.mediaItemUrl,
      })
    }
  )

  fs.writeFileSync('./public/rss.xml', feed.rss2())
  fs.writeFileSync('./public/feed.json', feed.atom1())
  fs.writeFileSync('./public/atom.xml', feed.json1())
}

/**
 * This function made possible by this article as inspiration:
 * https://sreetamdas.com/blog/rss-for-nextjs
 */
