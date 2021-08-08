import { useGetPopularPosts } from 'lib/useGetPopularPosts'

import dynamic from 'next/dynamic'
import classnames from 'classnames'

import styles from './PopularPosts.module.css'

const HighlightCard = dynamic(() => import('components/Cards/HighlightCard'))

const PopularPosts = () => {
  const { getPopularPostsData: { data } } = useGetPopularPosts()

  return (
    <aside className="pl-5 pr-2 md:mb-16">
      <p className="text-2xl font-bold tracking-wider text-gray-900 mb-8">
        Popular
      </p>

      <div className={classnames(styles.slider)}>
        {data ? data.posts.edges.map(({ node }, index) => {

          return (
            <div className={styles.asideCardWrapper} key={index}>
              <HighlightCard
                slug={node.slug}
                imageSrc={node.featuredImage.node.mediaItemUrl}
                sizes={node.featuredImage.node.sizes}
                title={node.title}
                date={node.date}
                authorName={node.author.node.name}
              />
            </div>
          )
        }) : null}
      </div>
    </aside>
  )
}

export default PopularPosts