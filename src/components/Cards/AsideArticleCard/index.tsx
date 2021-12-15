import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { formatDate } from 'utils/formatDate'

import styles from './AsideArticleCard.module.css'

interface Props {
  slug: string
  mediaItemUrl: string
  sizes?: string
  title: string
  date: string
  authorName: string
  className?: string
}

const AsideArticleCard = ({
  slug,
  mediaItemUrl,
  sizes = '100vw',
  title,
  date,
  authorName,
  className,
}: Props) => {
  return (
    <article className={clsx(className)}>
      <Link href={`/artikel/${slug}`}>
        <a>
          <figure className={styles.imageWrapper}>
            <Image
              alt={title}
              src={mediaItemUrl}
              sizes={sizes}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={25}
            />
          </figure>

          <p className={styles.articleTitle}>{title}</p>

          <p className={styles.articleDate}>
            {`${formatDate(date)} | ${authorName}`}
          </p>
        </a>
      </Link>
    </article>
  )
}

export default AsideArticleCard
