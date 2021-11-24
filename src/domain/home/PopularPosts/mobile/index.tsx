import { useGetPopularPosts } from 'lib/useGetPopularPosts'

import HighlightCard from 'components/Cards/HighlightCard'

import styles from './MobilePopularPosts.module.css'

const MobilePopularPosts = () => {
  const {
    getPopularPostsData: { data },
  } = useGetPopularPosts()
  return (
    <aside
      id="popular-posts-mobile"
      className="bg-primary-light px-5 pt-10 md:hidden"
    >
      <p className="text-2xl text-center font-semibold tracking-wider text-white mb-10">
        Popular
      </p>

      <div className="flex flex-col">
        {data
          ? data.posts.edges.map(({ node }, index) => {
              return (
                <HighlightCard
                  className={styles.highlightCard}
                  key={index}
                  slug={node.slug}
                  imageSrc={node.featuredImage.node.mediaItemUrl}
                  sizes={node.featuredImage.node.sizes}
                  title={node.title}
                  date={node.date}
                  authorName={node.author.node.name}
                />
              )
            })
          : null}
      </div>
    </aside>
  )
}

export default MobilePopularPosts
