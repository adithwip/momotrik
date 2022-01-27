import type { TrendingPostsEdge } from 'interfaces/lib/getTrendingPosts.interface'

import dynamic from 'next/dynamic'

const AsideArticleCard = dynamic(
  () => import('components/Cards/AsideArticleCard')
)

interface Props {
  data: TrendingPostsEdge[] | undefined
}

const DesktopHomepageArticle = ({ data }: Props) => {
  return (
    <aside
      id="aside-desktop"
      className="hidden flex-1 flex-col pl-10 pr-5 pt-10 pb-20 md:flex"
    >
      <p className="mb-8 text-2xl font-semibold tracking-wider text-gray-900">
        Trendings
      </p>

      {data
        ? data.map(({ node }) => {
            return (
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
            )
          })
        : null}

      {/* DesktopHomepageArticle Ads placement */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3226350239455992"
        data-ad-slot="8612513575"
        data-ad-format="auto"
        data-full-width-responsive={true}
      />
    </aside>
  )
}

export default DesktopHomepageArticle
