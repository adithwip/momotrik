import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { formatDate } from 'utils/formatDate'

import styles from './ArticleCard.module.css'
interface Props {
  isHiddenOnDesktopView?: boolean
  isNotLastChild?: boolean
  isGrid?: boolean
  slug: string
  title: string
  mediaItemUrl: string
  sizes?: string
  date: string
  authorName: string
  excerpt: string
}

const ArticleCard = ({
  isHiddenOnDesktopView = false,
  isNotLastChild = false,
  isGrid = false,
  slug,
  title,
  mediaItemUrl,
  sizes = '100vw',
  date,
  authorName,
  excerpt,
}: Props) => {
  return (
    <article
      className={clsx(
        'article-wrapper',
        styles.articleWrapper,
        isHiddenOnDesktopView && 'md:hidden',
        isNotLastChild && 'mb-6 md:mb-0',
        isGrid && 'w-full md:max-w-md'
      )}
    >
      <Link href={`/artikel/${slug}`}>
        <a className="article-link">
          <div className={styles.titleWrapper}>
            <div className="flex">
              <figure
                className={clsx('article-image-wrapper', styles.imageWrapper)}
              >
                <Image
                  className="article-image"
                  alt={`${title} Image`}
                  src={mediaItemUrl}
                  sizes={sizes}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={25}
                />
              </figure>
              <div className="flex flex-1 flex-col pl-4">
                <p className={clsx('article-title', styles.articleTitle)}>
                  {title}
                </p>

                <div
                  className={clsx(
                    'article-date-author-wrapper',
                    styles.articleDate
                  )}
                >
                  <time className="article-date" dateTime={date}>
                    {formatDate(date)}
                  </time>
                  <span className="article-author">{' | ' + authorName}</span>
                </div>

                <ReactMarkdown
                  className={clsx('article-excerpt', styles.excerpt)}
                  rehypePlugins={[rehypeRaw]}
                >
                  {excerpt}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </article>
  )
}

export default ArticleCard
