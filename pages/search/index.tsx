import type { NextPage } from 'next'

import { useRouter } from 'next/router'
import isEmpty from 'lodash.isempty'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('components/Layout'))
const ArticlesGrid = dynamic(() => import('domain/common/ArticlesGrid'))

import { useGetPostsBySearch } from 'lib/useGetPostsBySearch'

const SearchPage: NextPage = () => {
  const { query } = useRouter()
  const { getPostsBySearchData } = useGetPostsBySearch(query.q)

  if (isEmpty(query)) {
    return (
      // TODO
      <div>Oops error...</div>
    )
  }

  return (
    <Layout
      title={`Search Article | ${query.q}`}
      description="Artikel berdasarkan search"
      updating={getPostsBySearchData.isFetching}
    >
      {getPostsBySearchData.data ? (
        <ArticlesGrid postData={getPostsBySearchData.data!.posts.edges} />
      ) : (
        // TODO
        <div>Fetching...</div>
      )}
    </Layout>
  )
}

export default SearchPage