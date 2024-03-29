import type {
  Edge,
  PostsByCategoryNode,
} from 'interfaces/lib/getPostsByCategoryName.interface'
import type {
  Edge as GetPostsBySearchEdge,
  PostsBySearchNode,
} from 'interfaces/lib/getPostsBySearch.interface'
import type {
  AllPostsEdge,
  AllPostsNode,
} from 'interfaces/lib/getAllPosts.interface'

import { Fragment } from 'react'

import ArticleCard from 'components/Cards/ArticleCard'
interface Props {
  postData: Edge[] | GetPostsBySearchEdge[] | AllPostsEdge[]
}

const ArticlesGrid = ({ postData }: Props) => {
  return (
    <main className="flex flex-wrap justify-between p-5">
      {postData.map(
        ({
          node,
        }: {
          node: PostsByCategoryNode | PostsBySearchNode | AllPostsNode
        }) => {
          return (
            <Fragment key={node.slug}>
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
        }
      )}
    </main>
  )
}

export default ArticlesGrid
