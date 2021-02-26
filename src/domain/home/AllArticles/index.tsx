import type { Edge } from 'interfaces/lib/getAllPosts.interface'

import classnames from 'classnames'

import { formatDate } from 'utils/formatDate'

import styles from './AllArticles.module.css'

interface Props {
  data: Edge[]
}

const AllArticles = ({ data }: Props) => {
  return (
    <section className="px-5 pt-14 pb-20">
      <p className="text-2xl text-center font-mono font-bold tracking-wider text-gray-900 mb-8">
        All Articles
      </p>

      {data.map(({ node }, index, arr) => {
        const isNotLastChild = index !== arr.length - 1

        return (
          <article
            key={node.id}
            className={classnames({
              "mb-12": isNotLastChild
            })}
          >
            <img
              src={node.featuredImage?.node.mediaItemUrl}
              className={styles.image}
              alt={`${node.title} Image`}
            />
            <p className="text-xl text-center font-semibold tracking-wider leading-snug mt-5">
              {node.title}
            </p>
            <p className="text-xs font-mono text-center text-blue-500 tracking-wider mt-2">
              {`${formatDate(node.date)} | ${node.author.node.name}`}
            </p>
          </article>
        )
      })}
    </section>
  )
}

export default AllArticles