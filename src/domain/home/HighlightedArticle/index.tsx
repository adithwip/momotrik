import type { AllPostsEdge } from 'interfaces/lib/getAllPosts.interface'

import Image from 'next/image'
import Link from 'next/link'
import classnames from 'classnames'

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
      <div className={styles.mobileHightlight}>
        {data.map(({ node }, index) => {
          if (index === 0) {
            return (
              <Link key={index} href={`/article/${node.slug}`}>
                <a>
                  <article className={styles.articleCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        priority
                        alt="Featured Article Image"
                        src={node!.featuredImage!.node.mediaItemUrl}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={25}
                      />
                    </div>

                    <p className={styles.articleDate}>
                      {`${formatDate(node.date)} | ${node.author.node.name}`}
                    </p>
                    <p className="text-xl text-gray-900 font-bold leading-normal line-clamp-3 mt-2">
                      {node.title}
                    </p>
                    <p className={styles.excerpt}>
                      {stripHtmlTags(node.excerpt)}
                    </p>
                  </article>
                </a>
              </Link>
            )
          }

          return (
            // // TODO
            // Make it reusable, please! Dear me!
            <Link href={`/article/${node.slug}`}>
              <a>
                <article className="flex items-center mb-4">
                  <div className={styles.smallArticleCardImageWrapper}>
                    <Image
                      priority={ index == 1 || index === 2 }
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
        })}
      </div>

      {/* Desktop view */}
      <div className={styles.gridContainer}>
        {data.map(({ node }, index) => {
          return (
            <div key={index} className={classnames(
              styles.gridCard,
              {
                [styles.gridHighlight]: index === 0,
                [styles.gridRest]: index !== 0,
                [styles.grid1]: index === 0,
                [styles.grid2]: index === 1,
                [styles.grid3]: index === 2,
                [styles.grid4]: index === 3,
                [styles.grid5]: index === 4,
                // I might be shame with this approach someday :(
              }

            )}>
              <Link href={`/article/${node.slug}`}>
                <a>
                  <Image
                    priority
                    alt="Featured Article Image Grid"
                    src={node!.featuredImage!.node.mediaItemUrl}
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
      </div>
    </>
  )
}

export default HighlightedArticle