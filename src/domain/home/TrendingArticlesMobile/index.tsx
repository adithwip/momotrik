import { useGetTrendingPosts } from 'lib/useGetTrendingPosts'

import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from 'utils/formatDate'

import styles from './TrendingArticlesMobile.module.css'

const TrendingArticlesMobile = () => {
  const {
    getTrendingPostsData: { data },
  } = useGetTrendingPosts()

  return (
    <section
      id="trending-articles-mobile"
      className="bg-primary-dark px-5 pt-10 md:hidden"
    >
      <div className="mb-8 flex items-center justify-center">
        <p className="mr-5 text-2xl font-semibold tracking-wider text-white">
          Artikel Trending
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 rounded bg-white p-1 text-green-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        {data
          ? data.posts.edges.map(({ node }, index) => {
              return (
                <Link key={index} href={`/artikel/${node.slug}`}>
                  <a className={styles.cardWrapper}>
                    <article className="flex">
                      <figure className={styles.smallArticleCardImageWrapper}>
                        <Image
                          alt={node.title}
                          src={node.featuredImage.node.mediaItemUrl}
                          sizes={node.featuredImage.node.sizes}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          quality={15}
                        />
                      </figure>
                      <div className="flex flex-col border-gray-400 pl-4">
                        <p className="text-base font-semibold leading-tight tracking-normal text-white">
                          {node.title}
                        </p>
                        <p className={styles.articleDate}>
                          <span className="text-gray-50">
                            {node.author.node.name}
                          </span>
                          <br />
                          {formatDate(node.date)}
                        </p>
                      </div>
                    </article>
                  </a>
                </Link>
              )
            })
          : null}
      </div>
    </section>
  )
}

export default TrendingArticlesMobile
