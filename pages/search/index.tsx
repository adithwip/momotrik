import type { NextPage } from 'next'

import * as React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('components/Layout'))
const ArticlesGrid = dynamic(() => import('domain/common/ArticlesGrid'))
const GeneralFeedback = dynamic(() => import('components/GeneralFeedback'))
const MobileSearch = dynamic(() => import('domain/search/MobileSearch'))

import { useGetPostsBySearch } from 'lib/useGetPostsBySearch'

const SearchPage: NextPage = () => {
  const { query } = useRouter()
  const {
    getPostsBySearchData: { data, isFetching },
  } = useGetPostsBySearch(query.q)
  const MemoizedArticlesGrid = React.memo(ArticlesGrid)

  return (
    <Layout
      title={`Search Article | ${query.q ?? 'Search Page'}`}
      description="Artikel berdasarkan search"
      updating={query.q ? isFetching : false} // Only show spinner if query is not undefined
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

export default SearchPage
