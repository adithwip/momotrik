import type { AllPostsEdge } from 'interfaces/lib/getAllPosts.interface'

import { Fragment } from 'react'
import Link from 'next/link'

import ArticleCard from 'components/Cards/ArticleCard'
interface Props {
  data: AllPostsEdge[]
}

const Articles = ({ data }: Props) => {
  return (
    <section className="px-5 pt-10 pb-20 md:flex-2">
      <p className="text-2xl font-semibold tracking-wider text-gray-900 mb-8">
        All Articles
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

      <div className="w-full text-center mt-12 md:mt-0">
        <Link href="/all-posts">
          <a className="text-2xl font-semibold">Lihat semua artikel</a>
        </Link>
      </div>
    </section>
  )
}

export default Articles
