import type { NextPage, GetStaticProps } from 'next'

import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import dynamic from 'next/dynamic'

import HighlightedArticle from 'domain/home/HighlightedArticle'

const Layout = dynamic(() => import('components/Layout'))
import { getAllPostsFetcher, useGetAllPosts } from 'lib/useGetAllPosts'

const IndexPage: NextPage = () => {
  const { getAllPostsData } = useGetAllPosts()

  
  // console.log('getAllPostsData ?? ', getAllPostsData.data?.posts.edges)
  console.log('isFetching ?? ', getAllPostsData.isFetching)
  const firstArticle = getAllPostsData.data?.posts.edges[0].node
  // console.log('firstArticle ?? ', firstArticle)

  return (
    <Layout title="Momotrik | Motor, Mobil, Listrik" updating={getAllPostsData.isFetching}>
      {firstArticle ? (
        <HighlightedArticle data={firstArticle} />
      ) : null}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', () => getAllPostsFetcher())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default IndexPage
