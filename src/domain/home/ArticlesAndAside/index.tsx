import dynamic from 'next/dynamic'

const Articles = dynamic(() => import('./Articles'))
const Aside = dynamic(() => import('./Aside'))

import { useGetAllPosts } from 'lib/useGetAllPosts'
import { useGetTrendingPosts } from 'lib/useGetTrendingPosts'

const ArticlesAndAside = () => {
  const { getAllPostsData } = useGetAllPosts()
  const { getTrendingPostsData } = useGetTrendingPosts()

  return (
    <div className="order-2 md:flex md:order-none">
      {getAllPostsData.data ? (
        <Articles data={getAllPostsData.data.posts.edges} />
      ) : null}

      <Aside data={getTrendingPostsData?.data?.posts.edges} />
    </div>
  )
}

export default ArticlesAndAside