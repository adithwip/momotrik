import type { AllPostsNode } from 'interfaces/lib/getAllPosts.interface'

import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from 'utils/formatDate'

import styles from './HighlightedArticle.module.css'

interface Props {
  data: AllPostsNode
}

const HighlightedArticle = ({ data }: Props) => {
  return (
    <article className="py-12 border-b border-gray-900">
      <Link href={`/article/${data.slug}`}>
        <a>
          <div className={styles.imageWrapper}>
            <Image
              priority
              alt="Featured Article Image"
              src={data!.featuredImage!.node.mediaItemUrl}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>

          <p className={styles.articleTitle}>
            {data.title}
          </p>
        </a>
      </Link>

      <p className={styles.articleDate}>
        {`${formatDate(data.date)} | ${data.author.node.name}`}
      </p>
    </article>
  )
}

export default HighlightedArticle