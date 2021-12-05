import type { TrendingPostsEdge } from 'interfaces/lib/getTrendingPosts.interface'

import dynamic from 'next/dynamic'

const AsideArticleCard = dynamic(
  () => import('components/Cards/AsideArticleCard')
)

import styles from './MobileAside.module.css'

type Props = {
  data: TrendingPostsEdge[] | undefined
}

const MobileAside = ({ data }: Props) => {
  return (
    <aside id="article-aside-mobile" className={styles.aside}>
      <p className="text-3xl font-semibold tracking-wider text-gray-900 mb-8">
        Baca Juga
      </p>

      {data?.map(({ node }) => (
        <AsideArticleCard
          key={node.id}
          className="mb-10"
          slug={node.slug}
          mediaItemUrl={node.featuredImage.node.mediaItemUrl}
          sizes={node.featuredImage.node.sizes}
          title={node.title}
          date={node.date}
          authorName={node.author.node.name}
        />
      ))}
    </aside>
  )
}

export default MobileAside
