import type { Edge } from 'interfaces/lib/getAllPosts.interface'

import Image from 'next/image'
import Link from 'next/link'
import classnames from 'classnames'

import { stripHtmlTags } from 'utils/stripHtmlTags'
import { formatDate } from 'utils/formatDate'

import styles from './AllArticles.module.css'

interface Props {
  data: Edge[]
}

const AllArticles = ({ data }: Props) => {
  return (
    <section className="px-5 pt-14 pb-20">
      <p className="text-2xl text-center font-bold tracking-wider text-gray-900 mb-8">
        All Articles
      </p>

      {data.map(({ node }, index, arr) => {
        const isNotLastChild = index !== arr.length - 1

        return (
          <article
            key={node.id}
            className={classnames(styles.articleWrapper, {
              "mb-12": isNotLastChild
            })}
          >
            <Link href={`/article/${node.slug}`}>
              <a>
                <div className={styles.imageWrapper}>
                  <Image
                    alt={`${node.title} Image`}
                    src={node!.featuredImage!.node.mediaItemUrl}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>

                <div className={styles.titleWrapper}>
                  <p className={styles.articleTitle}>
                    {node.title}
                  </p>

                  <p className={styles.articleDate}>
                    {`${formatDate(node.date)} | ${node.author.node.name}`}
                  </p>

                  <p className={styles.excerpt}>
                    {`${stripHtmlTags(node.excerpt).substring(0, 140)} ...`}
                  </p>
                </div>
              </a>
            </Link>
          </article>
        )
      })}
    </section>
  )
}

export default AllArticles