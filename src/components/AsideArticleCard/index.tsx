import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from 'utils/formatDate'

import styles from './AsideArticleCard.module.css'

interface Props {
  index: number,
  slug: string,
  mediaItemUrl: string,
  title: string,
  date: string,
  authorName: string
}

const AsideArticleCard = ({
  index,
  slug,
  mediaItemUrl,
  title,
  date,
  authorName
}: Props) => {
  return (
    <article>
      <Link href={`/article/${slug}`}>
        <a>
          <div className={styles.imageWrapper}>
            <Image
              priority={index === 0}
              alt={title}
              src={mediaItemUrl}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={25}
            />
          </div>

          <p className={styles.articleTitle}>
            {title}
          </p>

          <p className={styles.articleDate}>
            {`${formatDate(date)} | ${authorName}`}
          </p>
        </a>
      </Link>
    </article>
  )
}

export default AsideArticleCard