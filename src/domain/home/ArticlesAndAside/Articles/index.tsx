import type { Edge } from 'interfaces/lib/getAllPosts.interface'

import { Fragment } from 'react'

import ArticleCard from 'components/Cards/ArticleCard'
interface Props {
  data: Edge[]
}

const Articles = ({ data }: Props) => {
  return (
    <section className="px-5 pt-10 pb-20 md:flex-2">
      <p className="text-2xl font-bold tracking-wider text-gray-900 mb-8">
        All Articles
      </p>

      {data.map(({ node }, index, arr) => {
        const isNotLastChild = index !== arr.length - 1

        return (
          <Fragment key={node.id}>
            <ArticleCard
              isNotLastChild={isNotLastChild}
              slug={node.slug}
              title={node.title}
              mediaItemUrl={node!.featuredImage!.node.mediaItemUrl}
              date={node.date}
              authorName={node.author.node.name}
              excerpt={node.excerpt}
              />
          </Fragment>
        )
      })}
    </section>
  )
}

export default Articles