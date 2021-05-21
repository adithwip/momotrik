import type { NextPage } from 'next'

import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('components/Layout'))
const ArticlesGrid = dynamic(() => import('domain/common/ArticlesGrid'))
const GeneralFeedback = dynamic(() => import('components/GeneralFeedback'))
const MobileSearch = dynamic(() => import('domain/search/MobileSearch'))

import { useGetPostsBySearch } from 'lib/useGetPostsBySearch'

const SearchPage: NextPage = () => {
  const { query } = useRouter()
  const { getPostsBySearchData: {
    data,
    isFetching,
  } } = useGetPostsBySearch(query.q)


  return (
    <Layout
      title={`Search Article | ${query.q}`}
      description="Artikel berdasarkan search"
      updating={isFetching}
    >
      {data?.posts.edges.length === 0 && (
        <GeneralFeedback
          isError
          message="Oops, coba cari keyword lain."
        />
      )}

      {data ? (
        <ArticlesGrid postData={data.posts.edges} />
      ) : (
        <MobileSearch />
      )}
    </Layout>
  )
}

export default SearchPage