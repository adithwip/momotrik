import Image from 'next/image'
import Link from 'next/link'
import classnames from 'classnames'

import { stripHtmlTags } from 'utils/stripHtmlTags'
import { formatDate } from 'utils/formatDate'

import styles from './ArticleCard.module.css'

interface Props {
  isNotLastChild?: boolean,
  isGrid?: boolean,
  slug: string,
  title: string,
  mediaItemUrl: string,
  date: string,
  authorName: string,
  excerpt: string
}

const ArticleCard = ({
  isNotLastChild = false,
  isGrid = false,
  slug,
  title,
  mediaItemUrl,
  date,
  authorName,
  excerpt
}: Props) => {
  return (
    <article className={classnames(styles.articleWrapper, {
      "mb-12": isNotLastChild,
      "w-full md:min-w-300 md:max-w-300 m-2": isGrid
    })}>
      <Link href={`/article/${slug}`}>
        <a>
          <div className={styles.imageWrapper}>
            <Image
              alt={`${title} Image`}
              src={mediaItemUrl}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={25}
            />
          </div>

          <div className={styles.titleWrapper}>
            <div className="flex">
              <div className={styles.mobileImageWrapper}>
                <Image
                  alt={`${title} Image`}
                  src={mediaItemUrl}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  quality={25}
                />
              </div>

              <div className="flex flex-col flex-1 p-2 pl-4 md:p-0 md:pl-0">
                <p className={styles.articleTitle}>
                  {title}
                </p>

                <p className={styles.articleDate}>
                  {`${formatDate(date)} | ${authorName}`}
                </p>

                <p className={styles.excerpt}>
                  {stripHtmlTags(excerpt)}
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </article>
  )
}

export default ArticleCard