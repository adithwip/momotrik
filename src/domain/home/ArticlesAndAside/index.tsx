import dynamic from 'next/dynamic'

const Articles = dynamic(() => import('./Articles'))
const Aside = dynamic(() => import('./Aside'))

import { useGetAllPosts } from 'lib/useGetAllPosts'
import { useGetTrendingPosts } from 'lib/useGetTrendingPosts'

const ArticlesAndAside = () => {
  const { getAllPostsData } = useGetAllPosts()
  const { getTrendingPostsData } = useGetTrendingPosts()

  return (
    <div id="articles-and-aside" className="order-2 order-none md:flex">
      {getAllPostsData.data ? (
        <Articles data={getAllPostsData.data.posts.edges} />
      ) : null}

      <Aside data={getTrendingPostsData?.data?.posts.edges} />
    </div>
  )
}

export default ArticlesAndAside
