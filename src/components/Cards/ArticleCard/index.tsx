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
        styles.articleWrapper,
        isHiddenOnDesktopView && 'md:hidden',
        isNotLastChild && 'mb-6 md:mb-0',
        isGrid && 'w-full md:min-w-300 md:max-w-300 m-2'
      )}
    >
      <Link href={`/article/${slug}`}>
        <a>
          <div className={styles.titleWrapper}>
            <div className="flex">
              <figure className={styles.imageWrapper}>
                <Image
                  alt={`${title} Image`}
                  src={mediaItemUrl}
                  sizes={sizes}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={25}
                />
              </figure>
              <div className="flex flex-col flex-1 pl-4">
                <p className={styles.articleTitle}>{title}</p>

                <p className={styles.articleDate}>
                  {`${formatDate(date)} | ${authorName}`}
                </p>

                <ReactMarkdown
                  className={styles.excerpt}
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
