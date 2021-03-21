import type { Edge } from 'interfaces/lib/getTrendingPosts.interface'

import dynamic from 'next/dynamic'
import classnames from 'classnames'

const AsideArticleCard = dynamic(() => import('components/AsideArticleCard'))

interface Props {
  data: Edge[] | undefined
}

const Articles = ({ data }: Props) => {
  return (
    <aside className="hidden pl-20 pr-5 pt-10 pb-20 md:flex flex-col md:flex-1">
      <p className="text-2xl font-bold tracking-wider text-gray-900 mb-8">
        Trendings
      </p>

      {data ? data.map(({ node }, index, arr) => {
        const isNotLastChild = index !== arr.length - 1

        return (
          <div className={classnames({
            "mb-10": isNotLastChild
          })}
            key={index}
          >
            <AsideArticleCard
              index={index}
              slug={node.slug}
              mediaItemUrl={node.featuredImage.node.mediaItemUrl}
              title={node.title}
              date={node.date}
              authorName={node.author.node.name}
            />
          </div>
        )
      }) : null}
    </aside>
  )
}

export default Articles