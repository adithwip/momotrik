import type { NextPage, GetStaticProps } from 'next'

import * as React from 'react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import dynamic from 'next/dynamic'

const HighlightedArticle = dynamic(
  () => import('domain/home/HighlightedArticle')
)
const ArticlesAndAside = dynamic(() => import('domain/home/ArticlesAndAside'))
const PopularPosts = dynamic(() => import('domain/home/PopularPosts'))
const TrendingArticlesMobile = dynamic(
  () => import('domain/home/TrendingArticlesMobile')
)
const Layout = dynamic(() => import('components/Layout'))

import { getAllPostsFetcher } from 'lib/useGetAllPosts'
import {
  getAllStickyPostsFetcher,
  useGetAllStickyPosts,
} from 'lib/useGetAllStickyPosts'
import { getTrendingPostsFetcher } from 'lib/useGetTrendingPosts'
import { getPopularPostsFetcher } from 'lib/useGetPopularPosts'

const IndexPage: NextPage = () => {
  const { getAllStickyPostsData } = useGetAllStickyPosts()
  const MemoizedHighlightedArticle = React.memo(HighlightedArticle)

  return (
    <Layout
      title="Momotrik | Motor, Mobil, Listrik"
      description="Momotrik adalah media informasi yang membahas segala seluk beluk tentang mobil listrik, motor listrik, dan skuter listrik. Serta beragam hal tentang gaya hidup kendaraan listrik terbaru"
    >
      {getAllStickyPostsData.data ? (
        <MemoizedHighlightedArticle data={getAllStickyPostsData.data} />
      ) : null}
      <div className="flex flex-col">
        <TrendingArticlesMobile />
        <ArticlesAndAside />
        <PopularPosts />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', () => getAllPostsFetcher())
  await queryClient.prefetchQuery('stickyPosts', () =>
    getAllStickyPostsFetcher()
  )
  await queryClient.prefetchQuery('trending', () => getTrendingPostsFetcher())
  await queryClient.prefetchQuery('popular', () => getPopularPostsFetcher())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default IndexPage
