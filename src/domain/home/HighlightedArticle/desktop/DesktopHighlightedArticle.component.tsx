import type { AllPostsEdge } from 'interfaces/lib/getAllPosts.interface'

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import ArticleContent from '../ArticleContent'
import SocialMediaProfile from 'components/SocialMediaProfile'

import { useMediaQueries } from 'hooks/useMediaQueries'
import styles from '../HighlightedArticle.module.css'

interface Props {
  data: AllPostsEdge[]
}

const DesktopHighlightedArticle = ({ data }: Props) => {
  const { isDesktop } = useMediaQueries()

  return (
    <section
      id="highlighted-article-desktop"
      className={styles.desktopHighlight}
    >
      {isDesktop ? <SocialMediaProfile /> : null}
      <div className={styles.gridContainer}>
        {data.map(({ node }, index) => {
          if (index === 0) {
            return (
              <div
                key={node.id}
                className={clsx('row-span-2', styles.gridCard)}
              >
                <Link href={`/artikel/${node.slug}`}>
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
              <Link href={`/artikel/${node.slug}`}>
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
      </div>
    </section>
  )
}

export default DesktopHighlightedArticle
