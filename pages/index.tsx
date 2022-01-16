import type { NextPage, GetStaticProps } from 'next'
import type { Edge } from 'interfaces/lib/getInstagramMedias'

import * as React from 'react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import dynamic from 'next/dynamic'

import { getInstagramMedias } from 'lib/getInstagramMedias'
import { generateRssFeed } from 'utils/generateRssFeed'

import { instagramMediasMocks } from 'mocks/instagramMedias'

const HighlightedArticle = dynamic(
  () => import('domain/home/HighlightedArticle')
)
const ArticlesAndAside = dynamic(() => import('domain/home/ArticlesAndAside'))
const PopularPosts = dynamic(() => import('domain/home/PopularPosts'))
const TrendingArticlesMobile = dynamic(
  () => import('domain/home/TrendingArticlesMobile')
)
const Layout = dynamic(() => import('components/Layout'))
const InstagramPosts = dynamic(() => import('domain/home/InstagramPosts'))

import { getAllPostsFetcher } from 'lib/useGetAllPosts'
import {
  getAllStickyPostsFetcher,
  useGetAllStickyPosts,
} from 'lib/useGetAllStickyPosts'
import { getTrendingPostsFetcher } from 'lib/useGetTrendingPosts'
import { getPopularPostsFetcher } from 'lib/useGetPopularPosts'
import { getRecentPostsFetcher } from 'lib/useGetRecentPosts'

type Props = {
  instagramMedias: Edge[]
}

const IndexPage: NextPage<Props> = ({ instagramMedias }) => {
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
        <InstagramPosts instagramMedias={instagramMedias} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeed()
  let instagramMedias: Edge[]

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', () => getAllPostsFetcher())
  await queryClient.prefetchQuery('stickyPosts', () =>
    getAllStickyPostsFetcher()
  )
  await queryClient.prefetchQuery('trending', () => getTrendingPostsFetcher())
  await queryClient.prefetchQuery('popular', () => getPopularPostsFetcher())
  await queryClient.prefetchQuery('recent', () => getRecentPostsFetcher())

  /**
   * Get instagram medias only at build time
   * No React Query needed
   */
  try {
    /**
     * Only fetch data from instagram API we use on development
     * It will cost us more if we're not doing this that way
     */
    if (process.env.NODE_ENV === 'development') {
      console.info(
        'Info: Use instagram media data with mock data in Development'
      )
      instagramMedias = instagramMediasMocks
    } else {
      console.info(
        'Info: Use instagram media data with real data in Production'
      )
      const res = await getInstagramMedias()

      instagramMedias = res.data.data.user.edge_owner_to_timeline_media.edges
    }
  } catch (error) {
    throw new Error(
      `Error: GET Instragram medias at [getStaticProps]: ${error}`
    )
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      instagramMedias,
    },
  }
}

export default IndexPage
