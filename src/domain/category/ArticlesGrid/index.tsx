import type { Edge } from 'interfaces/lib/getPostsByCategoryName.interface'

import { Fragment } from 'react'

import ArticleCard from 'components/Cards/ArticleCard'

interface Props {
  postData: Edge[]
}

const ArticlesGrid = ({ postData }: Props) => {
  return (
    <main className="flex flex-wrap p-5">
      {postData.map(({ node }) => {
        return (
          <Fragment key={node.id}>
            <ArticleCard
              isGrid
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
    </main>
  )
}

export default ArticlesGrid