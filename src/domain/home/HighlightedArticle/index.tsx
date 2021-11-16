import type { AllPostsEdge } from 'interfaces/lib/getAllPosts.interface'

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import ArticleContent from './ArticleContent'

import { formatDate } from 'utils/formatDate'
import { stripHtmlTags } from 'utils/stripHtmlTags'

import styles from './HighlightedArticle.module.css'

interface Props {
  data: AllPostsEdge[]
}

const HighlightedArticle = ({ data }: Props) => {
  return (
    <>
      {/* Mobile view */}
      <section className={styles.mobileHightlight}>
        {data.map(({ node }, index) => {
          if (index === 0) {
            return (
              <Link key={node.id} href={`/article/${node.slug}`}>
                <a>
                  <article className={styles.articleCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        priority
                        alt="Featured Article Image"
                        src={node.featuredImage.node.mediaItemUrl}
                        sizes={node.featuredImage.node.sizes}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={25}
                      />
                    </div>

                    <p className={styles.articleTitle}>{node.title}</p>
                    <p className={styles.articleDate}>
                      {`By ${node.author.node.name} — ${formatDate(node.date)}`}
                    </p>
                    <p className={styles.excerpt}>
                      {stripHtmlTags(node.excerpt)}
                    </p>
                  </article>
                </a>
              </Link>
            )
          }

          // TODO
          // Make it reusable, please! Dear me!
          return (
            <Link key={node.id} href={`/article/${node.slug}`}>
              <a>
                <article className="flex items-center mb-4">
                  <div className="flex flex-col pr-5">
                    <p className="text-sm text-gray-900 font-bold leading-normal line-clamp-3">
                      {node.title}
                    </p>
                    <p className={styles.articleDate}>
                      {`${formatDate(node.date)} | ${node.author.node.name}`}
                    </p>
                  </div>

                  <div className={styles.smallArticleCardImageWrapper}>
                    <Image
                      priority={index === 1}
                      alt={node.title}
                      src={node!.featuredImage!.node.mediaItemUrl}
                      sizes={node.featuredImage.node.sizes}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      quality={15}
                    />

                    <div className="absolute left-2 top-2 shadow bg-white p-1 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              </a>
            </Link>
          )
        })}
      </section>

      {/* Desktop view */}
      <section className={styles.gridContainer}>
        {data.map(({ node }, index) => {
          if (index === 0) {
            return (
              <div
                key={node.id}
                className={clsx('row-span-2', styles.gridCard)}
              >
                <Link href={`/article/${node.slug}`}>
                  <a>
                    <Image
                      priority
                      alt="Featured Article Image Grid"
                      src={node!.featuredImage!.node.mediaItemUrl}
                      sizes={node.featuredImage.node.sizes}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      quality={25}
                    />

                    <ArticleContent
                      date={node.date}
                      authorName={node.author.node.name}
                      title={node.title}
                    />
                  </a>
                </Link>
              </div>
            )
          }

          return (
            <div key={node.id} className={styles.gridCard}>
              <Link href={`/article/${node.slug}`}>
                <a>
                  <Image
                    priority
                    alt="Featured Article Image Grid"
                    src={node!.featuredImage!.node.mediaItemUrl}
                    sizes={node.featuredImage.node.sizes}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    quality={25}
                  />

                  <ArticleContent
                    date={node.date}
                    authorName={node.author.node.name}
                    title={node.title}
                  />
                </a>
              </Link>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default HighlightedArticle
