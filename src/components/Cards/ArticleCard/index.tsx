import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { stripHtmlTags } from 'utils/stripHtmlTags'
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
        isNotLastChild && 'mb-6 md:mb-12',
        isGrid && 'w-full md:min-w-300 md:max-w-300 m-2'
      )}
    >
      <Link href={`/article/${slug}`}>
        <a>
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

          <div className={styles.titleWrapper}>
            <div className="flex">
              <div className="flex flex-col flex-1 py-2 pr-4 md:p-0 md:pl-0">
                <p className={styles.articleTitle}>{title}</p>

                <p className={styles.articleDate}>
                  {`${formatDate(date)} | ${authorName}`}
                </p>

                <p className={styles.excerpt}>{stripHtmlTags(excerpt)}</p>
              </div>
              <div className={styles.mobileImageWrapper}>
                <Image
                  alt={`${title} Image`}
                  src={mediaItemUrl}
                  sizes={sizes}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={25}
                />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </article>
  )
}

export default ArticleCard
