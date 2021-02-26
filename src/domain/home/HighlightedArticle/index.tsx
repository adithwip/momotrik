import type { AllPostsNode } from 'interfaces/lib/getAllPosts.interface'

import { formatDate } from 'utils/formatDate'

import styles from './HighlightedArticle.module.css'

interface Props {
  data: AllPostsNode
}

const HighlightedArticle = ({ data }: Props) => {
  return (
    <article className="py-12 border-b border-gray-900">
      <img
        src={data.featuredImage?.node.mediaItemUrl}
        className={styles.image}
        alt="Featured Article Image"
      />

      <p className="text-2xl text-center font-bold tracking-wider leading-snug text-gray-900 px-5 pt-8 pb-6">
        {data.title}
      </p>

      <p className="text-xs font-mono text-center text-gray-900 tracking-wider">
        {`${formatDate(data.date)} | ${data.author.node.name}`}
      </p>
    </article>
  )
}

export default HighlightedArticle