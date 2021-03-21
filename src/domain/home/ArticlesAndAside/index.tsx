import Articles from './Articles'
import Aside from './Aside'

import { useGetAllPosts } from 'lib/useGetAllPosts'
import { useGetTrendingPosts } from 'lib/useGetTrendingPosts'

const ArticlesAndAside = () => {
  const { getAllPostsData } = useGetAllPosts()
  const { getTrendingPostsData } = useGetTrendingPosts()

  return (
    <div className="md:flex">
      {getAllPostsData.data ? (
        <Articles data={getAllPostsData.data.posts.edges} />
      ) : null}

      <Aside data={getTrendingPostsData?.data?.posts.edges} />
    </div>
  )
}

export default ArticlesAndAside