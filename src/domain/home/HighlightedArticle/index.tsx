import type { Edge } from 'interfaces/lib/getAllPosts.interface'

import Image from 'next/image'
import Link from 'next/link'
import classnames from 'classnames'

import ArticleContent from './ArticleContent'

import styles from './HighlightedArticle.module.css'
import React from 'react'

interface Props {
  data: Edge[]
}

const HighlightedArticle = ({ data }: Props) => {
  return (
    <>
      {/* Mobile view */}
      <div className={styles.slider}>
        {data.map(({ node }, index) => {
          return (
            <React.Fragment key={node.id}>
              <Link href={`/article/${node.slug}`}>
                <a>
                  <article className={styles.articleCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        priority={index === 0 ? true : false}
                        alt="Featured Article Image"
                        src={node!.featuredImage!.node.mediaItemUrl}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={25}
                      />
                    </div>


                    <ArticleContent
                      date={node.date}
                      authorName={node.author.node.name}
                      title={node.title}
                    />
                  </article>
                </a>
              </Link>
            </React.Fragment>
          )
        })}
      </div>

      {/* Desktop view */}
      <div className={styles.gridContainer}>
        {data.map(({ node }, index) => {
          return (
            <div key={node.id} className={classnames(
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