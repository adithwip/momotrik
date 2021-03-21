import type { Edge } from 'interfaces/lib/getTrendingPosts.interface'

import Image from 'next/image'
import Link from 'next/link'
import classnames from 'classnames'

import { formatDate } from 'utils/formatDate'

import styles from './Aside.module.css'

interface Props {
  data: Edge[] | undefined
}

const Articles = ({ data }: Props) => {
  return (
    <aside className="hidden pl-20 pr-5 pt-10 pb-20 md:flex flex-col md:flex-1">
      <p className="text-2xl font-bold tracking-wider text-gray-900 mb-8">
        Trendings
      </p>

      {data ? data.map(({ node }, index, arr) => {
        const isNotLastChild = index !== arr.length - 1

        return (
          <article
            key={node.id}
            className={classnames({
              "mb-10": isNotLastChild
            })}
          >
            <Link href={`/article/${node.slug}`}>
              <a>
                <div className={styles.imageWrapper}>
                  <Image
                    priority={index === 0}
                    alt={node.title}
                    src={node.featuredImage.node.mediaItemUrl}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    quality={25}
                  />
                </div>

                <p className={styles.articleTitle}>
                  {node.title}
                </p>

                <p className={styles.articleDate}>
                  {`${formatDate(node.date)} | ${node.author.node.name}`}
                </p>
              </a>
            </Link>
          </article>
        )
      }) : null}
    </aside>
  )
}

export default Articles