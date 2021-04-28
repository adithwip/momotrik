import type { NextPage, GetServerSideProps } from 'next'

import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import dynamic from 'next/dynamic'

const HighlightedArticle = dynamic(() => import('domain/home/HighlightedArticle'))
const ArticlesAndAside = dynamic(() => import('domain/home/ArticlesAndAside'))
const PopularPosts = dynamic(() => import('domain/home/PopularPosts'))
const Layout = dynamic(() => import('components/Layout'))

import { getAllPostsFetcher } from 'lib/useGetAllPosts'
import { getAllStickyPostsFetcher, useGetAllStickyPosts } from 'lib/useGetAllStickyPosts'
import { getTrendingPostsFetcher } from 'lib/useGetTrendingPosts'
import { getPopularPostsFetcher } from 'lib/useGetPopularPosts'

const IndexPage: NextPage = () => {
  const { getAllStickyPostsData } = useGetAllStickyPosts()

  return (
    <Layout
      title="Momotrik | Motor, Mobil, Listrik"
      description="Momotrik adalah media informasi yang membahas segala seluk beluk tentang mobil listrik, motor listrik, dan skuter listrik. Serta beragam hal tentang gaya hidup kendaraan listrik terbaru"
      updating={getAllStickyPostsData.isFetching}
    >
      {getAllStickyPostsData.data ? (
        <HighlightedArticle data={getAllStickyPostsData.data} />
      ) : null} {/* handle null with proper component // TODO */}

      <ArticlesAndAside />
      <PopularPosts />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', () => getAllPostsFetcher())
  await queryClient.prefetchQuery('stickyPosts', () => getAllStickyPostsFetcher())
  await queryClient.prefetchQuery('trending', () => getTrendingPostsFetcher())
  await queryClient.prefetchQuery('popular', () => getPopularPostsFetcher())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default IndexPage
