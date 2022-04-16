import type { NextPage, GetStaticProps } from 'next'

import * as React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { QueryClient, dehydrate } from 'react-query'

const Layout = dynamic(() => import('components/Layout'))
const ArticlesGrid = dynamic(() => import('domain/common/ArticlesGrid'))
const GeneralFeedback = dynamic(() => import('components/GeneralFeedback'))
const MobileSearch = dynamic(() => import('domain/search/MobileSearch'))

import { useGetPostsBySearch } from 'lib/useGetPostsBySearch'
import { getRecentPostsFetcher } from 'lib/useGetRecentPosts'

const SearchPage: NextPage = () => {
  const { query } = useRouter()
  const {
    getPostsBySearchData: { data },
  } = useGetPostsBySearch(query.q)
  const MemoizedArticlesGrid = React.memo(ArticlesGrid)

  return (
    <Layout
      title={`Search Article | ${query.q ?? 'Search Page'}`}
      description="Artikel berdasarkan search"
    >
      {data?.posts.edges.length === 0 && (
        <GeneralFeedback isError message="Oops, coba cari keyword lain." />
      )}

      {data ? (
        <MemoizedArticlesGrid postData={data.posts.edges} />
      ) : (
        <MobileSearch />
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('recent', () => getRecentPostsFetcher())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default SearchPage
