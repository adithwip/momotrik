import { useGetTrendingPosts } from 'lib/useGetTrendingPosts'

import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from 'utils/formatDate'

import styles from './TrendingArticlesMobile.module.css'

const TrendingArticlesMobile = () => {
  const { getTrendingPostsData: { data } } = useGetTrendingPosts()

  return (
    <section className="pl-5 pr-2 mt-4 mb-8 md:hidden">
      <p className="text-2xl font-bold tracking-wider text-gray-900 mb-8">
        Trending Articles
      </p>

      <div className={styles.slider}>
        {data ? data.posts.edges.map(({ node }, index) => {
          return (
            <Link key={index} href={`/article/${node.slug}`}>
              <a className={styles.cardWrapper}>
                <article className="flex items-center mb-4">
                  <div className={styles.smallArticleCardImageWrapper}>
                    <Image
                      alt={node.title}
                      src={node!.featuredImage!.node.mediaItemUrl}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      quality={15}
                    />

                  </div>
                  <div className="flex flex-col pl-5">
                    <p className="text-sm text-gray-900 font-bold leading-normal line-clamp-3">
                      {node.title}
                    </p>
                    <p className={styles.articleDate}>
                      {`${formatDate(node.date)} | ${node.author.node.name}`}
                    </p>

                  </div>
                </article>
              </a>
            </Link>
          )
        }) : null}
      </div>
    </section>
  )
}

export default TrendingArticlesMobile