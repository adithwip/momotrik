import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { formatDate } from 'utils/formatDate'

import styles from './HighlightCard.module.css'

interface Props {
  slug: string
  imageSrc: string
  className?: string
  sizes: string
  date: string
  authorName: string
  title: string
}

const HighlightCard = ({
  slug,
  imageSrc,
  sizes,
  className,
  date,
  authorName,
  title,
}: Props) => {
  return (
    <article className={clsx(styles.card, className)}>
      <Link href={`/artikel/${slug}`}>
        <a>
          <Image
            priority
            alt="Featured Article Image Grid"
            src={imageSrc}
            sizes={sizes}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={25}
          />

          <div className="absolute left-4 top-4 rounded bg-white p-1 shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className={styles.articleContent}>
            <p className={styles.articleDate}>
              {`${formatDate(date)} | ${authorName}`}
            </p>
            <p className={styles.articleTitle}>{title}</p>
          </div>
        </a>
      </Link>
    </article>
  )
}

export default HighlightCard
