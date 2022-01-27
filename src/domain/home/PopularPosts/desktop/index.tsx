import HighlightCard from 'components/Cards/HighlightCard'

import { useGetPopularPosts } from 'lib/useGetPopularPosts'

import styles from './DesktopPopularPosts.module.css'

const DesktopPopularPosts = () => {
  const {
    getPopularPostsData: { data },
  } = useGetPopularPosts()

  return (
    <aside id="popular-posts-desktop" className="mb-16 hidden p-4 md:block">
      <p className="mb-10 text-left text-2xl font-semibold tracking-wider text-gray-900">
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

export default DesktopPopularPosts
