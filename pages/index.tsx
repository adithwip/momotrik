import type { NextPage, GetStaticProps } from 'next'

import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import dynamic from 'next/dynamic'

import HighlightedArticle from 'domain/home/HighlightedArticle'
import AllArticles from 'domain/home/AllArticles'

const Layout = dynamic(() => import('components/Layout'))
import { getAllPostsFetcher, useGetAllPosts } from 'lib/useGetAllPosts'

const IndexPage: NextPage = () => {
  const { getAllPostsData } = useGetAllPosts()

  const firstArticle = getAllPostsData.data?.posts.edges[0].node
  const restOfTheArticle = getAllPostsData.data?.posts.edges.slice(1)


  return (
    <Layout title="Momotrik | Motor, Mobil, Listrik" updating={getAllPostsData.isFetching}>
      {firstArticle ? (
        <HighlightedArticle data={firstArticle} />
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

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default IndexPage
