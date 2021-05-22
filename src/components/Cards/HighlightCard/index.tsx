import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from 'utils/formatDate'

import styles from './HighlightCard.module.css'

interface Props {
  slug: string,
  imageSrc: string,
  date: string,
  authorName: string,
  title: string
}

const HighlightCard = ({ slug, imageSrc, date, authorName, title}: Props) => {
  return (
    <article className={styles.card}>
      <Link href={`/article/${slug}`}>
        <a>
          <Image
            priority
            alt="Featured Article Image Grid"
            src={imageSrc}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={25}
          />

          <div className={styles.articleContent}>
            <p className={styles.articleDate}>
              {`${formatDate(date)} | ${authorName}`}
            </p>
            <p className={styles.articleTitle}>
              {title}
            </p>
          </div>
        </a>
      </Link>
    </article>
  )
}

export default HighlightCard