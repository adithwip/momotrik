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
                <article className="flex items-center">
                  <div className="flex flex-col pr-2 border-gray-400">
                    <p className="text-sm text-gray-900 font-bold leading-normal line-clamp-3">
                      {node.title}
                    </p>
                    <p className={styles.articleDate}>
                      {`${formatDate(node.date)} | ${node.author.node.name}`}
                    </p>

                  </div>
                  <div className={styles.smallArticleCardImageWrapper}>
                    <Image
                      alt={node.title}
                      src={node.featuredImage.node.mediaItemUrl}
                      sizes={node.featuredImage.node.sizes}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      quality={15}
                    />

                    <div className="absolute left-2 top-2 shadow bg-white p-1 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>

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