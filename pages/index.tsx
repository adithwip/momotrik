import type { NextPage, GetStaticProps } from 'next'

import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import dynamic from 'next/dynamic'

const HighlightedArticle = dynamic(() => import('domain/home/HighlightedArticle'))
const AllArticles = dynamic(() => import('domain/home/AllArticles'))
const Layout = dynamic(() => import('components/Layout'))

import { getAllPostsFetcher, useGetAllPosts } from 'lib/useGetAllPosts'
import { getAllStickyPostsFetcher, useGetAllStickyPosts } from 'lib/useGetAllStickyPosts'

const IndexPage: NextPage = () => {
  const { getAllPostsData } = useGetAllPosts()
  const { getAllStickyPostsData } = useGetAllStickyPosts()

  const restOfTheArticle = getAllPostsData.data?.posts.edges.slice(1)

  return (
    <Layout 
      title="Momotrik | Motor, Mobil, Listrik"
      description="Momotrik adalah media informasi yang membahas segala seluk beluk tentang mobil listrik, motor listrik, dan skuter listrik. Serta beragam hal tentang gaya hidup kendaraan listrik terbaru"
      updating={getAllPostsData.isFetching}
    >
      {getAllStickyPostsData.data ? (
        <HighlightedArticle data={getAllStickyPostsData.data} />
      ) : null} {/* handle null with proper component // TODO */}

      {restOfTheArticle ? (
        <AllArticles data={restOfTheArticle} />
      ) : null}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', () => getAllPostsFetcher())
  await queryClient.prefetchQuery('stickyPosts', () => getAllStickyPostsFetcher())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default IndexPage
