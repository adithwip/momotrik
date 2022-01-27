import type { AllPostsEdge } from 'interfaces/lib/getAllPosts.interface'

import { Fragment } from 'react'
import Link from 'next/link'

import ArticleCard from 'components/Cards/ArticleCard'

import { useMediaQueries } from 'hooks/useMediaQueries'
interface Props {
  data: AllPostsEdge[]
}

const Articles = ({ data }: Props) => {
  const { isMobile } = useMediaQueries()

  return (
    <section
      id={`articles-${isMobile ? 'mobile' : 'desktop'}`}
      className="px-5 pt-10 pb-20 md:flex-2"
    >
      <p className="mb-8 text-2xl font-semibold tracking-wider text-gray-900">
        Artikel Baru
      </p>

      {data.map(({ node }, index, arr) => {
        const isNotLastChild = index !== arr.length - 1

        return (
          <Fragment key={node.id + index}>
            <ArticleCard
              isHiddenOnDesktopView={index > 14}
              isNotLastChild={isNotLastChild}
              slug={node.slug}
              title={node.title}
              mediaItemUrl={node.featuredImage.node.mediaItemUrl}
              sizes={node.featuredImage.node.sizes}
              date={node.date}
              authorName={node.author.node.name}
              excerpt={node.excerpt}
            />
          </Fragment>
        )
      })}

      <div className="mt-12 w-full text-center md:mt-0">
        <Link href="/all-posts">
          <a className="text-2xl font-semibold">Lihat semua artikel</a>
        </Link>
      </div>
    </section>
  )
}

export default Articles
