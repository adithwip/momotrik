import { useGetPopularPosts } from 'lib/useGetPopularPosts'

import dynamic from 'next/dynamic'

import styles from './PopularPosts.module.css'

const HighlightCard = dynamic(() => import('components/Cards/HighlightCard'))

const PopularPosts = () => {
  const {
    getPopularPostsData: { data },
  } = useGetPopularPosts()

  return (
    <aside id="popular-posts" className="px-5 py-10 md:p-4 md:mb-16">
      <p className="text-2xl text-center font-semibold tracking-wider text-gray-900 mb-10 md:text-left">
        Popular
      </p>

      <div className={styles.slider}>
        {data
          ? data.posts.edges.map(({ node }, index) => {
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
            })
          : null}
      </div>
    </aside>
  )
}

export default PopularPosts
