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

      <Link href={`/article/${data.slug}`}>
        <a>
          <p className="text-2xl text-center font-bold tracking-wider leading-snug text-gray-900 px-5 pt-8 pb-6">
            {data.title}
          </p>
        </a>
      </Link>

      <p className="text-xs font-mono text-center text-blue-500 tracking-wider">
        {`${formatDate(data.date)} | ${data.author.node.name}`}
      </p>
    </article>
  )
}

export default HighlightedArticle