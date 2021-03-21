import { useGetPopularPosts } from 'lib/useGetPopularPosts'

import dynamic from 'next/dynamic'
import classnames from 'classnames'

import styles from './PopularPosts.module.css'

const AsideArticleCard = dynamic(() => import('components/AsideArticleCard'))

const PopularPosts = () => {
  const { getPopularPostsData: { data } } = useGetPopularPosts()

  return (
    <aside className="mb-16">
      <p className="text-2xl font-bold tracking-wider text-gray-900 mb-8 px-5 md:px-0">
        Popular
      </p>

      <div className={classnames(styles.slider)}>
        {data ? data.posts.edges.map(({ node }, index) => {

          return (
            <div className={styles.asideCardWrapper} key={index}>
              <AsideArticleCard
                index={index}
                slug={node.slug}
                mediaItemUrl={node.featuredImage.node.mediaItemUrl}
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