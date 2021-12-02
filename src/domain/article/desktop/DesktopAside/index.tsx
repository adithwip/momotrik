import dynamic from 'next/dynamic'

const AsideArticleCard = dynamic(
  () => import('components/Cards/AsideArticleCard')
)

import { useGetTrendingPosts } from 'lib/useGetTrendingPosts'

import styles from './DesktopAside.module.css'

const DesktopAside = () => {
  const {
    getTrendingPostsData: { data },
  } = useGetTrendingPosts()

  return (
    <aside id="article-aside-desktop" className={styles.aside}>
      <p className="text-2xl font-semibold tracking-wider text-gray-900 mb-8">
        Artikel Trending
      </p>

      {data?.posts.edges.map(({ node }) => (
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

      {/* Aside Ads placement */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3226350239455992"
        data-ad-slot="8612513575"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}

export default DesktopAside
